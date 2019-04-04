const { updateComment } = require("../models/comments-model");

exports.voteOnComment = (req, res, next) => {
  const id = req.params.comment_id;
  const vote = req.body.inc_votes;
  return updateComment(id, vote)
    .then(([updatedComment]) => {
      res.status(200).send({ updatedComment });
    })
    .catch(next);
};
