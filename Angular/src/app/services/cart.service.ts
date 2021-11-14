import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddToCartData } from '../models/AddToCartData';
import { ICart } from '../models/ICart';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private http: HttpClient) { }

  public getCart(): Observable<ICart> {
    return this.http.get<ICart>("http://localhost:3001/carts");
  }

  public addToCart(cartData:AddToCartData): Observable<any> {
    return this.http.post<IProduct[]>("http://localhost:3001/carts",cartData);
  }

  public deleteProductFromCart(productId: number): Observable<any> {
    return this.http.delete(`http://localhost:3001/carts/${productId}`);
  }

  public deleteAllProductsFromCart(): Observable<any> {
    return this.http.delete('http://localhost:3001/carts/');
  }

  public changeQuantity(cartData:AddToCartData): Observable<any> {
    return this.http.put(`http://localhost:3001/carts/changeQuantity`, cartData);
  }
}
