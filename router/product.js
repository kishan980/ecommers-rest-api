const { verifiyTokenAdmin } = require("./verifiyToken");

const router = require("express").Router();
const ProductModel = require("../model/product.model");
router.post("/productAdd", verifiyTokenAdmin, async (req, res) => {
  try {
    const { title, desc, img, categories, size, color, price } = req.body;
    const newProduct = new ProductModel({
      title,
      img,
      desc,
      categories,
      size,
      color,
      price,
    });
    const saveProduct = await newProduct.save();
    return res
      .status(201)
      .json({ data: saveProduct, message: "product are created" });
  } catch (error) {
    return res.status(500).json(error);
  }
});

router.get("/product-all", verifiyTokenAdmin, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let products;
    if (qNew) {
      products = await ProductModel.find().sort({ createdAt: -1 }).limit(5);
    } else if (qCategory) {
      products = await ProductModel.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      products = await ProductModel.find();
    }
    return res.status(200).json(products);
  } catch (error) {
    return res.status(500).json(error);
  }
});

module.exports = router;
