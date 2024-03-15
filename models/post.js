const mongoose = require('mongoose');
const { DateTime } = require('luxon');

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, required: true },
});

PostSchema.virtual('timestamp_formatted').get(function () {
  return DateTime.fromJsDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model('Post', PostSchema);