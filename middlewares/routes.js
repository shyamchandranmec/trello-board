"use strict";

module.exports = app => {
    app.use("/", app.routes.index);
    app.use("/card-groups", app.routes.cardGroups);
    app.use("/cards", app.routes.cards);
};