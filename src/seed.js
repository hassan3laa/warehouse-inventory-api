require("dotenv").config();
const mongoose = require("mongoose");

const User = require("./models/userModel");
const Category = require("./models/categoryModel");
const Supplier = require("./models/supplierModel");
const Product = require("./models/productModel");
const categories = require("./data/categories");
const suppliers = require("./data/suppliers");
const products = require("./data/products");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DATABASE);
    console.log("Database connected");
  } catch (err) {
    console.error("Database connection failed", err.message);
    process.exit(1);
  }
};

const importData = async () => {
  try {
    await connectDB();
    await Category.deleteMany();
    await Supplier.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    await User.create({
      name: "System Admin",
      email: process.env.ADMIN_EMAIL,
      password: process.env.ADMIN_PASSWORD,
      passwordConfirm: process.env.ADMIN_PASSWORD,
      role: "admin",
    });

    const createdCategories = await Category.create(categories);
    const createdSuppliers = await Supplier.create(suppliers);

    const categoryMap = {};
    createdCategories.forEach((category) => {
      categoryMap[category.name] = category._id;
    });
    const supplierMap = {};
    createdSuppliers.forEach((supplier) => {
      supplierMap[supplier.name] = supplier._id;
    });
    const productsWithIds = products.map((product) => ({
      ...product,
      category: categoryMap[product.category],
      supplier: supplierMap[product.supplier],
    }));
    await Product.create(productsWithIds);

    console.log("Data imported successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error importing data: ", err);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await connectDB();

    await Category.deleteMany();
    await Supplier.deleteMany();
    await Product.deleteMany();
    console.log("Data deleted successfully");
    process.exit(0);
  } catch (err) {
    console.error("Error deleting data: ", err);
    process.exit(1);
  }
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
} else {
  console.log("Please use --import or --delete");
  process.exit(1);
}
