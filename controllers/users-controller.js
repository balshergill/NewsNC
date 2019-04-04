const { getOneUser } = require("../models/users-model");

exports.fetchOneUser = (req, res, next) => {
  const username = req.params.username;
  return getOneUser(username)
    .then(([user]) => {
      res.status(200).send({ user });
    })
    .catch(next);
};
