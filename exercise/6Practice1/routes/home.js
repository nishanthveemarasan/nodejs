const express = require("express");

const route = express.Router();

const productCOntroller = require("../controllers/productController");
route.get("/", productCOntroller.getAllProducts);

exports.router = route;
