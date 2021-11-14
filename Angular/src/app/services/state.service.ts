import { Injectable } from '@angular/core';
import { AddProductData } from '../models/AddProductData';
import { ICart } from '../models/ICart';
import { IProduct } from '../models/IProduct';
import { RegistrationData } from '../models/RegitrationData';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public products: IProduct[] = [];

  public currentProductShown: IProduct = {
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

  public isCartShown: boolean = false;

  public registrationData: RegistrationData = {
    id: '',
    email: '',
    password: '',
    city: '',
    street: '',
    firstName: '',
    lastName: '',
    zip: ''
  };

  public userName: string = '';

  public currentCatId: number = 0;

  public isBeforeCheckout: boolean = true;

  public searchedProduct: string = '';

  public isLogedIn: boolean = false;

  public isAdmin: boolean = false;

  public isQuantityError: boolean = false;

  public quantityError: string = '';

  public productQuantityErrorData = {
    isError: false,
    errorMessage: '',
    productId: 0
  }

  public cartQuantityErrorData = {
    isError: false,
    errorMessage: '',
    productId: 0
  }

  public currentEditedProductDetails: AddProductData = {
    productName: '',
    catId: 0,
    price: 0,
    inStock: 0,
    image: '',
    description: '',
    brand: '',
    quantityPerUnit: 0,
    weight: 0,
    weightType: ''
  }

  public isCartEmpty: boolean = true;

  public currentEditedProductId: number = 0;

  public cart: ICart = {
    products: [],
    totalPrice: 0,
    cartId: 0,
  };

  constructor() {}
}
