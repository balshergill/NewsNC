const commentsRouter = require("express").Router();
const { voteOnComment } = require("../controllers/comments-controller");

commentsRouter.route("/comments/:comment_id").patch(voteOnComment);

module.exports = commentsRouter;
