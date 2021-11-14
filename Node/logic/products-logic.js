const productsDao = require("../dao/products-dao");

async function getAllProducts(){
    let allProducts = await productsDao.getAllProducts();
    return allProducts;
}

async function addProduct(productData){
    await productsDao.addProduct(productData);
}

async function editProduct(productData){
    await productsDao.editProduct(productData);
}

async function getProductsByCategory(categoryId){
    let productsByCategory = await productsDao.getProductsByCategory(categoryId);
    return productsByCategory;
}

async function getProductById(productId){
    let product = await productsDao.getProductById(productId);
    return product;
}

module.exports = {
    getAllProducts,
    getProductsByCategory,
    getProductById,
    addProduct,
    editProduct
}