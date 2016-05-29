/**
 * Created by shyam on 28/05/16.
 */
"use strict";

let Bookshelf = require("bookshelf");

module.exports = (app)=> {
    let db = app.models.db;

    let logger = app.helpers.logger;
    let errorFormatter = app.helpers.errorFormatter;
    var Card = db.Model.extend({
            tableName: 'cards'
        }
    );

    Card.fetchAllCards = function () {
        return new Promise((resolve, reject) => {
            Card.collection().fetch().then((result) => {
                logger.info("Got all cards", result.length);
                return resolve(result);
            }).catch((err) => {
                logger.error("Unable to fetch cards");
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to fetch cards"
                });
            })
        })

    };

    Card.incrementBetweenPositions = function (oldIndex, newIndex, groupId, t) {
        logger.info("Incrementing  between positions");
        let query = `Update cards set position = position+1 where position >= ${newIndex} and position < ${oldIndex} and card_group_id = ${groupId}`;
        logger.info(query)
        return new Promise((resolve, reject) => {
            db.knex.raw(query).transacting(t).then(() => {
                logger.info("Incremented  between positions");
                return resolve()
            }).catch((err) => {
                logger.error("Unable to increment between positions");
                logger.error(err.msg);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to increment  between positions"
                });
                return reject(errObj);
            });
        })
    };

    Card.decrementBetweenPositions = function (oldIndex, newIndex, groupId, t) {
        logger.info("Decrementing between positions");
        let query = `Update cards set position = position-1 where position <= ${newIndex} and position > ${oldIndex} and card_group_id = ${groupId}`;
        return new Promise((resolve, reject) => {
            db.knex.raw(query).transacting(t).then(function (result) {
                logger.info("decremented betweeen positions");
                return resolve(result)
            }).catch(function (err) {
                logger.error("Unable to decrement between result");
                logger.error(err.msg);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to decrement between positions"
                });
                return reject(errObj);
            });
        })
    };


    Card.incrementPositions = function (index, groupId, t) {
        logger.info("Incrementing positions");
        let query = `Update cards set position = position+1 where position >= ${index} and card_group_id = ${groupId}`;
        logger.info(query)
        return new Promise((resolve, reject) => {
            db.knex.raw(query).transacting(t).then(() => {
                logger.info("Incremented positions");
                return resolve()
            }).catch((err) => {
                logger.error("Unable to increment positions");
                logger.error(err.msg);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to increment positions"
                });
                return reject(errObj);
            });
        })
    };

    Card.decrementPositions = function (index, groupId, t) {
        logger.info("Decrementing positions");
        let query = `Update cards set position = position-1 where position >= ${index}  and card_group_id = ${groupId}`;
        return new Promise((resolve, reject) => {
            logger.info(query);
            db.knex.raw(query).transacting(t).then(function (result) {
                logger.info("Decremented positions");
                return resolve(result)
            }).catch(function (err) {
                logger.error("Unable to decrement positions");
                logger.error(err.msg);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to decrement positions"
                });
                return reject(errObj);
            });
        })
    };

    Card.updateCard = function (details, t) {
        logger.info("Updating card");
        return new Promise((resolve, reject) => {
            let options = {};
            if (t) {
                options = {
                    transacting: t
                }
            }
            Card.forge(details).save(null, options).then((result) => {
                logger.info("Updated card", result);
                return resolve(result);
            }).catch((err) => {
                logger.error("Unable to update card card");
                logger.error(err.message);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to update card"
                });
                return reject(errObj);
            })
        });
    };

    Card.addNewCard = function (details) {
        logger.info("Adding new card");
        return new Promise((resolve, reject) => {
            Card.forge(details).save().then((result) => {
                logger.info("New card added", result);
                return resolve(result);
            }).catch((err) => {
                logger.error("Unable to add new card");
                logger.error(err.message);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to add new card"
                });
                return reject(errObj);
            })
        })
    };


    Card.reArrangeCard = function (details) {
        logger.info("Model, reArrange card")
        return new Promise((resolve, reject) => {
            logger.info("Before transaction")
            return db.transaction((t) => {
                return incrementOrDecrement(details, t)
                    .then((result) => {
                        let card = {
                            id: details.id,
                            position: details.newIndex
                        };
                        return Card.updateCard(card, t);
                    })
            }).then((res) => {
                logger.info("Transaction completed. Cards rearranged");
                delete details.oldIndex;
                return resolve(details);
            }).catch((err) => {
                logger.error("Transaction failed. Unable to rearrange card");
                logger.error(err.message);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to reArrange card"
                });
                return reject(errObj);
            })
        });
    };

    Card.removeCard = function (id) {
        logger.info("Removing card with id " + id);
        let card = new Card({id: id});
        let groupId = null;
        let position = null;
        return new Promise((resolve, reject) => {
            return db.transaction((t) => {
                return Card.forge({id: id}).fetch({transacting: t}).then(function (result) {
                    let item = result.toJSON();
                    groupId = item.card_group_id;
                    position = item.position;
                    return result.destroy(null, {transacting: t})
                }).then((result) => {
                    logger.info("Successfully removed card with id " + id);
                    logger.info(position, groupId);
                    return Card.decrementPositions(position, groupId, t);
                })
            }).then(() => {
                logger.info("Successfully completed the transaction");
                return resolve(id);
            }).catch((err) => {
                logger.error("Unable to remove card with id " + id);
                return reject(id);
            })
        })
    };

    Card.moveCard = function (details) {
        logger.info("Model, move card");
        return new Promise((resolve, reject) => {
            return db.transaction((t) => {
                return Card.decrementPositions(details.fromIndex, details.fromGroupId, t)
                    .then(() => {
                        return Card.incrementPositions(details.toIndex, details.toGroupId, t)
                    })
                    .then((result) => {
                        let card = {
                            id: details.id,
                            position: details.toIndex,
                            card_group_id: details.toGroupId
                        };
                        return Card.updateCard(card, t);
                    })
            }).then((res) => {
                logger.info("Transaction completed. Cards rearranged");
                delete details.oldIndex;
                delete details.fromGroupId;
                details.cardGroupId = details.toGroupId;
                delete details.toGroupId;
                return resolve(details);
            }).catch((err) => {
                logger.error("Transaction failed. Unable to rearrange card");
                logger.error(err.message);
                let errObj = errorFormatter.createErrorObject({
                    status: 500,
                    message: "Unable to reArrange card"
                });
                return reject(errObj);
            })
        });
    };


    function incrementOrDecrement (details, t) {
        logger.info("Increment or decrement")
        if (details.oldIndex > details.newIndex) {
            return Card.incrementBetweenPositions(details.oldIndex, details.newIndex, details.cardGroupId, t)
        } else {
            return Card.decrementBetweenPositions(details.oldIndex, details.newIndex, details.cardGroupId, t)
        }
    }

    return Card;
}