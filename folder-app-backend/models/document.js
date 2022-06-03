const mongoose = require('mongoose');
const UserCredentials = require('./userCredentials');

const DocumentSchema = new mongoose.Schema({
  fullPath: {
    type: String,
    required: true
  },
  isDeleted: {
    type: Boolean,
    default: false
  },
  isFolder: {
    type: Boolean,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  parentId: {
    type: String
  },
  userId: {
    type: mongoose.SchemaTypes.ObjectId,
    ref: UserCredentials,
    required: true
  },
  // Other fields could be like tags, description, sharing
},{
  timestamps: true
});

const Document = mongoose.model('Document', DocumentSchema);

module.exports = Document;