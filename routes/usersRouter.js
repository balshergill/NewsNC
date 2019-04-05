const usersRouter = require("express").Router();
const { fetchOneUser } = require("../controllers/users-controller");
const { methodNotAllowed } = require("../errors");

usersRouter
  .route("/users/:username")
  .get(fetchOneUser)
  .all(methodNotAllowed);

module.exports = usersRouter;
