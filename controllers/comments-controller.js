const { updateComment, removeComment } = require("../models/comments-model");

exports.voteOnComment = (req, res, next) => {
  const id = req.params.comment_id;
  const vote = req.body.inc_votes;
  return updateComment(id, vote)
    .then(([updatedComment]) => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};

exports.deleteOneComment = (req, res, next) => {
  const id = req.params.comment_id;
  return removeComment(id)
    .then(comment => {
      res.status(204).json({ comment });
    })
    .catch(next);
};
