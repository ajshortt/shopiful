import { fetchResourcesForProducts } from './fetch-resources-for-products';

module.exports.paginateProductConnectionsAndResolve = function(client) {
  return function(products) {
    return fetchResourcesForProducts(products, client).then(() => {
      return products;
    });
  };
}
