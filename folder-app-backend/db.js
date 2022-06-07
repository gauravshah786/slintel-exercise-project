require('dotenv').config();
const mongoose = require('mongoose');

const url = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}
@${process.env.DB_CLUSTER_NAME}.mongodb.net/${process.env.DB_NAME}
?retryWrites=true&w=majority`;

const connectionParams = {};

let _db;

exports.initDB = callback => {
  if (_db) {
    console.log('DB is already initialized!');
    return callback(null, _db);
  }
  mongoose.connect(url, connectionParams)
    .then(client => {
      _db = client;
      // mongoose.set('debug', true);
      callback(null, _db);
    })
    .catch(err => {
      callback(err);
    });
};

exports.getDB = () => {
  if (!_db) {
    throw Error('DB not initialized');
  }
  return _db;
};
