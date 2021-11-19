const apiResponse = require("../APIResponse/ApiResponse");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const { Sequelize } = require("sequelize");
exports.createUser = async (req, res, next) => {
  const body = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    apiResponse.failed(res, errors.array(), 500);
  } else {
    const hashPassword = await bcrypt.hash(body.password, 12);
    const data = {
      first_name: body.firstName,
      last_name: body.lastName,
      username: body.username,
      email: body.email,
      password: hashPassword,
    };
    try {
      const create = await User.create(data);
      apiResponse.success(
        res,
        {
          msg: "User has been created successfully?",
        },
        200
      );
    } catch (error) {
      apiResponse.failed(res, error.message, 500);
    }
  }
};
