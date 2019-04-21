const { updateComment, removeComment } = require("../models/comments-model");

exports.voteOnComment = (req, res, next) => {
  const id = req.params.comment_id;
  const ob = req.body;
  const keys = Object.keys(ob);
  return updateComment(id, ob)
    .then(updatedComment => {
      if (keys.length !== 1) {
        next({ status: 400 });
      } else if (updatedComment.length === 0) {
        next({ status: 404 });
      } else {
        res.status(200).send({ updatedComment });
      }
    })
    .catch(next);
};

exports.deleteOneComment = (req, res, next) => {
  const id = req.params.comment_id;
  return removeComment(id)
    .then(comment => {
      if (!comment) next({ status: 404 });
      else res.status(204).json({ comment });
    })
    .catch(next);
};
