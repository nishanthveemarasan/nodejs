const path = require("path");

const rootDir = require("./util/path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

const adminRoute = require("./routes/admin");
const shopRoute = require("./routes/shop");
app.use("/admin", adminRoute);
app.use(shopRoute);

app.use("/", (req, res, next) => {
  res.sendFile(path.join(rootDir, "views", "404.html"));
});
app.listen(3002);
