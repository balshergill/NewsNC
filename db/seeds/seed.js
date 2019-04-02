const {
  topicsData,
  usersData,
  articlesData,
  commentsData
} = require("../data");

const knex = require("knex");

exports.seed = (knex, Promise) => {
  return knex.migrate
    .rollback()
    .then(() => knex.migrate.latest())
    .then(() => {
      return knex("topics")
        .insert(topicsData)
        .into("topics")
        .returning("*");
    })
    .then(() => {
      return knex("users")
        .insert(usersData)
        .into("users")
        .returning("*");
    })
    .then(() => {
      return knex("articles")
        .insert(articlesData)
        .into("articles")
        .returning("*");
    })
    .then(() => {
      return knex("comments")
        .insert(commentsData)
        .into("comments")
        .returning("*");
    });
};
