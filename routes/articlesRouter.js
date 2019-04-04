const articlesRouter = require("express").Router();
const {
  fetchArticles,
  fetchOneArticle,
  voteOnArticle,
  deleteOneArticle
} = require("../controllers/articles-controller");

articlesRouter.route("/").get(fetchArticles);

articlesRouter
  .route("/articles/:article_id")
  .get(fetchOneArticle)
  .patch(voteOnArticle)
  .delete(deleteOneArticle);

module.exports = articlesRouter;
