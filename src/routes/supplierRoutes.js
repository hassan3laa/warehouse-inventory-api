const express = require("express");
const router = express.Router();
const { protect, restrictTo } = require("../Controllers/authController");

const {
  getSuppliers,
  getSupplier,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

router
  .route("/")
  .get(protect, getSuppliers)
  .post(protect, restrictTo("admin"), createSupplier);

router
  .route("/:id")
  .get(protect, getSupplier)
  .patch(protect, restrictTo("admin"), updateSupplier)
  .delete(protect, restrictTo("admin"), deleteSupplier);

module.exports = router;
