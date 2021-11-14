import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(public stateService: StateService, 
    public productsService: ProductsService,
    public router: Router) { }
  public getAllProducts():void{
    const observable = this.productsService.getAllProducts();
    observable.subscribe(
      (res) => {
        console.log(res);
        this.stateService.products = res;
      },(serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  handleNavigation(token: string) {
    let role = this.getDecodedAccessToken(token).role;
    if (role == 'Admin') {
      this.stateService.isAdmin = true;
      this.router.navigate(['/admin']);
    } else {
      this.stateService.isAdmin = false;
      this.router.navigate(['/customer']);
    }
  }

  getDecodedAccessToken(token: string): any {
    try {
      return jwt_decode(token);
    } catch (Error) {
      return null;
    }
  }

  ngOnInit(): void {
    if(localStorage.getItem("userToken")){
      let token:any = localStorage.getItem("userToken")
      let role = this.getDecodedAccessToken(token).role;
    if (role == 'Admin') {
      this.stateService.isAdmin = true;
    }
    }
    this.getAllProducts();
  }
}
