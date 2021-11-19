const express = require("express");
const route = express.Router();
const { body } = require("express-validator");
const userController = require("../Controllers/user");
const { User } = require("../models");
route.post(
  "/create",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("First Name is reuqired!!"),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Last Name is required!!"),
    body("username")
      .trim()
      .isLength({ min: 6 })
      .withMessage("username must be atleast 6 charactors")
      .custom(async (value) => {
        const userNameExists = await User.findOne({
          where: {
            username: value,
          },
        });
        if (userNameExists) {
          throw new Error("User name Has already been taken!!");
        }
        return true;
      }),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please Enter a valid Email")
      .custom(async (value) => {
        const userNameExists = await User.findOne({
          where: {
            email: value,
          },
        });
        if (userNameExists) {
          throw new Error("Email Has already been Taken!!");
        }
        return true;
      }),
    body("password")
      .trim()
      .isLength({ min: 6 })
      .withMessage("password must be atleast 6 charactors"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password does not match!!");
      }
      return true;
    }),
  ],
  userController.createUser
);

route.get("/getAll", userController.getUsers);
route.post(
  "/update/:id",
  [
    body("firstName").not().isEmpty().withMessage("First Name is required!!!"),
    body("lastName").not().isEmpty().withMessage("Last Name is required!!!"),
    body("phoneNumber")
      .not()
      .isEmpty()
      .withMessage("Phone Number is required!!!"),
  ],
  userController.updateUser
);

route.post("/get/:id", userController.getUser);
route.get("/post/:id", userController.getPosts);
route.get("/comment/:id", userController.getComments);

module.exports = route;
