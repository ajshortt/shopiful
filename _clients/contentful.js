const contentful = require('contentful')

module.exports = contentful.createClient({
  space: process.env.contentful_space_id,
  accessToken: process.env.contentful_access_token
})
