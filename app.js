"use strict";
let express = require("express");
let consign = require("consign");
let logger = require("winston");
let app = express();

consign()
    .include("./helpers")
    .include("./models/db.js")
    .include("./models/")
    .then("./middlewares/basicSettings.js")
    .then("./middlewares/staticResources.js")
    .then("./services/")
    .then("./validators/schemas")
    .then("./validators/")
    .then("./controllers/")
    .then("./routes")
    .then("./middlewares/routes.js")
    .then("./middlewares/errorHandler.js")
    .then("./middlewares/server.js")
    .into(app);




module.exports = app;