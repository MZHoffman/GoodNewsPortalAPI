const format = require('pg-format');
const db = require('../db/connection');

exports.selectCommentsForArticle = (article_id) => {
  const queryStr =
    'SELECT * FROM comments WHERE article_id = $1 ORDER BY created_at DESC;';
  return db.query(queryStr, [article_id]).then((response) => {
    return response.rows;
  });
};

exports.insertCommentForArticle = (article_id, username, body) => {
  const queryStr = format(
    `INSERT INTO comments
    (body, article_id, author) VALUES %L RETURNING *;`,
    [[body, article_id, username]]
  );
  return db.query(queryStr).then((response) => {
    return response.rows[0];
  });
};

exports.deleteComment = (comment_id) => {
  const queryStr = format(
    `DELETE FROM comments WHERE comment_id = %L RETURNING *;`,
    comment_id
  );
  return db.query(queryStr).then((response) => {
    return response.rowCount;
  });
};

exports.updateComment = (comment_id, inc_votes) => {
  const queryStr = format(
    `UPDATE comments 
  SET votes = votes + %L WHERE comment_id = %L RETURNING *;`,
    inc_votes,
    comment_id
  );
  return db.query(queryStr).then((response) => {
    if (response.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return response.rows[0];
  });
};
