const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.json());

//users/create
const userRoute = require("./Routes/user");
const postRoute = require("./Routes/post");
const commentRoute = require("./Routes/comment");
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/comment", commentRoute);

app.listen(3002);
