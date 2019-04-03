const topicsRouter = require("express").Router();
const { fetchTopics } = require("../controllers/topics-controller");

topicsRouter.get("/", fetchTopics);

module.exports = topicsRouter;
