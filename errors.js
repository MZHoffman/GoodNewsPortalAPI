exports.pathError = (req, res) => {
  res.status(404).send({ msg: 'not found' });
};

exports.generalError = (err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else {
    next(err);
  }
};
exports.Error400 = (err, req, res, next) => {
  if (err.code === '22P02' || err.code === '23502' || err.code === '42703') {
    res.status(400).send({ msg: 'Bad request' });
  } else {
    next(err);
  }
};
exports.Error404 = (err, req, res, next) => {
  if (err.code === '23503') {
    res.status(404).send({ msg: 'Not found' });
  } else {
    next(err);
  }
};

exports.Error500 = (err, req, respresonse) => {
  res.status(500).send({ msg: 'Internal server error!' });
};
