const db = require('../db/connection');
exports.selectTopics = () => {
  const queryStr = 'SELECT * FROM topics;';
  return db.query(queryStr).then(({ rows }) => rows);
};
exports.isTopicExists = (topic) => {
  if (!topic) return;
  const queryStr = 'SELECT * FROM topics WHERE slug = $1;';
  return db.query(queryStr, [topic]).then(({ rowCount }) => {
    return rowCount
      ? true
      : Promise.reject({ status: 400, msg: 'Bad request' });
  });
};
