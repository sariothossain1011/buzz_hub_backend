const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: [true, "Image is required!"],
    },
    name: {
      type: String,
      required: [true, "Name is required!"],
    },
    brand: {
      type: String,
      required: [true, "Brand is required!"],
    },
    category:{
      type: String,
      required: [true, "Category is required!"],
    },
    price: {
      type: String,
      required: [true, "Price is required!"],
    },
    productCode: {
      type: String,
      required: [true, "product Code is required!"],
    },
    quantity: {
      type: String,
      required: [true, "Quantity is required!"],
    },
    //key features
    model: {
      type: String,
    },
    processor: {
      type: String,
    },
    ram: {
      type: String,
    },
    resolution: {
      type: String,
    },
    display: {
      type: String,
    },
    camera: {
      type: String,
    },
    battery: {
      type: String,
    },
    ports: {
      type: String,
    },
    features: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
    },
    reference: {
      type: String,
    },
  },
  { versionKey: false }
);

ProductSchema.virtual("id").get(function () {
  // Use regular function declaration
  return this._id.toHexString();
});
ProductSchema.set("toJSON", {
  // Remove virtuals: true
  getters: true, // Use getters option instead
});
const ProductModel = mongoose.model("Products", ProductSchema);

module.exports = ProductModel;
