let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function addOrder(orderData) {
  let sql = `INSERT INTO orders ( 
    customer_id, 
    order_date, 
    ship_city, 
    cart_id,
    price, 
    address, 
    foor_last_cc_digits, 
    zip, 
    email,
    first_name, 
    last_name,
    shipped_date)
    VALUES (?,?,?,?,?,?,?,?,?,?,?,?)`;
  let parameters = [
    orderData.userId,
    orderData.orderDate,
    orderData.city,
    orderData.cartId,
    orderData.price,
    orderData.address,
    orderData.foorLastCcDigits,
    orderData.zip,
    orderData.email,
    orderData.firstName,
    orderData.lastName,
    orderData.orderDate
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
    const status = "Ordered";
    await setCartStatus(status, orderData.cartId);
  } catch (e) {
    let data = orderData;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function setCartStatus(status, cartId) {
  let sql = `UPDATE cart SET status = ? Where id = ?`;
  let parameters = [status, cartId];
  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    let data = sql;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function getQuantityPerProduct(cartId) {
  let sql = `SELECT product_id as productId, quantity from cart_details where cart_id = ?`;
  let parameters = [cartId];
  try {
    let result = await connection.executeWithParameters(sql, parameters);
    return result;
  } catch (e) {
    let data = `Query: ${sql}, Cart ID: ${cartId}`;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function updateQuantity(quantityPerProduct) {
  try {
    for (let i = 0; i < quantityPerProduct.length; i++) {
      let quantityToReduce = quantityPerProduct[i].quantity;
      let productId = quantityPerProduct[i].productId;
      let sql = `UPDATE products SET units_in_stock = (units_in_stock - ${quantityToReduce}) WHERE product_id = ${productId}; `;
      await connection.execute(sql);
    }
  } catch (e) {
    let data = quantityPerProduct;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function checkInStock(productData) {
  let sql = `SELECT sum(units_in_stock - ?) as 'currentQuantity', product_name as productName, product_id as productId from products where product_id = ?`
  let parameters = [productData.quantity, productData.productId];
  try {
    let result = connection.executeWithParameters(sql, parameters);
    return result;
  } catch (e) {
    let data = quantityPerProduct;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

module.exports = {
  addOrder,
  getQuantityPerProduct,
  updateQuantity,
  checkInStock
};
