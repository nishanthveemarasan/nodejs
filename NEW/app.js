const express = require("express");
const bodyParse = require("body-parser");
const app = express();
app.use(bodyParse.json());
const UserRoute = require("./Route/userRoute");

app.use("/user", UserRoute);

app.listen(3003);
