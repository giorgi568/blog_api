"use strict";
// const mongoose = require('mongoose');
// const { DateTime } = require('luxon');
Object.defineProperty(exports, "__esModule", { value: true });
// const Schema = mongoose.Schema;
const variables_1 = require("./variables");
const CommentSchema = new variables_1.Schema({
    text: { type: String, required: true },
    author: { type: String, required: true },
    post: { type: variables_1.Schema.Types.ObjectId, ref: 'Post', required: true },
    timestamp: { type: Date, required: true, default: new Date() },
});
CommentSchema.virtual('timestamp_formatted').get(function () {
    return variables_1.DateTime.fromJSDate(this.timestamp).toLocaleString(variables_1.DateTime.DATETIME_MED);
});
module.exports = variables_1.mongoose.model('Comment', CommentSchema);
