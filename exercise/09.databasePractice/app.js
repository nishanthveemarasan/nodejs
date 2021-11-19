const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const productRoutes = require("./routes/product");

// const db = require("./database/dbConnection");
// db.execute("SELECT * FROM stock")
//   .then(([rows, fieldData]) => {
//     console.log(rows);
//   })
//   .catch((err) => {
//     console.log(err);
//   });

app.use(bodyParser.urlencoded({ extended: false }));

app.use("/products", productRoutes.router);

app.listen(3000);
