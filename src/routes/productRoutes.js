const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../Controllers/authController");

const {
  getProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controllers/productController");

router
  .route("/")
  .get(protect, getProducts)
  .post(protect, restrictTo("admin"), createProduct);

router
  .route("/:id")
  .get(protect, getProduct)
  .patch(protect, restrictTo("admin"), updateProduct)
  .delete(protect, restrictTo("admin"), deleteProduct);

module.exports = router;
