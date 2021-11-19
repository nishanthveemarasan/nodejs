const http = require("http");

const express = require("express");

const app = express();

//to acess the request it will be done through middlewares in express js
app.use((req, res, next) => {
  console.log("In the Middlewware");
  next(); //if we want to execute another middleware we need to call this function
  //otherwise it will die from here and will not go to next middleware
}); //accpet array of request handler
app.use((req, res, next) => {
  console.log("In another Middlewware");
  //we will send response from this middleware
  //we dont need to set header or write (html code)
  res.send("<h1>Hello from Express</h1>");
});

app.listen(3001);
// const server = http.createServer(app);
// server.listen(3001);
