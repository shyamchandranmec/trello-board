/**
 * Created by shyam on 29/05/16.
 */

"use strict";

module.exports =  app => {
    let joi = require("joi");

    let addNewCardSchema = joi.object().keys({
        title: joi.string().required(),
        card_group_id: joi.number().integer().required(),
        position: joi.number().integer().required()
    });

    let moveCardSchema = joi.object().keys({
        id: joi.number().required(),
        fromIndex: joi.number().integer().required(),
        toIndex: joi.number().integer().required(),
        fromGroupId: joi.number().integer().required(),
        toGroupId: joi.number().integer().required()
    });

    let reArrangeCardSchema = joi.object().keys({
        id: joi.number().required(),
        oldIndex: joi.number().integer().required(),
        newIndex: joi.number().integer().required(),
        cardGroupId: joi.number().integer().required()
    });

    return  {
        addNewCardSchema,
        moveCardSchema,
        reArrangeCardSchema
    }
}