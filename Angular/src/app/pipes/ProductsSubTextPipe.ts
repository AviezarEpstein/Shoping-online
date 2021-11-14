import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Pipe({
    name: 'subTextPipe'
})
export class ProductsSubTextPipe implements PipeTransform {

    transform(products: IProduct[], subText: string): any {
        let newListOfProducts: IProduct[] = [];
        for (let i = 0; i < products.length; i++) {
            if (products[i].productName.toLowerCase().search(subText)!= -1) {
                newListOfProducts.push(products[i]);
            }
        }
        if (newListOfProducts.length > 0) {
            return newListOfProducts;
        }else{
            return products;
        }
    }
}
