const articlesRouter = require("express").Router();
const {
  fetchArticles,
  fetchOneArticle,
  voteOnArticle,
  deleteOneArticle,
  fetchCommentsByArticle,
  postCommentToArticle
} = require("../controllers/articles-controller");
const { methodNotAllowed } = require("../errors");

articlesRouter.route("/").get(fetchArticles);

articlesRouter
  .route("/:article_id/comments")
  .get(fetchCommentsByArticle)
  .post(postCommentToArticle)
  .all(methodNotAllowed);

articlesRouter
  .route("/:article_id")
  .get(fetchOneArticle)
  .patch(voteOnArticle)
  .delete(deleteOneArticle)
  .all(methodNotAllowed);

module.exports = articlesRouter;
