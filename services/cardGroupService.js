/**
 * Created by shyam on 28/05/16.
 */

"use strict";


module.exports = (app) => {

    let logger = app.helpers.logger;
    let cardGroupModel = app.models.cardGroup;
    
    function fetchAllCardGroupsWithCards() {
        return cardGroupModel.fetchAllCardGroupsWithCards();
    };

    function addNewGroup(details) {
        return cardGroupModel.addNewGroup(details);
    };

    return {
        fetchAllCardGroupsWithCards: fetchAllCardGroupsWithCards,
        addNewGroup: addNewGroup
    }
}