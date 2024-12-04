const ProductModel = require("../models/ProductModel");

exports.CreateProduct = async (req, res) => {
  try {
    const postBody = req.body;
    const ProductData = await ProductModel(postBody);

    const product = await ProductData.save();
    if (!product) {
      return res
        .status(400)
        .send({ success: false, message: "Product Create Fail!" });
    }
    return res.status(200).json({ success: true, data: product });
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.GetAllProduct = async (req, res) => {
  try {
    const products = await ProductModel.find().populate();

    if (!products) {
      res.status(400).json({ success: false, message: "Not found products" });
    } else {
      res.status(200).json({ success: true, message: products });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.GetProductByID = async (req, res) => {
  try {
    const id = req.params.id;
    const product = await ProductModel.findOne({ _id: id });

    if (!product) {
      res
        .status(400)
        .json({ success: false, message: "The blog is not product" });
    } else {
      res.status(200).json({ success: true, message: product });
    }
  } catch (error) {
    return res.status(400).json({ success: false, message: error });
  }
};

exports.GetProducts = async (req, res) => {
  try {
    const { category, brand, keyword } = req.query;

    let filters = {};

    if (
      category &&
      typeof category === "string" &&
      category.trim().length > 0
    ) {
      filters.category = category;
    }
    if (brand && typeof brand === "string" && brand.trim().length > 0) {
      filters.brand = brand;
    }
    if (keyword && typeof keyword === "string" && keyword.trim().length > 0) {
      filters.name = { $regex: keyword, $options: "i" };
    }

    const results = await ProductModel.find(filters);

    if (!results || results.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the criteria.",
      });
    }

    res.status(200).json({ success: true, products: results });
  } catch (error) {
    console.error("Error fetching products:", error);
    return res.status(500).json({
      success: false,
      message: "An internal server error occurred.",
    });
  }
};
