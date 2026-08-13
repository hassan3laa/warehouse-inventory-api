const express = require("express");
const helmet = require("helmet");
const cors = require("cors");
const hpp = require("hpp");
const rateLimit = require("express-rate-limit");
const app = express();
const categoryRoutes = require("./routes/categoryRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./middleware/errorMiddleware");
const productRoutes = require("./routes/productRoutes");
const authRoutes = require("./routes/authRoutes");

app.use(helmet());
app.use(cors());
app.use(
  express.json({
    limit: "10kb",
  }),
);
app.use(
  hpp({
    whitelist: ["sort", "fields", "page", "limit", "category"],
  }),
);

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    status: "fail",
    message: "Too many requests, please try again later",
  },
});

app.use("/api", apiLimiter);

app.use("/api/v1/categories", categoryRoutes);
app.use("/api/v1/suppliers", supplierRoutes);
app.use("/api/v1/products", productRoutes);
app.use("/api/v1/auth", authRoutes);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
