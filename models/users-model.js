const knexConnection = require("../db/connection");
exports.getOneUser = username => {
  return knexConnection("users")
    .select("username", "avatar_url", "name")
    .from("users")
    .where("users.username", "=", username);
};
