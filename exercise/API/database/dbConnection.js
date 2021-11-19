const { Sequelize } = require("sequelize");

const mysql = new Sequelize("nodejs", "root", "", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = mysql;
