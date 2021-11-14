import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IOrder } from '../models/IOrder';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {

  constructor(private http: HttpClient) { }

  public addToCart(orderData:IOrder): Observable<any> {
    return this.http.post<IOrder>("http://localhost:3001/orders",orderData);
  }
}
