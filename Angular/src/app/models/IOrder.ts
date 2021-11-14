export interface IOrder {
  cartId: number,
  city: string,
  zip: string,
  address: string,
  email: string,
  ccNumber: string,
  cvc: number,
  ccExp: string,
  personalId: string,
  firstName: string,
  lastName: string,
  price: number,
  shippingDate: any
}
