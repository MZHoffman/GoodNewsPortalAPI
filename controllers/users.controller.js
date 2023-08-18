const { selectUsers, selectUser } = require('../models/users.models');

exports.getUsers = (req, res, next) => {
  return selectUsers()
    .then((users) => {
      return res.status(200).send({ users });
    })
    .catch((err) => {
      return next(err);
    });
};
exports.getUser = (req, res, next) => {
  const { username } = req.params;
  return selectUser(username)
    .then((user) => {
      return res.status(200).send({ user });
    })
    .catch((err) => {
      return next(err);
    });
};
