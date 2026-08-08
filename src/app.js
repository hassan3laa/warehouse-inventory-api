const express = require("express");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");

app.use(express.json());

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/v1/products", productRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
