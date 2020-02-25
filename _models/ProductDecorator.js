function ProductDecorator(product, extraFields) {
  this.product = product
  this.extraFields = extraFields
}

Object.defineProperty(ProductDecorator.prototype, 'get', {
  get: function get() {
    return {
      ...this.product,
      ...this.extraFields
    }
  }
})

module.exports = ProductDecorator
