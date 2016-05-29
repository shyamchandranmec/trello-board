/**
 * Created by shyam on 28/05/16.
 */


"use strict";


module.exports = (app) => {

    let logger = app.helpers.logger;
    let cardModel = app.models.card;

  
    function addNewCard(details) {
        return cardModel.addNewCard(details);
    };

    function reArrangeCard(details) {
        logger.info("service re- arrange")
        return cardModel.reArrangeCard(details);
    };
    
    function moveCard (details){
        logger.info("service move");
        return cardModel.moveCard(details);
    };

    return {
        addNewCard: addNewCard,
        reArrangeCard: reArrangeCard,
        moveCard: moveCard
    }
}