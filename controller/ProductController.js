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
      const products = await ProductModel.find().populate()
  
      if (!products) {
        res
          .status(400)
          .json({ success: false, message: "Not found products" });
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
      const product = await ProductModel.findOne({ _id: id })
  
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
  




  exports.SearchProduct = async (req, res) => {
    try {
      const { category, brand, keyword } = req.params;
  
      // Validate input
      if (!keyword || keyword.trim().length < 1) {
        return res.status(400).json({ success: false, message: "Keyword is required for the search." });
      }
  
      let results;
  
      if (category && category.trim().length > 0 && brand && brand.trim().length > 0) {
        // Search by category, brand, and keyword
        results = await ProductModel.aggregate([
          {
            $match: {
              $and: [
                { category: { $regex: category, $options: "i" } },
                { brand: { $regex: brand, $options: "i" } },
                { name: { $regex: keyword, $options: "i" } },
              ],
            },
          },
          {
            $group: {
              _id: "$category",
              products: { $push: "$$ROOT" },
            },
          },
        ]);
      } else if (category && category.trim().length > 0) {
        // Search by category and keyword
        results = await ProductModel.find({
          category: { $regex: category, $options: "i" },
          name: { $regex: keyword, $options: "i" },
        });
      } else if (brand && brand.trim().length > 0) {
        // Search by brand and keyword
        results = await ProductModel.find({
          brand: { $regex: brand, $options: "i" },
          name: { $regex: keyword, $options: "i" },
        });
      } else {
        // Search only by keyword
        results = await ProductModel.find({
          name: { $regex: keyword, $options: "i" },
        });
      }
  
      res.status(200).json({ success: true, message: results });
    } catch (error) {
      console.error("Error during search:", error);
      return res.status(500).json({ success: false, message: error.message });
    }
  };
  
  


















  // exports.SearchProduct = async (req, res) => {
  //   try {
  //     const { category, brand, keyword } = req.params;
  
  //     // Validate keyword
  //     if (!keyword || keyword.trim().length < 1) {
  //       return res.status(400).json({ success: false, message: "Keyword is required for the search." });
  //     }
  
  //     const query = {};
  
  //     // Add category and brand to the query if provided
  //     if (category && category.trim().length > 0) {
  //       query.category = { $regex: category, $options: "i" };
  //     }
  //     if (brand && brand.trim().length > 0) {
  //       query.brand = { $regex: brand, $options: "i" };
  //     }
  
  //     // Add keyword to the query
  //     query.name = { $regex: keyword, $options: "i" };
  
  //     const results = await ProductModel.find(query);
  
  //     res.status(200).json({ success: true, message: results });
  //   } catch (error) {
  //     console.error("Error during search:", error);
  //     return res.status(500).json({ success: false, message: error.message });
  //   }
  // };










  


  // exports.SearchProduct = async (req, res) => {
  //   try {
  //     const { brand ,name} = req.params;
  //     const results = await ProductModel.find({
  //       $or: [{ brand: { $regex: brand, $options: "i" } },{ name: { $regex: name, $options: "i" } }],
  //     });
  //     res.status(200).json({ success: true, message: results });
  //   } catch (error) {
  //     return res.status(400).json({ success: false, message: error });
  //   }
  // };













  
  
  
  // exports.SearchProduct = async (req, res) => {
  //   try {
  //     const { brand, keyword } = req.params;
  
  //     // Validate input
  //     if (!keyword || keyword.trim().length < 1) {
  //       return res.status(400).json({ success: false, message: "Name is required for the search." });
  //     }
  
  //     let results;
  
  //     if (brand && brand.trim().length > 0) {
  //       // Search by brand and name, returning unique brands
  //       results = await ProductModel.aggregate([
  //         {
  //           $match: {
  //             $and: [
  //               { brand: { $regex: brand, $options: "i" } },
  //               { name: { $regex: keyword, $options: "i" } },
  //             ],
  //           },
  //         },
  //         {
  //           $group: {
  //             _id: "$brand",
  //             products: { $push: "$$ROOT" },
  //           },
  //         },
  //       ]);
  //     } else {
  //       // Search only by name, return all matches
  //       results = await ProductModel.find({
  //         name: { $regex: name, $options: "i" },
  //       });
  //     }
  
  //     res.status(200).json({ success: true, message: results });
  //   } catch (error) {
  //     console.error("Error during search:", error);
  //     return res.status(500).json({ success: false, message: error.message });
  //   }
  // };


  
  

  // exports.SearchByName = async (req, res) => {
  //   try {
  //     const { keyword } = req.params;
  //     const results = await UserModel.find({
  //       $or: [{ name: { $regex: keyword, $options: "i" } }],
  //     }).select("-password");
  //     res.json(results);
  //   } catch (error) {
  //     return res.status(400).send(error.message);
  //   }
  // };