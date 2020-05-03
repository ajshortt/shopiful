const Shopify = require('shopify-buy')
require('isomorphic-fetch')

module.exports = Shopify.buildClient({
  domain: process.env.shopify_domain,
  storefrontAccessToken: process.env.shopify_access_token
})
