const commentsRouter = require("express").Router();
const {
  voteOnComment,
  deleteOneComment
} = require("../controllers/comments-controller");

commentsRouter
  .route("/comments/:comment_id")
  .patch(voteOnComment)
  .delete(deleteOneComment);

module.exports = commentsRouter;
