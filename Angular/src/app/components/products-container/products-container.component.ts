import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-products-container',
  templateUrl: './products-container.component.html',
  styleUrls: ['./products-container.component.css']
})
export class ProductsContainerComponent implements OnInit {

  constructor(public stateService: StateService, public productsService: ProductsService, public router: Router) { }
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

  public onLoginClicked(): void{
    this.router.navigate(["/login"]);
  }

  public showProductDetails(productId: number):void{

  }
  ngOnInit(): void {
    this.getAllProducts();
  }

}
