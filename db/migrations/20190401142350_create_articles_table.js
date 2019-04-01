exports.up = function(knex, Promise) {
  console.log("creating the articles table");
  return knex.schema.createTable("articles", articles_table => {
    articles_table.increments("articles_id").primary();
    articles_table.string("title", 500).notNullable();
    articles_table.string("body").notNullable();
    articles_table.integer("votes").defaultTo(0);
    articles_table.string("topic");
    articles_table
      .foreign("topic")
      .references("slug")
      .inTable("topics");
    articles_table.string("author");
    articles_table
      .foreign("author")
      .references("username")
      .inTable("users");
    articles_table.datetime("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex, Promise) {
  console.log("dropping the articles table");
  return knex.schema.dropTable("articles");
};
