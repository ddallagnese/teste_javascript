const { connection } = require('./.env')

module.exports = {
    client: 'mysql',
    connection,
    pool: {
        min: 2,
        max: 10
    }
};