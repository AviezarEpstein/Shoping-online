const cartsDao = require("../dao/carts-dao");

async function getCurrentCart(userId) {
  let cartId = await cartsDao.getCartId(userId);
  console.log("jjjjjjjjjj", cartId);
  if (cartId[0] == null) {
    console.log("HELLO");
    return 0;
  }
  let cartProducts = await cartsDao.getCurrentCart(cartId[0].id);
  let cartData = { products: cartProducts, cartId: cartId[0].id };
  return cartData;
}

async function changeQuantity(userId, updatedData) {
  let cartId = await cartsDao.getCartId(userId);
  let price = await cartsDao.getPrice(updatedData.productId);
  updatedData.price = updatedData.quantity * price[0].unitPrice;
  await cartsDao.changeQuantity(cartId[0].id, updatedData);
}

async function addCart(creationDate, userId) {
  let cartData = await cartsDao.checkIsActiveCartExist(userId);
  if (cartData.length == 0) {
    await cartsDao.addCart(creationDate, userId);
  }
  return cartData;
}

async function deleteProductFromCart(userId, productId) {
  let cartIdRes = await cartsDao.getCartId(userId);
  let cartId = cartIdRes[0].id;
  await cartsDao.deleteProductFromCart(cartId, productId);
}

async function deleteAllProductsFromCart(userId) {
  let cartIdRes = await cartsDao.getCartId(userId);
  let cartId = cartIdRes[0].id;
  await cartsDao.deleteAllProductsFromCart(cartId);
}

async function addToCart(cartData) {
  let cartId = await cartsDao.getCartId(cartData.userId);
  if (cartId[0] != null) {
    cartData.cartId = cartId[0].id;
  } else {
    let date = Date.now();
    await cartsDao.addCart(date, cartData.userId);
    cartId = await cartsDao.getCartId(cartData.userId);
    cartData.cartId = cartId[0].id;
  }
  let currentQuantityForSpecificProduct = await cartsDao.getCurrentQuantity(
    cartData
  );
  let priceRes = await cartsDao.getPrice(cartData.productId);
  if (currentQuantityForSpecificProduct.length < 1) {
    cartData.price = priceRes[0].unitPrice * cartData.quantity;
    await cartsDao.addToCart(cartData);
  } else {
    cartData.price = cartData.quantity * priceRes[0].unitPrice;
    await cartsDao.setQuantity(cartData);
  }
}

async function getCartId() {
  let response = await cartsDao.checkIsActiveCartExist();
  let cartId;
  if (response.length > 0) {
    cartId = response[0];
    return cartId;
  }
  cartId = 0;
  return cartId;
}

module.exports = {
  addCart,
  addToCart,
  getCurrentCart,
  getCartId,
  deleteProductFromCart,
  changeQuantity,
  deleteAllProductsFromCart
};
