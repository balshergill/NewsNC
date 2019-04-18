const {
  selectArticles,
  getOneArticle,
  updateArticle,
  removeArticle,
  getArticleComments,
  addCommentToArticle
} = require("../models/articles-model");
const { handle404 } = require("../errors/index");

exports.fetchArticles = (req, res, next) => {
  if (req.query.sort_by === "votess") {
    next({ status: 400 });
  }
  selectArticles(req.query)
    .then(articles => {
      if (articles.length === 0) {
        next({ status: 404 });
      } else {
        res.status(200).send({ articles });
      }
    })
    .catch(next);
};

exports.fetchOneArticle = (req, res, next) => {
  const id = req.params.article_id;
  getOneArticle(id)
    .then(article => {
      if (article.length === 0) {
        next({ status: 404 });
      } else {
        res.status(200).send(article);
      }
    })
    .catch(next);
};

exports.voteOnArticle = (req, res, next) => {
  const id = req.params.article_id;
  const vote = req.body.inc_votes;
  const ob = req.body;
  const keys = Object.keys(ob);
  return updateArticle(id, vote)
    .then(updatedArticle => {
      if (keys.length !== 1) {
        next({ status: 400 });
      } else if (updatedArticle.length === 0) {
        next({ status: 404 });
      } else {
        res.status(200).send({ updatedArticle });
      }
    })
    .catch(next);
};

exports.deleteOneArticle = (req, res, next) => {
  const id = req.params.article_id;
  return removeArticle(id)
    .then(article => {
      res.status(204).json({ article });
    })
    .catch(next);
};

exports.fetchCommentsByArticle = (req, res, next) => {
  if (req.query.sort_by === "size") {
    next({ status: 400 });
  }
  const id = req.params.article_id;
  return getArticleComments(id, req.query)
    .then(comments => {
      console.log(comments);
      if (comments.length === 0) {
        next({ status: 404 });
      } else {
        res.status(200).send({ comments });
      }
    })
    .catch(err => {
      next(err);
    });
};

exports.postCommentToArticle = (req, res, next) => {
  const { body } = req.body;
  const id = req.params.article_id;
  if (!body || id >= 100) next({ status: 404 });
  else {
    return addCommentToArticle(id, req.body)
      .then(([comment]) => {
        if (!comment) next({ status: 404 });
        else res.status(201).json({ comment });
      })
      .catch(next);
  }
};
