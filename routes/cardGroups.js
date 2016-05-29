/**
 * Created by shyam on 28/05/16.
 */

"use strict";


let express = require('express');
let router = express.Router();

module.exports = app => {
    let cardGroupsController = app.controllers.cardGroupsController;

    router.route("/").get((req, res, next) => {
        return cardGroupsController.fetchAllCardGroupsWithCards(req, res, next);
    }).post((req, res, next) => {
        return cardGroupsController.addNewGroup(req, res, next);
    });

    return router;
}
