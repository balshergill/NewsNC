const apiRouter = require("express").Router();
const topicsRouter = require("./topicsRouter");
const articlesRouter = require("..routes/articlesRouter");
const { methodNotAllowed } = require("../errors");

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

apiRouter.use("/topics", topicsRouter);
apiRouter.use("/articles", articlesRouter);

module.exports = apiRouter;
