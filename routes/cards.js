/**
 * Created by shyam on 28/05/16.
 */

"use strict";


"use strict";


let express = require('express');
let router = express.Router();

module.exports = app => {
    let logger = app.helpers.logger;
    let cardsController = app.controllers.cardsController;

    router.route("/").post((req, res, next) => {
        return cardsController.addNewCard(req, res, next);
    });

    router.route("/:id/re-arrange").put((req, res, next) => {
        logger.info("route- re-arrange")
        return cardsController.reArrangeCard(req, res, next)
    });

    router.route("/:id/move").put((req, res, next) => {
        logger.info("route-move")
        return cardsController.moveCard(req, res, next)
    });
    return router;
}
