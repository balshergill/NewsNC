const commentsRouter = require("express").Router();
const {
  voteOnComment,
  deleteOneComment
} = require("../controllers/comments-controller");
const { methodNotAllowed } = require("../errors");

commentsRouter
  .route("/comments/:comment_id")
  .patch(voteOnComment)
  .delete(deleteOneComment)
  .all(methodNotAllowed);

module.exports = commentsRouter;
