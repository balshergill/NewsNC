const { selectTopics } = require("../models/topics-model");

exports.fetchTopics = (req, res, next) => {
  selectTopics()
    .then(topics => {
      res.status(200).send({ topics });
    })
    .catch(next);
};

// exports.fetchOneArticle = (req, res, next) => {
//   const id = req.params.article_id;
//   console.log(id, "in the controller");
//   getOneArticle(id)
//     .then(article => {
//       if (article.length === 0 || typeof article === "undefined") {
//         next({ status: 404 });
//       } else {
//         res.status(200).send({ article });
//       }
//     })
//     .catch(next);
// };
