const express = require("express");
const {
  CreateProduct,
  GetAllProduct,
  GetProductByID,
  GetProducts,
} = require("../controller/ProductController");
const router = express.Router();

router.post("/Product/Create", CreateProduct);
router.get("/Product/All", GetAllProduct);
router.get("/Product/:id", GetProductByID);

router.get("/Products", GetProducts);

module.exports = router;
