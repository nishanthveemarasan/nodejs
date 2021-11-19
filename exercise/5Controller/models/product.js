const products = [];
module.exports = class product {
  constructor(title) {
    this.title = title;
  }
  save() {
    products.push(this);
  }

  static fetchAll() {
    return products;
  }
};
