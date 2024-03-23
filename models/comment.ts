// const mongoose = require('mongoose');
// const { DateTime } = require('luxon');

// const Schema = mongoose.Schema;
import { mongoose, DateTime, Schema } from './variables';

const CommentSchema = new Schema({
  text: { type: String, required: true },
  author: { type: String, required: true },
  post: {type: Schema.Types.ObjectId, ref: 'Post', required: true},
  timestamp: { type: Date, required: true, default: new Date() },
});

CommentSchema.virtual('timestamp_formatted').get(function (this:any) {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model('Comment', CommentSchema);
