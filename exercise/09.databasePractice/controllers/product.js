const Product = require("../models/product");
exports.getAllProducts = (req, res, next) => {
  Product.fetchAll()
    .then(([rows, fieldData]) => {
      console.log(rows);
    })
    .catch();
  res.send("<h1>Welcome</h1>");
};

exports.getSingleProduct = (req, res, next) => {
  const id = req.params.id;
  Product.fetchById(id)
    .then(([rows, fieldData]) => {
      console.log(rows);
    })
    .catch();
};
