import { Pipe, PipeTransform } from '@angular/core';
import { IProduct } from '../models/IProduct';

@Pipe({
    name: 'catIdPipe'
})
export class ProductsPipeByCategory implements PipeTransform {

    transform(products: IProduct[], categoryId: number): any {
        console.log(products);
        if(categoryId && categoryId!=0){
            return products.filter(product => product.catId == categoryId);
        }
        return products;
    }
}
