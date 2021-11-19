const { validationResult } = require("express-validator");
const { Post, User } = require("../models");
const { Sequelize, Op } = require("sequelize");
const service = require("../function/customFunction");
exports.createPost = async (req, res, next) => {
  const { title, content, type, user_id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({
      status: false,
      data: errors.array(),
    });
  } else {
    const data = {
      title,
      content,
      type,
      user_id,
    };

    try {
      const post = await Post.create(data);
      res.status(500).json({
        status: true,
        data: {
          msg: "Post has been created successfully!!",
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

exports.getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.findAll({
      where: {
        type: "publish",
      },
      include: {
        model: User,
        attributes: ["first_name", "last_name"],
      },
    });
    res.status(500).json({
      status: true,
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

exports.update = async (req, res, next) => {
  const { title, content, type } = req.body;
  const id = req.params.id;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    res.status(500).json({
      status: false,
      error: errors.array(),
    });
  } else {
    const data = {
      title,
      content,
      type,
    };
    try {
      const sendRequest = await Post.update(data, {
        where: {
          id: {
            [Op.eq]: id,
          },
        },
      });

      res.status(201).json({
        status: true,
        data: {
          msg: "Post has been updated Succeefully!!!",
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

exports.getCount = async (req, res, next) => {
  const type = req.query.type;
  console.log(type);
  try {
    const count = await Post.count({
      where: {
        type: type === "all" ? ["publish", "draft"] : type,
      },
    });
    res.status(201).json({
      status: true,
      data: {
        count: count,
      },
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

exports.getSinglePost = async (req, res, next) => {
  const id = req.params.id;
  try {
    const getPost = await Post.findByPk(id);
    service.success(res, getPost, 200);
  } catch (error) {
    res.status(500).json({
      status: false,
      error: error.message,
    });
  }
};

exports.deletePost = async (req, res, next) => {
  const id = req.params.id;
  const requestType = req.body.type;
  const type = requestType === "disabled" ? 0 : 1;

  try {
    const updatePost = await Post.update(
      {
        is_active: type,
      },
      {
        where: {
          id,
        },
      }
    );
    const data = {
      msg: `Post has been ${requestType[0].toUpperCase()}${requestType.slice(
        1
      )} successfully!!`,
    };
    service.success(res, data, 200);
  } catch (error) {
    service.failed(res, error.message, 500);
  }
};
