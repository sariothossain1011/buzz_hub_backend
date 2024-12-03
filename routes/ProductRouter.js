const express = require("express");
const { CreateProduct, GetAllProduct, GetProductByID, SearchProduct } = require("../controller/ProductController");
const router = express.Router();


router.post("/Product/Create", CreateProduct );
router.get("/Product/All", GetAllProduct );
router.get("/Product/:id", GetProductByID );

router.get("/Product/:category/:brand/:keyword", SearchProduct);


module.exports = router;