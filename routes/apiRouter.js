const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const articlesRouter = require("./articlesRouter");
const commentsRouter = require("./commentsRouter");
const usersRouter = require("./usersRouter");
const displayApiRoutes = require("../controllers/api-controller");
const { methodNotAllowed } = require("../errors");

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);
apiRouter.use("/comments", commentsRouter);
apiRouter.use("/users", usersRouter);

apiRouter
  .route("/")
  .get(displayApiRoutes)
  .all(methodNotAllowed);

module.exports = apiRouter;
