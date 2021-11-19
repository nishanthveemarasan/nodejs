const { Sequelize, DataTypes } = require("sequelize");

const mysql = require("../database/dbConnection");
const queryInterface = mysql.getQueryInterface();



const User = mysql.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    first_name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      get() {
        return this.getDataValue("first_name").toUpperCase();
      },
    },
    last_name: {
      type: DataTypes.STRING(50),
      allowNull: true,
      set(value) {
        this.setDataValue("last_name", value.toLowerCase());
      },
    },
    email: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    phone_number: {
      type: DataTypes.STRING(50),
      allowNull: true,
    },
    password: {
      type: DataTypes.STRING(50),
      allowNull: false,
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

module.exports = User;
