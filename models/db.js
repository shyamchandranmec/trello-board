var knex = require('knex'),
    Bookshelf = require('bookshelf');

module.exports =(app) => {
    var DB = null;
    var logger = app.helpers.logger;
    //  initialize bookshelf orm with knex query builder connection settings
    try {
        DB = Bookshelf.initialize(
            knex({
                client: 'mysql',
                connection: {
                    host     : '192.168.99.100',
                    user     : 'root',
                    password : 'root',
                    database : 'trello',
                    charset  : 'utf8'
                },
                pool : { min:5 , max:10},

                // debug: true

            })
        );

        //register plugins for DB models
        DB.plugin('visibility');
    } catch(err) {
        logger.error('please check database configuration, error initializing database! %s', err.message);
        throw new Error("database startup issue");
    }
    return DB;
}