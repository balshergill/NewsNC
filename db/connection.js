const dbConfig = require("../knexfile");
const knex = require("knex");

const knexConnection = knex(dbConfig);

module.exports = require("knex")(dbConfig);
module.exports = knexConnection;
