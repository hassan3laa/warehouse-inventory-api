const { Schema, model } = require("mongoose");

const categorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
      minlength: [3, "Category name must be at least 3 characters long"],
      maxlength: [50, "Category name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [200, "Category description cannot exceed 200 characters"],
    },
  },
  {
    timestamps: true,
  },
);

module.exports = model("Category", categorySchema);
