const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    creator: { type: String, require: false },
    content: { type: String, required: true },
    dateModified: { type: Date, required: false },
    imageUrl: { type: String, required: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Post', postSchema);
