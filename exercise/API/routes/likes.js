const express = require("express");
const route = express.Router();
const userController = require("../controllers/likes");

route.get("/get", userController.getAllLikes);

module.exports = route;
