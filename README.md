# Shopiful
Sever-side middleware, generating API endpoints to access Shopify products decorated with extra Contentful provided data.

![npm](https://img.shields.io/npm/v/shopiful)
![GitHub](https://img.shields.io/github/license/ajshortt/shopiful)
![GitHub issues](https://img.shields.io/github/issues/ajshortt/shopiful)

Utilising the [Shopify Storefront API](https://github.com/Shopify/js-buy-sdk), the middleware fetches both collections and products from Shopify then intrinsically fetches extra data from [Contentful](https://www.contentful.com/).

Why? 🧐 Because whilst Shopify is great for most ecommerce features, it isn't geared for adding rich page content. So this module helps solve that 👍🏼

## Getting Started

This module is best used with SSR or statically generated builds. It is recommended that the exposed endpoints are used to hydrate your app with data ideally into the Vuex store via the `nuxtServerInit` action. For more information on this, check the [examples section](##Examples).

### Prerequisites

Firstly, it is assumed you already have a Shopify store. If not, head over to [Shopify](https://www.shopify.co.uk/) to get going. Secondly, you'll need a Contentful account and space setup. Again, if you haven't then head to [Contentful](https://www.contentful.com/) to set this up.

### Setup

Add Shopiful dependency to your project
```
// Yarn
yarn add shopiful

// NPM
npm install shopiful
```

Add the module to your `nuxt.config.js` file
```
export default {
  modules: [
    'shopiful'
  ]
}
```

#### Configuration variables

Now you'll then need to grab the following configuration keys:

**Shopify**
- Store domain (e.g `your-shop-name.myshopify.com`)
- Access token

**Contentful**
- Space ID
- Access token

It is recommended that these keys are stored in an `.env` file and made available to the middleware via the [`@nuxtjs/dotenv` package](https://github.com/nuxt-community/dotenv-module). Add the keys like so:
```
shopify_access_token=xxx
shopify_domain=xxx
contentful_space_id=xxx
contentful_access_token=xxx
```
It is likely you'll be using the Shopify SDK on the client side too so storing the keys here will make it handy for two reasons!

## Options
> ⚠️ Currently, options are not available. They will be available in  coming releases.

### Proposed options
- Cache - Boolean - Cache SSR request feature
- API Path - String - Add custom API path (default `/api/{products|collections}`)

## Examples

If you're not already, you should reallty use [axios](https://github.com/axios/axios) for your applications HTTP requests. Nuxt have their [own module](https://axios.nuxtjs.org/) for this get this installed. If you don't like axios then by all means use whatever method you want.

### In `asyncData`
```javascript
// pages/products/_slug.vue

export default {
  asyncData({ app, params, error }) {
    return app.$axios
      .get(`api/products/${params.slug}`)
      .then((res) => {
        return { product: res.data }
      })
      .catch((err) => {
        return error({ statusCode: 404, message: err.message })
      })
  }
}
```

### Hydrating store with `nuxtServerInit`

```javascript
// store/index.js

export const actions = {
  nuxtServerInit({ commit, dispatch }, { app }) {
    const collectionsRequest = app
      .$axios('/api/collections')
      .then((collections) => {
        commit('products/setCollections', collections.data)
      })
    const productsRequest = app.$axios('/api/products').then((products) => {
      commit('products/setProducts', products.data)
    })
    return Promise.all([collectionsRequest, productsRequest])
  }
}
```

## Built With

* [Shopify Buy](https://www.npmjs.com/package/shopify-buy) - Shopify JavaScript Buy SDK
* [Contentful](https://www.npmjs.com/package/contentful) - Contentful JavaScript Delivery SDK
* [Express](https://www.npmjs.com/package/express) - Used for generating the API routes

## Contributing

Please read [CONTRIBUTING.md](https://github.com/ajshortt/shopiful/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).

## Authors

* **Alex Shortt** - *Core build* - [ajshortt](https://github.com/ajshortt)

See also the list of [contributors](https://github.com/ajshortt/shopiful/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Shopify
* Contentful
