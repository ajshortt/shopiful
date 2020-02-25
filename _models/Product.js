const { decodeShopifyId } = require('../_utils/shopifyHelpers.js')

function Product(raw) {
  this.data = raw
}

Object.defineProperty(Product.prototype, 'id', {
  get: function id() {
    return decodeShopifyId(this.data.id)
  }
})

Object.defineProperty(Product.prototype, 'getId', {
  get: function getId() {
    return decodeShopifyId(this.data.id)
  }
})

Object.defineProperty(Product.prototype, 'get', {
  get: function get() {
    return {
      ...this.data,
      id: this.getId
    }
  }
})

module.exports = Product
