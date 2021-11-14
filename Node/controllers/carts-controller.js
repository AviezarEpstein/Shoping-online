const cartsLogic = require("../logic/carts-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');
// router.post("/", addCart);
router.post("/", authorize(Role.Customer), addToCart);
router.get("/", authorize(Role.Customer), getCurrentCart);
router.delete("/:id", authorize(Role.Customer), deleteProductFromCart);
router.delete("/", authorize(Role.Customer), deleteAllProductsFromCart);
router.put("/changeQuantity", authorize(Role.Customer), changeQuantity);

async function deleteAllProductsFromCart(request, response, next) {
  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    let userId = decoded.id;
    await cartsLogic.deleteAllProductsFromCart(userId);
    response.json();
  } catch (error) {
    return next(error);
  }
}

async function changeQuantity(request, response, next) {
  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    let updatedData = request.body;
    await cartsLogic.changeQuantity(userId, updatedData);
    response.json();
  } catch (error) {
    return next(error);
  }
}

async function deleteProductFromCart(request, response, next) {
  try {
    let productId = request.params.id;
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    await cartsLogic.deleteProductFromCart(userId, productId);
    response.json();
  } catch (error) {
    return next(error);
  }
}

async function getCurrentCart(request, response, next) {
  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    let cartData = await cartsLogic.getCurrentCart(userId);
    response.json(cartData);
  } catch (error) {
    return next(error);
  }
}

async function addToCart(request, response, next) {
  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    let cartData = request.body;
    cartData.userId = userId;
    await cartsLogic.addToCart(cartData);
    response.json();
  } catch (error) {
    return next(error);
  }
}

// async function addCart(request, response, next) {
//   try {
//     let creationDate = request.body;
//     let token = request.headers.authorization;
//     let decoded = jwt_decode(token);
//     console.log(decoded);
//     let userId = decoded.id;
//     let cartData = await cartsLogic.addCart(creationDate, userId);
//     response.json(cartData);
//   } catch (error) {
//     return next(error);
//   }
// }

module.exports = router;
