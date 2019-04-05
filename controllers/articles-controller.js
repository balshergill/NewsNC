const {
  selectArticles,
  getOneArticle,
  updateArticle,
  removeArticle,
  getArticleComments,
  addCommentToArticle
} = require("../models/articles-model");

exports.fetchArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.fetchOneArticle = (req, res, next) => {
  const id = req.params.article_id;
  return getOneArticle(id)
    .then(([article]) => {
      res.status(200).send({ article });
    })
    .catch(next);
};

exports.voteOnArticle = (req, res, next) => {
  const id = req.params.article_id;
  const vote = req.body.inc_votes;
  return updateArticle(id, vote)
    .then(([updatedArticle]) => {
      res.status(200).send({ updatedArticle });
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
  const id = req.params.article_id;
  getOneArticle(id).then(() => {
    return getArticleComments(id, req.query)
      .then(comments => {
        res.status(200).send({ comments });
      })
      .catch(err => {
        next(err);
      });
  });
};

exports.postCommentToArticle = (req, res, next) => {
  const id = req.params.article_id;
  getOneArticle(id).then(() => {
    return addCommentToArticle(id, req.body)
      .then(comment => {
        res.status(201).send({ comment });
      })
      .catch(next);
  });
};
