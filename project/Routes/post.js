const express = require("express");

const route = express.Router();
const { body } = require("express-validator");
const postController = require("../Controllers/post");

route.post(
  "/create",
  [
    body("title").not().isEmpty().withMessage("Title field is required!!!"),
    body("content").not().isEmpty().withMessage("Content field is required!!!"),
    body("type").isIn(["publish", "draft"]).withMessage("Type is not valid!!"),
  ],
  postController.createPost
);

route.get("/get-all", postController.getAllPosts);
route.post(
  "/update/:id",
  [
    body("title").not().isEmpty().withMessage("Title field is required!!!"),
    body("content").not().isEmpty().withMessage("Content field is required!!!"),
    body("type").isIn(["publish", "draft"]).withMessage("Type is not valid!!"),
  ],
  postController.update
);
route.get("/count", postController.getCount);
route.get("/:id", postController.getSinglePost);
route.post("/:id", postController.deletePost);
module.exports = route;
