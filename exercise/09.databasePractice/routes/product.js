const express = require("express");

const route = express.Router();

const productController = require("../controllers/product");

route.get("/get-all", productController.getAllProducts);

route.get("/get-single/:id", productController.getSingleProduct);

exports.router = route;
