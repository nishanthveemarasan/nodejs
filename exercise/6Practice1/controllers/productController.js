const products = [];
exports.getddProducts = (req, res, next) => {
  res.send(
    '<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>'
  );
};

exports.postAddProducts = (req, res, next) => {
  products.push({ title: req.body.title });
  console.log(products);
  res.send("<h1>You are Here</h1>");
};
exports.getAllProducts = (req, res, next) => {
  res.send("<h1>Welcome</h1>");
};
