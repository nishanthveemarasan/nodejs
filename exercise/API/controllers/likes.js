const { Sequelize, Op } = require("sequelize");
const LikeModel = require("../models/like");
const PostModal = require("../models/posts");
const UserModel = require("../models/user");
const sequelize = require("../database/dbConnection");
const PostModel = require("../models/posts");

exports.getAllLikes = async (req, res, next) => {
  try {
    const likes = await LikeModel.findAll({
      //   include: { model: PostModel, include: { model: UserModel } },
      include: {
        model: PostModel,
      },
    });
    res.status(200).json({
      message: "successs",
      data: likes,
    });
  } catch (error) {}
};
