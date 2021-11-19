"use strict";
const { Model } = require("sequelize");

class Like extends Model {}
/**
 * Helper method for defining associations.
 * This method is not a part of Sequelize lifecycle.
 * The `models/index` file will call this method automatically.
 */

Like.init(
  {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "Like",
  }
);

module.exports = Like;
