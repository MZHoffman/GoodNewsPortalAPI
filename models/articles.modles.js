const db = require('../db/connection');

exports.selectArticle = (article_id) => {
  const queryStr = 'SELECT * FROM articles WHERE article_id = $1;';
  return db.query(queryStr, [article_id]).then((response) => {
    if (response.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return response.rows[0];
  });
};
