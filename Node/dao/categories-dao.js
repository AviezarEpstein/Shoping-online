let connection = require("./connection-wrapper");
let ErrorType = require("./../errors/error-type");
let ServerError = require("./../errors/server-error");

async function getAllCategories() {
    let sql = `select category_id as catId, category_name as catName, description from categories`;
  
    try {
      let allCategories = await connection.execute(sql);
      return allCategories;
    } catch (e) {
      throw new ServerError(ErrorType.GENERAL_ERROR, sql, e);
    }
  }

module.exports = {
    getAllCategories
};