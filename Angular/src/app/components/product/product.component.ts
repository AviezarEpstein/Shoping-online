import { Component, Input, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/IProduct';
import { StateService } from 'src/app/services/state.service';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { AddToCartData } from 'src/app/models/AddToCartData';
import { CartService } from 'src/app/services/cart.service';
import { ICart } from 'src/app/models/ICart';
import { Router } from '@angular/router';
import { AddProductData } from 'src/app/models/AddProductData';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit {
  @Input() currentProduct: any = null;
  closeResult = '';

  constructor(
    private modalService: NgbModal,
    public stateService: StateService,
    public cartService: CartService,
    public router: Router
  ) {}

  public quantityInputValue: number = 0;

  public addToCartData: AddToCartData = {
    productId: 0,
    quantity: 0,
  };

  public onEditClicked(product: IProduct): void {
    this.stateService.currentEditedProductDetails.brand = product.brand;
    this.stateService.currentEditedProductDetails.catId = product.catId;
    this.stateService.currentEditedProductDetails.description =
      product.description;
    this.stateService.currentEditedProductDetails.image = product.image;
    this.stateService.currentEditedProductDetails.inStock = product.inStock;
    this.stateService.currentEditedProductDetails.price = product.price;
    this.stateService.currentEditedProductDetails.productName =
      product.productName;
    this.stateService.currentEditedProductDetails.quantityPerUnit =
      product.quantityPerUnit;
    this.stateService.currentEditedProductDetails.weight = product.weight;
    this.stateService.currentEditedProductDetails.weightType =
      product.weightType;
    this.stateService.currentEditedProductId = product.productId;
    this.router.navigate(['editProduct']);
  }

  public addedProductDetails: IProduct = {
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

  public subTotal: number = 0;

  public onAddToCartClicked(productId: number): void {
   
    this.addToCartData.productId = productId;
    console.log('PRODUCT ID: ',this.addToCartData.productId);
    
    let quantityElement:any = document.getElementById(productId.toString());
    console.log('ELEMENT ID: ', quantityElement);
    
    let quantity = quantityElement.value;
    console.log('INPUT VALUE: ', quantity);
    
    let cartQuantity = 0;
    for (let i = 0; i < this.stateService.cart.products.length; i++) {
      if (productId == this.stateService.cart.products[i].productId) {
        cartQuantity = this.stateService.cart.products[i].quantity;
      }
    }
    
    this.addToCartData.quantity = +quantity + cartQuantity;
    console.log('FINAL QUANTITY: ', this.addToCartData.quantity);
    
    this.addToCart();
    let element:any = document.getElementById(productId.toString());
    element.value = null;
    this.isClicked = true;
  }

  // public afterClickAdd: any = null;
  public isClicked: boolean = false;

  public calculateTotalPrice(): number {
    let total: number = 0;
    for (let i = 0; i < this.stateService.cart.products.length; i++) {
      total = total + this.stateService.cart.products[i].totalPrice;
    }
    return total;
  }

  public currentQuantity: number = 0;

  public addToCart(): void {
    let cartData = new AddToCartData(
      this.addToCartData.productId,
      this.addToCartData.quantity
    );

    const observable = this.cartService.addToCart(cartData);

    observable.subscribe(
      () => {
        for (let i = 0; i < this.stateService.cart.products.length; i++) {
          if (
            this.addToCartData.productId ==
            this.stateService.cart.products[i].productId
          ) {
            this.stateService.cart.products[i].quantity = this.addToCartData.quantity;
            this.stateService.cart.products[i].totalPrice =
              this.stateService.cart.products[i].price *
              this.stateService.cart.products[i].quantity;
            this.stateService.cart.totalPrice = this.calculateTotalPrice();
            return;
          }
        }
        for (let i = 0; i < this.stateService.products.length; i++) {
          if (
            this.stateService.products[i].productId ==
            this.addToCartData.productId
          ) {
            this.stateService.cart.products.push(this.stateService.products[i]);
          }
        }
        for (let i = 0; i < this.stateService.cart.products.length; i++) {
          if (
            this.stateService.cart.products[i].productId ==
            this.addToCartData.productId
          ) {
            this.stateService.cart.products[i].quantity = cartData.quantity;
            this.stateService.cart.products[i].totalPrice =
              this.stateService.cart.products[i].price *
              this.stateService.cart.products[i].quantity;
            this.stateService.cart.totalPrice = this.calculateTotalPrice();
          }
        }
        console.log('TOTAL PRICE: ', this.stateService.cart.totalPrice);
        this.stateService.isCartEmpty = false;
      },
      (serverErrorResponse: { message: string }) => {
        alert('error! ' + serverErrorResponse.message);
      }
    );
  }

  public onLoginClicked(): void {
    this.router.navigate(['/login']);
  }

  public currentQuantityInCart: number = 0;

  public onQuantityChanged(
    event: any,
    inStock: number,
    productName: string,
    productId: number
  ): void {
    this.isClicked = false;
    this.quantityInputValue = event.target.value;
    for (let i = 0; i < this.stateService.cart.products.length; i++) {
      if (this.stateService.cart.products[i].productId == productId) {
        this.currentQuantityInCart = this.stateService.cart.products[i].quantity;
      }
    }
    if (+event.target.value + this.currentQuantityInCart > inStock) {
      this.stateService.productQuantityErrorData.isError = true;
      this.stateService.productQuantityErrorData.errorMessage = `There is only ${inStock} units in stock of the ${productName}`;
      this.stateService.productQuantityErrorData.productId = productId;
    } else if (+event.target.value < 0) {
      this.stateService.productQuantityErrorData.isError = true;
      this.stateService.productQuantityErrorData.errorMessage = 'Quantity can not be 0 or a negative number';
      this.stateService.productQuantityErrorData.productId = productId;
    } else {
      this.stateService.productQuantityErrorData.isError = false;
      this.stateService.productQuantityErrorData.errorMessage = "";
      this.stateService.productQuantityErrorData.productId = productId;
    }
    // this.addToCartData.quantity = +event.target.value;    
  }

  public onProductClicked(currentProductClicked: IProduct): void {
    this.stateService.currentProductShown = currentProductClicked;
  }

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  ngOnInit(): void {}
}
