exports.methodNotAllowed = (req, res) => {
  res.status(405).send({ msg: "Method Not Allowed" });
};

exports.handle400 = (err, req, res, next) => {
  const badRequestCodes = ["22P02"];
  if (badRequestCodes.includes(err.code) || err.status === 400) {
    res.status(400).send({ msg: "Bad Request" });
  } else next(err);
};

exports.handle404 = (err, req, res, next) => {
  if (err.status === 404) res.status(404).send({ msg: "Resource Not Found" });
  else {
    next(err);
  }
};

exports.handle422 = (err, req, res, next) => {
  if (err.status === 422) res.status(422).send({ msg: "Unprocessable Entity" });
  else {
    next(err);
  }
};

exports.handle500 = (err, req, res, next) => {
  res.status(500).send({ msg: "Internal Server Errorrr" });
};
