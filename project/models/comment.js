"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Post }) {
      Comment.belongsTo(User, {
        foreignKey: "user_id",
        constraints: true,
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      });
      Comment.belongsTo(Post,{
        foreignKey: "post_id",
        constraints: true,
        onDelete:"CASCADE",
        onUpdate:"CASCADE"
      });
    }
  }
  Comment.init(
    {
      comment: DataTypes.TEXT,
      status: DataTypes.STRING,
      user_id: DataTypes.INTEGER,
      post_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
