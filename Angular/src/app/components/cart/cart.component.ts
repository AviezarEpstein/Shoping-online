import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AddToCartData } from 'src/app/models/AddToCartData';
import { IProduct } from 'src/app/models/IProduct';
import { CartService } from 'src/app/services/cart.service';
import { StateService } from 'src/app/services/state.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css'],
})
export class CartComponent implements OnInit {
  constructor(
    public stateService: StateService,
    public cartService: CartService,
    private router: Router
  ) {}

  public isCartShown: boolean = true;

  public query: string = '';

  public getCart(): void {
    const observable = this.cartService.getCart();
    observable.subscribe(
      (res) => {
        this.stateService.cart.totalPrice = 0;
        for (let i = 0; i < res.products.length; i++) {
          res.products[i].totalPrice =
            res.products[i].price * res.products[i].quantity;
          this.stateService.cart.totalPrice += res.products[i].totalPrice;
        }
        this.stateService.cart.products = res.products;
        this.stateService.cart.cartId = res.cartId;
        this.setIsCartEmpty();
      },
      (serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  public highlight(string: string) {
    if (!this.query) {
      string;
    }
    return string.replace(new RegExp(this.query, 'gi'), (match) => {
      return '<span class="highlightText">' + match + '</span>';
    });
  }

  public setIsCartEmpty(){
    if (this.stateService.cart.products.length < 1) {
      this.stateService.isCartEmpty = true;
    }else{
      this.stateService.isCartEmpty = false;
    }
  }

  public onDeleteClicked(productId: number, price: number) {
    const observable = this.cartService.deleteProductFromCart(productId);
    observable.subscribe(
      () => {
        this.stateService.cart.products =
          this.stateService.cart.products.filter(
            (product) => product.productId != productId
          );
        this.stateService.cart.totalPrice -= price;
        this.setIsCartEmpty();
      },
      (serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  public currentProduct: IProduct = {
    productId: 0,
    productName: '',
    catId: 0,
    price: 0,
    totalPrice: 0,
    inStock: 0,
    image: '',
    description: '',
    brand: '',
    quantityPerUnit: 0,
    weight: 0,
    weightType: '',
    quantity: 0,
  };

  public onQuantityChanged(
    productId: number,
    event: any,
    inStock: number,
    productName: string
  ): void {
    console.log('IN STOCK:', inStock);

    if (+event.target.value > inStock) {
      this.stateService.cartQuantityErrorData.isError = true;
      this.stateService.cartQuantityErrorData.errorMessage = `There is only ${inStock} units in stock of the ${productName}`;
      this.stateService.cartQuantityErrorData.productId = productId;
      return;
    } else if (+event.target.value <= 0) {
      this.stateService.cartQuantityErrorData.isError = true;
      this.stateService.cartQuantityErrorData.errorMessage =
        'Quantity can not be 0 or a negative number';
      this.stateService.cartQuantityErrorData.productId = productId;
      return;
    } else {
      this.stateService.cartQuantityErrorData.isError = false;
      this.stateService.cartQuantityErrorData.errorMessage = '';
      this.stateService.cartQuantityErrorData.productId = productId;
    }

    for (let i = 0; i < this.stateService.cart.products.length; i++) {
      if (this.stateService.cart.products[i].productId == productId) {
        this.currentProduct = this.stateService.cart.products[i];
      }
    }
    let unitPrice: number = this.currentProduct.price;
    let oldTotalPrice: number = this.currentProduct.totalPrice;
    let newQuantity: number = +event.target.value;
    let newTotalPrice: number = unitPrice * newQuantity;

    const addToCart = new AddToCartData(productId, newQuantity);
    const observable = this.cartService.changeQuantity(addToCart);
    observable.subscribe(
      () => {
        for (let i = 0; i < this.stateService.cart.products.length; i++) {
          if (this.stateService.cart.products[i].productId == productId) {
            this.stateService.cart.products[i].quantity = newQuantity;
            this.stateService.cart.products[i].totalPrice = newTotalPrice;
            this.stateService.cart.totalPrice =
              this.stateService.cart.totalPrice - oldTotalPrice + newTotalPrice;
            return;
          }
        }
        this.setIsCartEmpty();
      },
      (serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  public onLoginClicked(): void {
    this.router.navigate(['/login']);
  }

  public toggleShow(): void {
    this.isCartShown = !this.isCartShown;
  }

  public onPlaceOrderClicked(total: number) {
    console.log(total);
    this.router.navigate(['/payment']);
  }

  public onDeleteAllClicked(): void{
    
    const observable = this.cartService.deleteAllProductsFromCart();
    observable.subscribe(()=>{
      this.stateService.cart.products = [];
      this.stateService.cart.cartId = 0;
      this.stateService.cart.totalPrice = 0;
      this.setIsCartEmpty();
    },
    (serverErrorResponse: { message: string }) => {
      alert('error! ' + serverErrorResponse.message);
    })
  }

  ngOnInit(): void {
    this.isCartShown = true;
    if (!localStorage.getItem('userToken')) {
      return;
    }
    {
    }
    this.getCart();
  }
}
