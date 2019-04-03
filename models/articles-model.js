const knexConnection = require("../db/connection");

exports.selectArticles = ({
  sort_by = "created_at",
  order = "desc",
  ...queries
}) => {
  return knexConnection
    .select(
      "articles.article_id",
      "title",
      "articles.body",
      "articles.votes",
      "articles.topic",
      "articles.author",
      "articles.created_at"
    )
    .from("articles")
    .where(queries)
    .leftJoin("comments", "articles.article_id", "=", "comments.article_id")
    .groupBy("articles.article_id")
    .count("comments.article_id AS comment_count")
    .orderBy(sort_by, order)
    .returning("*");
};
