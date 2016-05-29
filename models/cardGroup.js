/**
 * Created by shyam on 28/05/16.
 */
"use strict";

module.exports = (app)=> {
    let db = app.models.db;

    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;
    let Card = app.models.card;
    var CardGroup = db.Model.extend({
            tableName: 'card_group',
            idAttribute: "id",
            cards: function () {
                return this.hasMany(Card);
            }
        }
    );

    CardGroup.fetchAllCardGroupsWithCards = function () {
        return new Promise((resolve, reject) => {
            CardGroup.collection().fetch({
                withRelated: [{'cards': function (qb) {
                    qb.orderBy('position', "asc");
                }}]
            }).then((result) => {
                logger.info("Got all card groups", result.length);
                return resolve(result);
            }).catch((err) => {
                logger.error("Unable to fetch card groups");
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to fetch card gropus"
                });
                reject(errObj);
            })
        })
    };

    CardGroup.removeCardGroup = function (id) {
        return new Promise((resolve, reject) => {
            CardGroup.forge({id: id}).destroy().then((res) => {
                logger.info("Successfully removed cardGroup with id "+id)
                resolve()
            }).catch((err) => {
                logger.error("Unable to remove card group");
                reject()
            })
        })
    }

    CardGroup.addNewGroup = function (details) {
        return new Promise((resolve, reject) => {
            CardGroup.forge(details).save().then((result) => {
                logger.info("New group added", result);
                return resolve(result);
            }).catch((err) => {
                logger.error("Unable to add new group");
                logger.error(err.message)
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to add new group"
                });
                return reject(errObj);
            })
        })
    };

    return CardGroup;
}