const express = require("express");
const rateLimit = require("express-rate-limit");

const { signup, login } = require("../Controllers/authController");
const router = express.Router();

const loginLimiter = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10,
  message: {
    status: "fail",
    message: "Too many requests, Please try again later.",
  },
});

router.post("/signup", signup);
router.post("/login", loginLimiter, login);

module.exports = router;
