const db = require('../db/connection');

exports.selectArticles = () => {
  const queryStr = 'SELECT * FROM articles';
  return db.query(queryStr).then((response) => {
    if (response.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return response.rows[0];
  });
};
