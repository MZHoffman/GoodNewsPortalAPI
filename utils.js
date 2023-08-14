const fs = require('fs/promises');

exports.getAPIDescription = (req, res, next) => {
  return fs
    .readFile('./endpoints.json', 'utf8')
    .then((endpoints) => {
      const endpointsObj = JSON.parse(endpoints);
      return res.status(200).send({ endpoints: endpointsObj });
    })
    .catch((err) => {
      return next(err);
    });
};
