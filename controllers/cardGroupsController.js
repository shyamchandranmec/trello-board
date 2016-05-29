/**
 * Created by shyam on 28/05/16.
 */

"use strict";


module.exports = (app) => {
    let logger = app.helpers.logger;
    let cardGroupService = app.services.cardGroupService;
    let cardsGroupsValidator = app.validators.cardsGroupsValidator;

    function fetchAllCardGroupsWithCards(req, res, next) {
        return cardGroupService.fetchAllCardGroupsWithCards().then((cards) => {
            res.send(cards);
        }).catch((err) => next(err));
    };

    function addNewGroup(req, res, next) {
        logger.info("Adding new card group - controller");
        return cardsGroupsValidator.validateAddNewGroup(req.body).then(() => {
            return cardGroupService.addNewGroup(req.body);
        }).then((result) => {
            res.send(result);
        }).catch((err) => next(err));
    };
   
    return {
        fetchAllCardGroupsWithCards: fetchAllCardGroupsWithCards,
        addNewGroup: addNewGroup
    }
}