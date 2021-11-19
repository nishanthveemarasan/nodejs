const express = require("express");
const bodyParser = require("body-parser");
const userRoutes = require("./routes/users");
const likeRoutes = require("./routes/likes");
const sequelize = require("./database/dbConnection");

const UserModel = require("./models/user");
const LikeModel = require("./models/like");
const PostModel = require("./models/posts");
const app = express();

app.use(bodyParser.json());

app.use("/users", userRoutes);
app.use("/likes", likeRoutes);
PostModel.belongsTo(UserModel, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
UserModel.hasMany(PostModel);
PostModel.hasMany(LikeModel, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
LikeModel.belongsTo(PostModel);

sequelize
  .sync()
  .then((result) => {
    app.listen(8080);
  })
  .catch();
