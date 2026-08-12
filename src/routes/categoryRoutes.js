const express = require("express");
const router = express.Router();
const categoryController = require("../Controllers/categoryController");
const { protect, restrictTo } = require("../Controllers/authController");

router
  .route("/")
  .get(protect, categoryController.getCategories)
  .post(protect, restrictTo("admin"), categoryController.createCategory);

router
  .route("/:id")
  .get(protect, categoryController.getCategory)
  .patch(protect, restrictTo("admin"), categoryController.updateCategory)
  .delete(protect, restrictTo("admin"), categoryController.deleteCategory);

module.exports = router;
