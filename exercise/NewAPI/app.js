const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const userRoute = require("./route/user");
app.use(userRoute);
app.listen(8080);
