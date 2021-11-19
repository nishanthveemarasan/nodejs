const express = require("express");

const app = express();

const bodyParser = require("body-parser");

const adminRoutes = require("./routes/admin");
const homeRoutes = require("./routes/home");

const errorController = require("./controllers/errorController");
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/admin", adminRoutes.route);
app.use(homeRoutes.router);
app.use(errorController.get404);
app.listen(3000);
