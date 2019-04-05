exports.up = function(knex, Promise) {
  return knex.schema.createTable("articles", articles_table => {
    articles_table.increments("article_id").primary();
    articles_table.text("title", 500).notNullable();
    articles_table.text("body").notNullable();
    articles_table.integer("votes").defaultTo(0);
    articles_table.text("topic");
    articles_table
      .foreign("topic")
      .references("slug")
      .inTable("topics");
    articles_table.text("author");
    articles_table
      .foreign("author")
      .references("username")
      .inTable("users");
    articles_table.datetime("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("articles");
};
