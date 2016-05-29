/**
 * Created by shyam on 28/05/16.
 */

"use strict";

module.exports = (app) => {
    let logger = app.helpers.logger;
    let cardGroupService = app.services.cardGroupService;

    function fetchHomePageData(req, res, next) {
        return cardGroupService.fetchAllCardGroupsWithCards().then((result) => {
            res.render('index', { title: 'Trello', data: result });
        }).catch((err) => next(err));
    }

    return {
        fetchHomePageData: fetchHomePageData
    }
}