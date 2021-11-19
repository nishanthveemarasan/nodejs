const { Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../database/dbConnection");

const PostModel = sequelize.define(
  "Post",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_published: {
      type: DataTypes.STRING(50),
      defaultValue: "draft",
    },
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: 1,
    },
  },
  {
    freezeTableName: true,
  }
);

module.exports = PostModel;
