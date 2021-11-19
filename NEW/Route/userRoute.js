const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const UserController = require("../Controllers/UserController");
const { User } = require("../models");
route.post(
  "/create",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("FirstName is Requried!!"),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("lastName is Requried!!"),
    body("phoneNumber")
      .trim()
      .isInt()
      .isLength({ min: 10, max: 16 })
      .withMessage("min 10 digits"),
    body("password")
      .trim()
      .not()
      .isEmpty()
      .isLength({ min: 6 })
      .withMessage("password is required!"),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value.trim() !== req.body.password.trim()) {
          throw new Error("Password Doesnot match");
        }
        return true;
      }),
    body("username").custom(async (value) => {
      if (value.trim().length === 0) {
        throw new Error("username cant be empty");
      } else {
        const username = await User.findOne({
          where: {
            username: value.trim(),
          },
        });
        if (username) {
          throw new Error("username already exists");
        } else {
          return true;
        }
      }
    }),
  ],
  UserController.createUser
);

module.exports = route;
