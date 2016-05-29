/**
 * Created by shyam on 28/05/16.
 */

"use strict";


module.exports = (app) => {
    let logger = app.helpers.logger;
    let cardService = app.services.cardService;
    let cardsValidator = app.validators.cardsValidator;

    function addNewCard (req, res, next) {
        logger.info("Adding new card - controller");
        cardsValidator.validateAddNewCard(req.body).then((result) => {
            return cardService.addNewCard(req.body);
        }).then((result) => {
            res.send(result);
        }).catch((err) => next(err));
    };
    
    function moveCard(req, res, next) {
        logger.info("Move card -controller");
        cardsValidator.validateMoveCard(req.body).then(() => {
            return cardService.moveCard(req.body)
        }).then((result) => {
            res.send(result);
        }).catch((err) => next(err));
    };
    
    function reArrangeCard(req, res, next) {
        logger.info("controller- re-arrange");
        cardsValidator.validateReArrangeCard(req.body).then(() => {
            return cardService.reArrangeCard(req.body)
        }).then((result) =>{
            res.send(result);
        }).catch((err) => next(err))
    };

    return {
        addNewCard: addNewCard,
        reArrangeCard: reArrangeCard,
        moveCard: moveCard
    }

}
