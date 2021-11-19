const express = require("express");
const userController = require("../controllers/users");
const route = express.Router();
const { body } = require("express-validator");
const UserModal = require("../models/user");

//Route::get(/get , controller@method)

route.get("/get", userController.getAllUsers);
route.post(
  "/create",
  [
    body("firstName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("First Name is Required"),
    body("lastName")
      .trim()
      .not()
      .isEmpty()
      .withMessage("Last Name is required"),
    body("email")
      .trim()
      .isEmail()
      .withMessage("Please Enter a valid Email")
      .custom(async (value) => {
        const user = await UserModal.findOne({
          where: {
            email: value,
          },
        });
        if (user) {
          throw new Error("Email has already been taken");
        } else {
          return true;
        }
      }),
    body("password")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Password should have minimum 5 charactors"),
    body("confirmPassword").custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Password doesnot match");
      }
      return true;
    }),
  ],
  userController.createUser
);

route.get("/:id", userController.getSingleUser);

module.exports = route;
