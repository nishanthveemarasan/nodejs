const db = require("../database/dbConnection");
module.exports = class Product {
  static save(data) {}
  static fetchAll() {
    return db.execute("SELECT * FROM stock");
  }
  static fetchById(id) {
    return db.execute("SELECT * FROM stock where stock.id = ?", [id]);
  }
};
