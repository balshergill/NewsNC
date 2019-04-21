exports.up = function(knex, Promise) {
  return knex.schema.createTable("comments", comments_table => {
    comments_table.increments("comment_id").primary();
    comments_table.text("author").references("users. username");
    comments_table
      .integer("article_id")
      .references("articles.article_id")
      .onDelete("CASCADE");
    comments_table.integer("votes").defaultTo(0);
    comments_table.datetime("created_at").defaultTo(knex.fn.now());
    comments_table.text("body").notNullable();
  });
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable("comments");
};
