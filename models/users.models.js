const db = require('../db/connection');

exports.selectUsers = () => {
  const queryStr = 'SELECT * FROM users';
  return db.query(queryStr).then(({ rows }) => {
    return rows;
  });
};

exports.selectUser = (username) => {
  const queryStr = 'SELECT * FROM users WHERE username = $1';
  return db.query(queryStr, [username]).then((response) => {
    if (response.rowCount === 0) {
      return Promise.reject({ status: 404, msg: 'Not found' });
    }
    return response.rows[0];
  });
};
