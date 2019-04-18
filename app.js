const express = require("express");
const apiRouter = require("./routes/apiRouter");
const bodyParser = require("body-parser");
const {
  methodNotAllowed,
  handle400,
  handle404,
  handle422,
  handle500
} = require("./errors");
const app = express();
require("events").EventEmitter.defaultMaxListeners = 25;

app.use(bodyParser.json());

app.use("/api", apiRouter);

app.use(methodNotAllowed);
app.use(handle400);
app.use(handle404);
app.use(handle422);
app.use(handle500);

app.all("/*", (req, res, next) => {
  next({ status: 404, message: "Path not found!" });
});

module.exports = app;
