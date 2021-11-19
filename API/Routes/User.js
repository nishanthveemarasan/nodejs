const express = require("express");
const route = express.Router();

const userController = require("../Controller/UserController");
const { body } = require("express-validator");
const { User } = require("../models");
route.post(
  "/create",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("First Name is Required!"),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Last Name is required!!"),
    body("username").custom(async (value) => {
      const findUser = await User.findOne({
        where: {
          username: value.trim(),
        },
      });
      if (findUser) {
        throw new Error("User name has aleady been taken");
      }
      return true;
    }),
    body("phoneNumber")
      .trim()
      .isInt()
      .isLength({ min: 10 })
      .withMessage("Phone Number should have atleast 10 digits"),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Password must have atleast 6 charactors"),
    body("confirmPassword")
      .trim()
      .custom((value, { req }) => {
        if (value.trim() !== req.body.password.trim()) {
          throw new Error("Password Does not match");
        }
        return true;
      }),
  ],
  userController.createUser
);

module.exports = route;
