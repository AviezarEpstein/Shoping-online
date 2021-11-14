const productsLogic = require("../logic/products-logic");
const express = require("express");
const router = express.Router();
const Role = require('../_helpers/role');
const authorize = require('../_helpers/authorize');

router.get("/", getAllProducts);
router.post("/", authorize(Role.Admin), addProduct);
router.put("/:id",authorize(Role.Admin), editProduct);
router.get("/:id", getProductById);
router.get("/productsByCategory", getProductsByCategory);

async function addProduct(request, response, next){
  try {
    let productData = request.body;
    await productsLogic.addProduct(productData);
    response.json();
  } catch (error) {
    return next(error);
  }
}

async function editProduct(request, response, next){
  try {
    let productData = request.body;
    let productId = request.params.id;
    productData.productId = productId;
    await productsLogic.editProduct(productData);
    response.json();
  } catch (error) {
    return next(error);
  }
}

async function getAllProducts(request, response, next) {
  try {
    let allProducts = await productsLogic.getAllProducts();
    response.json(allProducts);
  } catch (error) {
    return next(error);
  }
}

async function getProductById(request, response, next) {
    try {
      let productId = request.params.id; 
      let product = await productsLogic.getProductById(productId);
      response.json(product);
    } catch (error) {
      return next(error);
    }
  }

async function getProductsByCategory(request, response, next) {
  try {
    let categoryId = request.body.categoryId;
    console.log(categoryId);
    let productsByCategory = await productsLogic.getProductsByCategory(categoryId);
    response.json(productsByCategory);
  } catch (error) {
    return next(error);
  }
}

module.exports = router;
