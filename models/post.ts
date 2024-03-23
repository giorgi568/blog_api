// const mongoose = require('mongoose');
// const { DateTime } = require('luxon');

const User = require('./user');

// const Schema = mongoose.Schema;
import { mongoose, DateTime, Schema } from './variables';

const PostSchema = new Schema({
  title: { type: String, required: true },
  text: { type: String, required: true },
  timestamp: { type: Date, required: true, default: new Date() },
  author: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  published: { type: Boolean, required: true },
});

PostSchema.virtual('timestamp_formatted').get(function (this:any) {
  return DateTime.fromJSDate(this.timestamp).toLocaleString(
    DateTime.DATETIME_MED
  );
});

module.exports = mongoose.model('Post', PostSchema);
