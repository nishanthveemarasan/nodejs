const path = require("path");
const express = require("express");

const rootDir = require("../util/path");
const route = express.Router();

route.get("/add-product", (req, res, next) => {
  console.log("middleware is running");
  res.sendFile(path.join(rootDir, "views", "add-product.html"));
});

route.post("/product", (req, res, next) => {
  const param = req.body;
  console.log(param);
  res.redirect("/");
});

module.exports = route;
