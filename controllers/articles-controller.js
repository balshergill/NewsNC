const {
  selectArticles,
  getOneArticle,
  updateArticle
} = require("../models/articles-model");

exports.fetchArticles = (req, res, next) => {
  selectArticles(req.query)
    .then(articles => {
      res.status(200).send({ articles });
    })
    .catch(next);
};

exports.fetchOneArticle = (req, res, next) => {
  const articleId = req.params.article_id;
  return getOneArticle(articleId)
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
