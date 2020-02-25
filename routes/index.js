const ContentfulClient = require('../_clients/contentful')
const ShopifyClient = require('../_clients/shopify')
const Product = require('../_models/Product')
const ProductDecorator = require('../_models/ProductDecorator')
const { Router } = require('express')

const router = Router()

router.get('/collections', function(req, res, next) {
  ShopifyClient.collection.fetchAllWithProducts().then((collections) => {
    res.json(collections)
  })
})

router.get('/products', function(req, res, next) {
  ShopifyClient.product.fetchAll().then((data) => {
    const products = data.map((productData) => {
      const product = new Product(productData)
      return product.get
    })
    res.json(products)
  })
})

router.get('/products/:slug', function(req, res, next) {
  const { slug } = req.params
  ShopifyClient.product
    .fetchByHandle(slug)
    .then((data) => {
      const product = new Product(data)
      const id = product.getId
      ContentfulClient.getEntries({
        content_type: 'product',
        'fields.id[in]': id
      }).then((entry) => {
        if (entry.total) {
          const decoratedProduct = new ProductDecorator(
            product.get,
            entry.items[0].fields
          )
          res.json(decoratedProduct.get)
        } else {
          res.json(product.get)
        }
      })
    })
    .catch(() => {
      res.status(404).send('Product not found')
    })
})

module.exports = router
