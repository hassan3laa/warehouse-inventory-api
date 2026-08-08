const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController");

router
  .route("/")
  .get(categoryController.getCategories)
  .post(categoryController.createCategory);

router
  .route("/:id")
  .get(categoryController.getCategory)
  .patch(categoryController.updateCategory)
  .delete(categoryController.deleteCategory);

module.exports = router;
