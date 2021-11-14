import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AddProductData } from '../models/AddProductData';
import { IProduct } from '../models/IProduct';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  constructor(private http: HttpClient) { }

  public getAllProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>("http://localhost:3001/products");
  }

  public addProduct(productData: AddProductData): Observable<AddProductData> {
    return this.http.post<AddProductData>("http://localhost:3001/products",productData);
  }

  public editProduct(productData: AddProductData, id:number){
    return this.http.put<AddProductData>(`http://localhost:3001/products/${id}`,productData);
  }

}
