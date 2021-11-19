const path = require("path");
const express = require("express");
const routes = express.Router();

const rootDir = require("../util/path");

routes.get("/", (req, res, next) => {
  console.log("In another Middlewware");
  //res.send("<h1>Hello from Express</h1>");
  res.sendFile(path.join(rootDir, "views", "shop.html")); //always should start from the root
});
module.exports = routes;
