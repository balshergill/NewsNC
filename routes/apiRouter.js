const apiRouter = require("express").Router();
const topicsRouter = require("..routes/topicsRouter");
const { methodNotAllowed } = require("../errors");

apiRouter.use("/topics", topicsRouter);

apiRouter
  .route("/")
  .get((req, res) => res.send({ ok: true }))
  .all(methodNotAllowed);

module.exports = apiRouter;
