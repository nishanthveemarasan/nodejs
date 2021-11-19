const express = require("express");

const route = express.Router();

const postController = require("../controller/post");

route.get("/get", postController.getAllPosts);

module.exports = route;
