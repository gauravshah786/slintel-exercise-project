const mongoose = require('mongoose');

const UserCredentialsSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  }
});

const UserCredentials = mongoose.model('UserCredentials', UserCredentialsSchema);

module.exports = UserCredentials;