const ordersLogic = require("../logic/orders-logic");
const express = require("express");
const router = express.Router();
const jwt_decode = require("jwt-decode");

router.post("/", addOrder);

async function addOrder(request, response, next) {
  try {
    let token = request.headers.authorization;
    let decoded = jwt_decode(token);
    console.log(decoded);
    let userId = decoded.id;
    let orderData = request.body;
    orderData.userId = userId;
    await ordersLogic.addOrder(orderData);
    response.json();
  } catch (error) {
    return next(error);
  }
}
module.exports = router;