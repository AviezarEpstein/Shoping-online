let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function getCurrentCart(cartId) {
    let sql = `select c.creation_date,
    p.product_id as productId, 
    p.product_name as productName, 
    p.main_image as image,
    p.description,
    p.brand,
    p.unit_price as price,
    p.weight,
    p.weight_type as weightType,
    p.category_id as catId, 
    p.unit_price as price,
    p.units_in_stock as inStock,
    cd.quantity
    from cart_details cd
    join cart c 
    on cd.cart_id = c.id
    join products p 
    on p.product_id = cd.product_id
    where c.id = ?`;
    let parameters = [cartId];
  
    try {
      let cartData = await connection.executeWithParameters(sql, parameters);
      console.log('CART DATA: ', cartData);
      return cartData;
    } catch (e) {
      let data = { cartId, cartData };
      throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
    }
  }

  async function checkIsActiveCartExist(userId) {
    let sql = `select id, 
    customer_id as customerId, 
    creation_date as creationDate, 
    is_active as isActive, 
    status 
    from cart 
    where customer_id = ? and status = "pending"`;
    let parameters = [userId];
  
    try {
      let cartData = await connection.executeWithParameters(sql, parameters);
      return cartData;
    } catch (e) {
      let data = { creationDate, userId };
      throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
    }
  }

async function addCart(creationDate, userId) {
  let status = 'pending'
  let sql = `INSERT INTO cart (customer_id, creation_date, status)
    VALUES (?,?,?)`;
  let parameters = [userId, creationDate, status];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    let data = { creationDate, userId };
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function addToCart(cartData) {
  console.log(cartData);
  let sql = `INSERT INTO cart_details (product_id, quantity, price, cart_id)
      VALUES (?,?,?,?)`;
  let parameters = [
    cartData.productId,
    cartData.quantity,
    cartData.price,
    cartData.cartId,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    let data = { cartId, cartData };
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function getCartId(userId) {
  let sql = `select id from cart where customer_id = ? and status = "pending"`;
  let parameters = [userId];

  try {
    let cartId = await connection.executeWithParameters(sql, parameters);
    return cartId;
  } catch (e) {
    let data = 'User ID '+ userId;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function getCurrentQuantity(cartData) {
  let sql = `select quantity from cart_details where cart_id = ? and product_id = ?`;
  let parameters = [cartData.cartId, cartData.productId];

  try {
    let quantity = await connection.executeWithParameters(sql, parameters);
    console.log('QUANTITY: ', quantity);
    return quantity;
  } catch (e) {
    let data = 'Cart Data: '+ cartData;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function getPrice(productId) {
  let sql = `select unit_price as unitPrice from products where product_id = ?`;
  let parameters = [productId];

  try {
    let price = await connection.executeWithParameters(sql, parameters);
    return price;
  } catch (e) {
    let data = 'Product ID '+ productId;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function setQuantity(cartData) {
  console.log('?????????????', cartData.quantity);
  let sql = `UPDATE cart_details SET quantity = ?, price = ? WHERE product_id = ?`;
  let parameters = [cartData.quantity, cartData.price, cartData.productId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    let data = 'Cart Data '+ cartData;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function deleteProductFromCart(cartId, productId) {
  let sql = `DELETE FROM cart_details WHERE cart_id = ? and product_id = ?`;
  let parameters = [cartId, productId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    let data = 'Cart Data '+ cartId + ', ' + productId;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function deleteAllProductsFromCart(cartId) {
  let sql1 = `DELETE FROM cart_details WHERE cart_id = ?`;
  let sql2 = `DELETE FROM cart WHERE id = ?`;
  let parameters = [cartId];

  try {
    await connection.executeWithParameters(sql1, parameters);
    await connection.executeWithParameters(sql2, parameters);
  } catch (e) {
    let data = `sql 1: ${sql1}, sql 2: ${sql2}`
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function changeQuantity(cartId, updatedData) {
  let sql = `UPDATE cart_details SET quantity = ?, price = ? Where cart_id = ? and product_id = ?`;
  let parameters = [updatedData.quantity, updatedData.price, cartId, updatedData.productId];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (e) {
    let data = 'Data '+ cartId + ', ' + updatedData.quantity + ', ' + updatedData.price;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

module.exports = {
  addCart,
  addToCart,
  getCurrentCart,
  checkIsActiveCartExist,
  getCartId,
  getPrice,
  getCurrentQuantity,
  setQuantity,
  deleteProductFromCart,
  changeQuantity,
  deleteAllProductsFromCart
};
