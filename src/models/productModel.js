const { Schema, model } = require("mongoose");

const productSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Product name is required"],
      trim: true,
      lowercase: true,
      minlength: 3,
      maxlength: 100,
    },

    sku: {
      type: String,
      required: [true, "SKU is required"],
      unique: true,
      trim: true,
      uppercase: true,
    },

    description: {
      type: String,
      trim: true,
      maxlength: 1000,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: 0,
    },

    quantity: {
      type: Number,
      required: [true, "Quantity is required"],
      min: 0,
      default: 0,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: "Category",
      required: [true, "Category is required"],
    },

    supplier: {
      type: Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Supplier is required"],
    },
  },
  {
    timestamps: true,
  },
);

productSchema.pre(/^find/, function () {
  this.populate({
    path: "category",
    select: "name",
  }).populate({
    path: "supplier",
    select: "name email phone",
  });
});

module.exports = model("Product", productSchema);
