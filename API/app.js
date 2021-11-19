const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

const userRoute = require("./Routes/User");
app.use("/user", userRoute);

app.listen(3003);
