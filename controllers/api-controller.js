const apiOptions = {
  topics: {
    get: "/api/topics - Returns all the topics",
    post: "/api/topics - posts a new topic"
  },
  articles: {
    get: {
      allArticles:
        '/api/articles - Returns all the articles. Accepts queries of "author", filtering the articles by a creator, "topic", filtering the articles by a topic, "sort_by (column)", which defaults to date and "order (asc or desc)", which defaults to desc',
      specificArticle:
        "/api/articles/:article_id - Returns a specific article based on the input id"
    },
    post: "/api/articles - Adds a new article",
    patch:
      "/api/articles/:article_id - allows you to change the votes of an article, and returns the updated article. Request body must be an object in the form of {inc_votes: (number of votes, up or down)}",
    delete: "/api/articles/:article_id - deletes a specific article"
  },
  comments: {
    get:
      '/api/articles/:article_id/comments - Returns all comments based on the article_id. Accepts queries of "sort_by (column)", which defaults to date and "order (asc or desc)", which defaults to desc',
    post:
      "/api/articles/:article_id/comments - Adds a new comment to a specific article",
    patch:
      "/api/comments/:comment_id - Allows the number of votes on the comment to be changed and returns the updated comment. Request body must be an object in the form of {inc_votes: (number of votes, up or down)}",
    delete: "/api/comments/:comment_id - Deletes a specific comment"
  },
  users: {
    get: {
      allUsers: "/api/users - returns all users",
      specificUser: "/api/users/:username - Returns a specific user"
    },
    post: "/api/users - posts a new user"
  }
};

const displayApiRoutes = (req, res, next) => {
  res.status(200).send(JSON.stringify(apiOptions));
};

module.exports = displayApiRoutes;
