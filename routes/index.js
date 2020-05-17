const ContentfulClient = require('../_clients/Contentful')
const ShopifyClient = require('../_clients/Shopify')
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
  ShopifyClient.product.fetchAllWithTags().then((data) => {
    const products = data.map((productData) => {
      const product = new Product(productData)
      return product.get
    })
    res.json(products)
  })
})

router.get('/products/:query', function(req, res, next) {
  const { query } = req.params

  const productFetcher = (query.match(/^[0-9]+$/) != null)
    ? ShopifyClient.product.fetch(query)
    : ShopifyClient.product.fetchByHandle(query)

  productFetcher
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
