const { validationResult } = require("express-validator");
const becrypt = require("bcryptjs");
const { User, Post, Comment } = require("../models");
const { Sequelize, Op } = require("sequelize");
const service = require("../function/customFunction");
exports.createUser = async (req, res, next) => {
  const { firstName, lastName, username, email, phoneNumber, password } =
    req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({
      status: false,
      error: errors.array(),
    });
  } else {
    try {
      const hashPassword = await becrypt.hash(password, 10);

      const userData = {
        first_name: firstName,
        last_name: lastName,
        username,
        email,
        phone: phoneNumber,
        password: hashPassword,
      };

      const user = await User.create(userData);
      res.status(201).json({
        status: true,
        data: {
          msg: "User Data has been created successfully!!!",
        },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.message,
      });
    }
  }
};

exports.getUsers = async (req, res, next) => {
  try {
    const users = await User.findAll();
    res.status(201).json({
      status: true,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.response,
    });
  }
};

exports.updateUser = async (req, res, next) => {
  const id = req.params.id;
  const { firstName, lastName, phoneNumber } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({
      status: false,
      error: errors.array(),
    });
  } else {
    const data = {
      first_name: firstName,
      last_name: lastName,
      phone: phoneNumber,
    };
    try {
      const updateUser = await User.update(data, {
        where: {
          id,
        },
      });
      res.status(201).json({
        status: true,
        data: {
          msg: "User has been updated successfully",
        },
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.response,
      });
    }
  }
};
exports.getUser = async (req, res, next) => {
  const id = req.params.id;
  const action = req.query.action;
  if (action === "get") {
    try {
      //where id = 1(id , 1)/ (id , = , 1)
      const user = await User.findOne({
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      });
      res.status(201).json({
        status: true,
        data: user,
      });
    } catch (error) {
      res.status(500).json({
        status: false,
        error: error.response,
      });
    }
  } else {
    const status = action === "disabled" ? 0 : 1;
    const data = {
      status,
    };
    const updateUser = User.update(data, {
      where: {
        id: {
          [Op.eq]: id,
        },
      },
    });
    res.status(201).json({
      status: true,
      data: {
        msg:
          status === 1 ? "User Has been Enabled!!" : "User has been disabled!!",
      },
    });
  }
};

exports.getPosts = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getUserPosts = await User.findByPk(id, {
      attributes: ["first_name", "last_name"],
      include: {
        model: Post,
        attributes: ["title", "content"],
      },
    });
    res.status(201).json({
      status: true,
      data: getUserPosts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

exports.getComments = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const getComments = await User.findByPk(id, {
      include: {
        model: Comment,
      },
    });
    service.success(res, getComments, 201);
  } catch (error) {
    service.failed(res, error.message, 500);
  }
};
