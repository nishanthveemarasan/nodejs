const express = require("express");

const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET , POST");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type , Authorization");
  next();
});

const feedRoutes = require("./router/feed");

app.use("/feed", feedRoutes);

app.listen(8080);
