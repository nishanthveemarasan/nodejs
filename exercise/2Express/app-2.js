const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.urlencoded({ extended: false })); //parse the incoming request body
//this is how we use route in the middle ware
app.use("/add-product", (req, res, next) => {
  console.log("In another Middlewware");
  res.send(
    "<form action='/product' method='POST'><input type='text' name='title' /><button type='submit'>Add Product</button></form>"
  );
});

//by default middleware will perform for both GET and POST request if we dont define the method
//to make the middleware to perform only for GET => app.get()
//to make the middleware to perform only for POST => app.post()
//we can also use app.put(), app.delete() , app.push()
app.post("/product", (req, res, next) => {
  console.log(req.body); //it will return the object with key => value pair
  res.redirect("/");
});
app.use("/", (req, res, next) => {
  console.log("In another Middlewware");
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3001);
