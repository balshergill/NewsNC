exports.up = function(knex, Promise) {
  console.log("creating a comments table");
  return knex.schema.createTable("comments", comments_table => {
    comments_table.increments("comment_id").primary();
    create_table.string("author");
    comments_table
      .foreign("author")
      .references("username")
      .inTable("users");
    comments_table.integer("article_id");
    comments_table
      .foreign("article_id")
      .references("article_id")
      .inTable("articles");
    comments_table.string("body").notNullable();
    comments_table.integer("votes").defaultTo(0);
    comments_table.datetime("created_at").defaultTo(knex.fn.now());
    comments_table.string("body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
