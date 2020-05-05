const { partial } = require('../../../_utils/helpers.js')
const { defaultResolver } = require('./resolver.js')
const { paginateProductConnectionsAndResolve } = require('./paginators.js')

class ExtendedClient {
  constructor(ShopifyClient) {
    this.client = ShopifyClient;
    this.extend();
  }

  extend() {
    this.client.product.fetchAllWithTags = partial(
      this.allProductsWithTagsQuery,
      this.client
    );
  }

  allProductsWithTagsQuery(client) {
    const query = client.graphQLClient.query((root) => {
      root.addConnection(
        "products",
        {
          args: { first: 250 },
        },
        (Product) => {
          Product.add("title");
          Product.add("handle");
          Product.add("tags");
          Product.addConnection(
            "images",
            { args: { first: 250 } },
            (images) => {
              images.add("id");
              images.add("src");
              images.add("altText");
            }
          );
          Product.addConnection(
            "variants",
            { args: { first: 250 } },
            (variants) => {
              variants.add("product");
              variants.add("title");
              variants.add("price");
              variants.add("sku");
            }
          );
        }
      );
    });

    return client.graphQLClient
      .send(query)
      .then(defaultResolver('products'))
      .then(paginateProductConnectionsAndResolve(client.graphQLClient));
  }

  get() {
    return this.client;
  }
}

module.exports = ExtendedClient;
