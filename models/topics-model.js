const knexConnection = require("../db/connection");

const selectTopics = () => knexConnection.select("*").from("topics");

module.exports = { selectTopics };
