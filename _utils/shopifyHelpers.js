module.exports.decodeShopifyId = function(id) {
  const gid = Buffer.from(id, 'base64').toString('ascii')
  const gidParts = gid.split('/')
  return gidParts[gidParts.length - 1]
}

module.exports.encodeShopifyId = function(id) {
  return Buffer.from(id).toString('base64')
}
