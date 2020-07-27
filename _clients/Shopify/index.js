const Shopify = require('shopify-buy/index.unoptimized.umd')
const ExtendedClient = require('./extend/ExtendedClient')
require('isomorphic-fetch')

const ShopifyClient = Shopify.buildClient({
  domain: process.env.shopify_domain,
  storefrontAccessToken: process.env.shopify_access_token
})

const Client = new ExtendedClient(ShopifyClient)

module.exports = Client.get()
