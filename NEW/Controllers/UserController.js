const APIResponse = require("../APIResponse/ApiResponse");
const { validationResult } = require("express-validator");
const { Sequelize, Op } = require("sequelize");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
exports.createUser = async (req, res, next) => {
  const error = validationResult(req);
  const body = req.body;
  if (!error.isEmpty()) {
    APIResponse.failed(res, error);
  } else {
    const hashPassword = await bcrypt.hash(body.password, 12);
    const data = {
      first_name: body.firstName,
      last_name: body.lastName,
      username: body.username,
      email: body.email,
      phone_number: body.phoneNumber,
      password: hashPassword,
    };
    try {
      const user = await User.create(data);

      APIResponse.success(res, {
        msg: "user has been created successfully",
      });
    } catch (error) {
      APIResponse.failed(res, error.message);
    }
  }
};
