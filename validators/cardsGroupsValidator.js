/**
 * Created by shyam on 29/05/16.
 */

"use strict";

module.exports = app => {

    let joi = require("joi");
    let errorFormatter = app.helpers.errorFormatter;
    let schemas = app.validators.schemas.cardGroupsSchema;
    let logger = app.helpers.logger;

    let joiValidationOption = {
        abortEarly: false,
        allowUnknown: true
    };


    function validateAddNewGroup (cardGroup){
        logger.info("Validation Add new group");

        return new Promise((resolve, reject) => {
            joi.validate(cardGroup, schemas.addNewCardGroupSchema, joiValidationOption, err => {
                if (err) {
                    let error = errorFormatter.createErrorObjectFromJoiErrors(err);
                    logger.error(`Validation failed : ${JSON.stringify(error.details)}`);
                    return reject(error);
                } else {
                    logger.info("Add new card grouop validation successful");
                    return resolve(cardGroup);
                }
            });
        });
    }

    return  {
        validateAddNewGroup
    }
}