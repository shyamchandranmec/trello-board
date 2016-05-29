/**
 * Created by shyam on 29/05/16.
 */

"use strict";


module.exports =  app => {
    let joi = require("joi");

    let addNewCardGroupSchema = joi.object().keys({
        name: joi.string().required(),
    });
    
    return {
        addNewCardGroupSchema
    }


}
