const express = require("express");

const router = express.Router();

const productController = require("../controllers/productController");

router.get("/products", productController.getddProducts);

router.post("/add-product", productController.postAddProducts);

exports.route = router;
