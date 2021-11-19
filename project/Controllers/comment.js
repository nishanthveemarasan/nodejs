const { User, Comment, Post } = require("../models");
const { validationResult } = require("express-validator");
const service = require("../function/customFunction");
exports.create = async (req, res, next) => {
  const { comment, user_id, post_id } = req.body;
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    service.failed(res, errors.array(), 500);
  } else {
    const data = {
      comment,
      user_id,
      post_id,
    };
    try {
      const createComment = await Comment.create(data);
      const response = {
        msg: "Comment has been created Successfully!!",
      };
      service.success(res, response, 201);
    } catch (error) {
      service.failed(res, error.message, 500);
    }
  }
};

exports.getAllComments = async (req, res, next) => {
  try {
    const getComments = await Comment.findAll({
      include: {
        model: User,
        attributes: ["first_name", "last_name"],
      },
    });
    service.success(res, getComments, 201);
  } catch (error) {
    service.failed(res, error.message, 500);
  }
};

exports.updateComment = async (req, res, next) => {
  const type = req.params.type;
  const id = req.params.id;
  const status = type === "enabled" ? 1 : 0;
  const data = {
    status,
  };
  try {
    const update = await Comment.update(data, {
      where: {
        id,
      },
    });
    const resData = {
      msg: `Comment has been ${type[0].toUpperCase()}${type.slice(
        1
      )} successfully!!`,
    };
    service.success(res, resData, 201);
  } catch (error) {
    service.failed(res, error.message, 500);
  }
};
