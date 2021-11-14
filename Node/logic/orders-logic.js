const ordersDao = require("../dao/orders-dao");
const cartsDao = require("../dao/carts-dao");
const ErrorType = require("./../errors/error-type");
const ServerError = require("./../errors/server-error");

async function addOrder(orderData) {
  let date = Date.now();
  let foorLastCcDigits = "";
  for (let i = 0; i < orderData.ccNumber.length; i++) {
    if (i + 4 >= orderData.ccNumber.length) {
      foorLastCcDigits += orderData.ccNumber[i];
    }
  }
  if (orderData.cartId == 0) {
    let cartId = await cartsDao.getCartId(orderData.userId);
    orderData.cartId = cartId[0].id;
  }
  orderData.foorLastCcDigits = foorLastCcDigits;
  orderData.orderDate = date;
  await ordersDao.addOrder(orderData);
  let quantityPerProduct = await ordersDao.getQuantityPerProduct(
    orderData.cartId
  );
  for (let i = 0; i < quantityPerProduct.length; i++) {
    let inStock = await ordersDao.checkInStock(quantityPerProduct[i]);
    if(inStock[0].currentQuantity<=0){
      let errorData = `Product ${inStock[0].productName} is out of stock`
      throw new ServerError(ErrorType.OUT_OF_STOCK, errorData);
    }
  }
  await ordersDao.updateQuantity(quantityPerProduct);
}

module.exports = {
  addOrder,
};
