const express = require("express");
const route = express.Router();
const commentController = require("../Controllers/comment");
const { body } = require("express-validator");
route.post(
  "/create",
  [body("comment").not().isEmpty().withMessage("Comment field is required!!")],
  commentController.create
);
route.get("/all", commentController.getAllComments);
route.get("/update/:id/:type", commentController.updateComment);

module.exports = route;
