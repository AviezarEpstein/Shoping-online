const express = require("express");
const router = express.Router();
const categoriesLogic = require('../logic/categories-logic');

router.get('/', getAllCategories);

async function getAllCategories(request, response, next) {
    try {
      let allCategories = await categoriesLogic.getAllCategories();
      response.json(allCategories);
    } catch (error) {
      return next(error);
    }
  }

module.exports = router;
