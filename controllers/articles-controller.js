const {
  selectArticles,
  getOneArticle,
  updateArticle,
  removeArticle
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
