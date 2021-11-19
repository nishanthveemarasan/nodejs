const express = require("express");
const route = express.Router();
const { User } = require("../models");
route.get("/users/get", async (req, res, next) => {
  try {
    const data = await User.findAll({});
    res.status(200).json({
      status: data,
    });
  } catch (error) {
    res.status(500).json({
      status: error.response,
    });
  }
});

module.exports = route;
