const { selectUsers } = require('../models/users.models');

exports.getUsers = (req, res, next) => {
  return selectUsers()
    .then((users) => {
      return res.status(200).send({ users });
    })
    .catch((err) => {
      return next(err);
    });
};
