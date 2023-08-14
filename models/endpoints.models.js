const fs = require('fs/promises');

exports.readEndpointsFile = () => {
  return fs.readFile('./endpoints.json', 'utf8').then((endpoints) => {
    return JSON.parse(endpoints);
  });
};
