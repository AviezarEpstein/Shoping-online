let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function getAllProducts() {
  let sql = `select product_id as productId, 
  product_name as productName, 
  main_image as image,
  description,
  brand,
  weight,
  weight_type as weightType,
  category_id as catId, 
  unit_price as price,
  quantity_per_unit as quantityPerUnit,
  units_in_stock as inStock  
  from shop.products`;

  try {
    let res = await connection.execute(sql);
    return res;
  } catch (e) {
    throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
  }
}

async function getProductsByCategory(categoryId) {
  let sql = `select product_id as productId, 
    product_name as productName, 
    main_image as image,
    description,
    brand,
    weight,
    weight_type as weightType,
    category_id as catId, 
    unit_price as price 
    from shop.products 
    where category_id = ?`;
  let parameters = [categoryId];

  try {
    let res = await connection.executeWithParameters(sql, parameters);
    return res;
  } catch (e) {
    let data = "Category ID: " + categoryId;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function getProductById(productId) {
  let sql = `select product_id as productId, 
      product_name as productName, 
      main_image as image,
      description,
      brand,
      weight,
      weight_type as weightType,
      category_id as catId, 
      unit_price as price 
      from shop.products 
      where product_id = ?`;
  let parameters = [productId];

  try {
    let res = await connection.executeWithParameters(sql, parameters);
    return res;
  } catch (e) {
    let data = "Product ID: " + productId;
    throw new ServerError(ErrorType.GENERAL_ERROR, data, e);
  }
}

async function addProduct(productData) {
  console.log('PRODUCT DATA: ', productData);
  let sql = `INSERT INTO products (product_name, 
      category_id, 
      unit_price, 
      units_in_stock, 
      main_image, 
      description, 
      brand, 
      quantity_per_unit, 
      weight_type, 
      weight)
      VALUES (?,?,?,?,?,?,?,?,?,?)`;

  let parameters = [
    productData.productName,
    productData.catId,
    productData.price,
    productData.inStock,
    productData.image,
    productData.description,
    productData.brand,
    productData.quantityPerUnit,
    productData.weightType,
    productData.weight,
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, productData, error);
  }
}

async function editProduct(productData) {
  console.log('^^^^^^^^^^^^^^^^^^^^', productData);
  let sql = `UPDATE products SET product_name = ?, 
  category_id = ?, 
  unit_price = ?, 
  units_in_stock = ?, 
  main_image = ?,
  description = ?, 
  brand = ?, 
  quantity_per_unit = ?, 
  weight_type = ?, 
  weight = ? 
  WHERE product_id = ?`;

  let parameters = [
    productData.productName,
    productData.catId,
    productData.price,
    productData.inStock,
    productData.image,
    productData.description,
    productData.brand,
    productData.quantityPerUnit,
    productData.weightType,
    productData.weight,
    productData.productId
  ];

  try {
    await connection.executeWithParameters(sql, parameters);
  } catch (error) {
    throw new ServerError(ErrorType.GENERAL_ERROR, productData, error);
  }
}

module.exports = {
  getAllProducts,
  getProductsByCategory,
  getProductById,
  addProduct,
  editProduct
};
