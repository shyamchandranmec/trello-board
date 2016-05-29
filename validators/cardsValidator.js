/**
 * Created by shyam on 29/05/16.
 */

"use strict";

module.exports = app => {

    let joi = require("joi");
    let errorFormatter = app.helpers.errorFormatter;
    let schemas = app.validators.schemas.cardsSchema;
    let logger = app.helpers.logger;

    let joiValidationOption = {
        abortEarly: false,
        allowUnknown: true
    };

    function validateAddNewCard(card) {
        logger.info("Validation add new card");

        return new Promise((resolve, reject) => {
            joi.validate(card, schemas.addNewCardSchema, joiValidationOption, err => {
                if (err) {
                    let error = errorFormatter.createErrorObjectFromJoiErrors(err);
                    logger.error(`Validation failed : ${JSON.stringify(error.details)}`);
                    return reject(error);
                } else {
                    logger.info("Add new card validation successful");
                    return resolve(card);
                }
            });
        });
    }

    function validateMoveCard(card) {
        logger.info("Validation move card");
        
        return new Promise((resolve, reject) => {
            joi.validate(card, schemas.moveCardSchema, joiValidationOption, err => {
                if (err) {
                    let error = errorFormatter.createErrorObjectFromJoiErrors(err);
                    logger.error(`Validation failed : ${JSON.stringify(error.details)}`);
                    return reject(error);
                } else {
                    logger.info("Move card validation successful");
                    return resolve(card);
                }
            });
        });
    }

    function validateReArrangeCard(card) {
        logger.info("Validation re arrange card");
        return new Promise((resolve, reject) => {
            joi.validate(card, schemas.reArrangeCardSchema, joiValidationOption, err => {
                if (err) {
                    let error = errorFormatter.createErrorObjectFromJoiErrors(err);
                    logger.error(`Validation failed : ${JSON.stringify(error.details)}`);
                    return reject(error);
                } else {
                    logger.info("Re Arrange card validation successful");
                    return resolve(card);
                }
            });
        });
    }
    
    return  {
        validateAddNewCard,
        validateReArrangeCard,
        validateMoveCard
    }
}