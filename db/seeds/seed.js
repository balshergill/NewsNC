const {
  topics,
  users,
  articles,
  comments
} = require("../data/test-data/index");

const {
  timeStampJSConversion,
  createKeyPairs,
  createdByToAuth,
  belongsKeyToArticlesId
} = require("../../utils/utilsFunctions");

const knex = require("knex");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topics)
        .into("topics")
        .returning("*");
    })
    .then(topic => {
      return knex("users")
        .insert(users)
        .into("users")
        .returning("*");
    })
    .then(user => {
      const correctTimeArticlesData = timeStampJSConversion(articles);

      return knex("articles")
        .insert(correctTimeArticlesData)
        .into("articles")
        .returning("*");
    })
    .then(newArtData => {
      const articlesRefs = createKeyPairs(newArtData);
      const correctCommentsAuthor = createdByToAuth(comments);
      const correctCommentsBelongsTo = belongsKeyToArticlesId(
        articlesRefs,
        correctCommentsAuthor
      );
      const correctedComments = timeStampJSConversion(correctCommentsBelongsTo);
      return knex("comments")
        .insert(correctedComments)
        .into("comments")
        .returning("*");
    });
};
