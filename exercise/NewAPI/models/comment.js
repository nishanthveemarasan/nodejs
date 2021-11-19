"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Post }) {
      Comment.belongsTo(Post, {
        as: "posts",
        foreignKey: "postId",
      });
    }
  }
  Comment.init(
    {
      content: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
