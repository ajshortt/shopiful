const express = require("express");
const app = express();

const routes = require("./routes");
app.use(routes);

function shopiful(options) {
    this.addServerMiddleware({
        path: "/api",
        handler: app
    });
}

module.exports = shopiful;
module.exports.meta = require('./package.json')
