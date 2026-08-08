const { Schema, model } = require("mongoose");

const supplierSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name for this supplier."],
      trim: true,
      unique: [true, "Name must be unique."],
      lowercase: true,
      minlength: [3, "Name must be at least 3 characters."],
      maxlength: [100, "Name is too large."],
    },
    phone: {
      type: String,
      required: [true, "Please provide a phone number for this supplier."],
      unique: [true, "Phone number must be unique."],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Please provide a email for this supplier."],
      unique: [true, "Email must be unique."],
      trim: true,
      lowercase: true,
    },
    address: {
      type: String,
      required: [true, "Please provide a address for this supplier."],
      trim: true,
      maxlength: [300, "Address is too large."],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Supplier", supplierSchema);
