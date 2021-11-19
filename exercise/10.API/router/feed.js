const express = require("express");

const { check, body } = require("express-validator");
const router = express.Router();

const feedController = require("../controllers/feed");

router.get("/posts", feedController.getPosts);

router.post(
  "/add-post",
  [
    body("email").trim().isEmail().withMessage("Email Field Cant be Empty"),
    body("username")
      .escape()
      .trim()
      .isLength({ min: 6 })
      .withMessage("Username must be Atleast 6 characters"),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("PAssword Field is required"),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value !== req.body.password) {
          throw new Error("password does not match");
        }
        return true;
      }),
  ],
  feedController.addPosts
);

module.exports = router;
