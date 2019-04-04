const knexConnection = require("../db/connection");
exports.getOneUser = username => {
  return knexConnection("users")
    .select("username", "avatar_url", "name")
    .from("users")
    .where("users.username", "=", username);

  // .leftJoin("comments", "users.article_id", "comments.article_id")
  // .count("comments.article_id as comment_count")
  // .groupBy("users.article_id");
};
