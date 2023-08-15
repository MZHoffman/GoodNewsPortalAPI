const { readEndpointsFile } = require('../models/endpoints.models');

exports.getAPIDescription = (req, res, next) => {
  return readEndpointsFile()
    .then((endpoints) => {
      return res.status(200).send({ endpoints });
    })
    .catch((err) => {
      return next(err);
    });
};
