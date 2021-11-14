import { IProduct } from "./IProduct";

export interface ICart{
    products: IProduct[],
    totalPrice: number,
    cartId: number
}