const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const rootDir = require("./util/path");
const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");
app.use(bodyParser.urlencoded({ extended: false })); //parse the incoming request body
//this is how we use route in the middle ware
//sometime some paths have the same start
app.use("/admin", adminRoutes); //only routes start with admin will go here
app.use(shopRoutes);
//404 error
app.use("/", (req, res, next) => {
  res.status(404).sendFile(path.join(rootDir, "views", "404.html"));
  // res.status(404).send("<h1>Page not Found</h1>");
});

app.listen(3001);
