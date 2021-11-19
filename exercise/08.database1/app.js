const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");

const sequelize = require("./util/database");

const Product = require("./models/product");
const User = require("./models/user");
const Cart = require("./models/cart");
const CartItem = require("./models/cart-item");

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use((req, res, next) => {
  User.findByPk(1)
    .then((user) => {
      req.user = user;
      next();
    })
    .catch();
});

app.use("/admin", adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404);

Product.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
  onUpdate: "CASCADE",
});
User.hasOne(Cart); //user has one cart
Cart.belongsToMany(Product, { through: CartItem }); //many to many require intermediate table

//USer,hasMany(Product)
sequelize
  .sync()
  .then((result) => {
    //  console.log(result);
    return User.findByPk(1);
    //app.listen(3000);
  })
  .then((user) => {
    if (!user) {
      return User.create({
        name: "Nishanth",
        email: "test@gmail.com",
      });
    }

    return user;
  })
  .then((result) => {
    console.log(result);
    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
