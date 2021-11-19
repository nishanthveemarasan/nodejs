const express = require("express");

const app = express();

const bodyParser = require("body-parser");

app.use(bodyParser.json());
//i want to crate routes
//controllers

const postRoute = require("./routes/posts");

app.use("/posts", postRoute);

app.listen(8080);
