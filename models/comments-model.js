const knexConnection = require("../db/connection");

exports.updateComment = (id, voteIncrement) => {
  return knexConnection("comments")
    .from("comments")
    .where("comment_id", "=", id)
    .leftJoin("comments", "articles.article_id", "comments.article_id")
    .count("comments.article_id AS comment_count")
    .groupBy("comments.article_id")
    .increment("votes", voteIncrement)
    .returning("*");
};

exports.removeComment = id => {
  return knexConnection("comments")
    .where("comments.comment_id", "=", id)
    .del();
};
