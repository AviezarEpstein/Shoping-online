import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICategory } from 'src/app/models/ICategory';
import { CategoriesService } from 'src/app/services/categories.service';
import { StateService } from 'src/app/services/state.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  public isLogedIn: boolean = false;
  constructor(private router: Router, public stateService: StateService, public categoriesServies: CategoriesService) { 
    if(localStorage.getItem("userToken")){
      // this.isLogedIn = true;
      this.stateService.isLogedIn = true;
    }else{
      this.stateService.isLogedIn = false;
    }
  }
  ngOnInit(): void {
    this.getAllCategories();
    let token: any = localStorage.getItem("userToken");
    if (token) {
      let name = this.getDecodedAccessToken(token).name;
      this.stateService.userName = name;
      console.log(token.name);
    }
  }

  public toggleShow(): void {
    this.stateService.isCartShown = !this.stateService.isCartShown;
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  public allCategories: ICategory[] = [];
  
  public onCategoryChanged(event: any):void{
    this.stateService.currentCatId = +event.target.value;
  }

  public onSearchInputChanged(event: any):void{
    this.stateService.searchedProduct = event.target.value.toLowerCase();
  }

  public onAddProductClicked(): void{
    this.router.navigate(["addProduct"])
  }

  public getAllCategories():void{
    const observable = this.categoriesServies.getAllCategories();
    observable.subscribe(
      (res) => {
        console.log(res);
        this.allCategories = res;
        console.log('ALL CATEGORIES: ',this.allCategories);
        
      },(serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  public onLoginClicked():void{
    this.router.navigate(["/login"]);
  }
  
  public onHomeClicked():void{
    this.router.navigate(["/home"]);
  }

  public onLogoutClicked():void{
    localStorage.setItem("userToken", "");
    this.stateService.isLogedIn = false;
    this.stateService.cart.products = [];
    this.stateService.cart.cartId = 0;
    this.stateService.cart.totalPrice = 0;
    this.router.navigate(["/login"]);
  }

  public onAddVacationClicked():void{
    this.router.navigate(["/addVacation"]);
  }

}
