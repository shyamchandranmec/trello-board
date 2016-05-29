"use strict";

let express = require('express');
let router = express.Router();


module.exports = (app) => {

  let logger = app.helpers.logger;
  let indexController = app.controllers.indexController;

  router.route("/").get((req, res, next) => {
    indexController.fetchHomePageData(req, res, next)
  });

  return router;

};

