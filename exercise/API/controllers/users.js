const { validationResult } = require("express-validator");
const { Op, Sequelize } = require("sequelize");
const UserModal = require("../models/user");
const PostModal = require("../models/posts");
const encrypt = require("bcryptjs");
const PostModel = require("../models/posts");
const sequelize = require("../database/dbConnection");
exports.getAllUsers = async (req, res, next) => {
  try {
    const allUsers = await UserModal.findAll({
      attributes: {
        include: [
          [Sequelize.fn("COUNT", Sequelize.col("post.UserId")), "n_hats"],
        ],
      },
      include: [
        {
          model: PostModel,
          required: false,
        },
      ],
      group: ["post.UserId"],
    });
    res.status(201).json({
      status: true,
      data: allUsers,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message,
    });
  }
};

exports.createUser = async (req, res, next) => {
  const data = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    res.status(500).json({
      status: false,
      errors: error,
    });
  } else {
    //add data to the database
    let hashPassword;
    const password = await encrypt.hash(data.password, 12);
    try {
      const createUser = await UserModal.create({
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        phone_number: data.phone_number || null,
        password: password,
      });
      res.status(201).json({
        status: true,
        message: "data has been added succeddfully!!!",
      });
    } catch (error) {
      res.status(201).json({
        status: false,
        message: error.message,
      });
    }
  }
};

exports.getSingleUser = async (req, res, next) => {
  const id = req.params.id;
  try {
    const data = await UserModal.findOne({
      where: {
        id,
      },
      include: [
        {
          model: PostModel,
        },
      ],
    });
    res.status(201).json({
      status: true,
      data,
    });
  } catch (error) {
    res.status(201).json({
      status: false,
      message: error.message,
    });
  }
};
