import { Injectable } from '@angular/core';
import { AddProductData } from '../models/AddProductData';
import { CartQuantityErrorData } from '../models/CartQuantityErrorData';
import { ICart } from '../models/ICart';
import { IProduct } from '../models/IProduct';
import { RegistrationData } from '../models/RegitrationData';

@Injectable({
  providedIn: 'root',
})
export class StateService {
  public products: IProduct[] = [];

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

  public isAtHome: boolean = true;

  public userName: string = '';

  public currentCatId: number = 0;

  public isBeforeCheckout: boolean = true;

  public searchedProduct: string = '';

  public isLogedIn: boolean = false;

  public isAdmin: boolean = false;

  // public isQuantityError: boolean = false;

  // public quantityError: string = '';

  public productQuantityErrorData = {
    currentInStock: 0,
    currentquantity: 0,
    isError: false,
    errorMessage: '',
    productId: 0
  }

  public cartQuantityErrorData = {
    currentInStock: 0,
    currentquantity: 0,
    isError: false,
    errorMessage: '',
    productId: 0
  }

  public availableQuantity: CartQuantityErrorData[] = []; 

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
