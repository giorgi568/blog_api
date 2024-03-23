"use strict";
// const mongoose = require('mongoose');
// const { DateTime } = require('luxon');
Object.defineProperty(exports, "__esModule", { value: true });
const User = require('./user');
// const Schema = mongoose.Schema;
const variables_1 = require("./variables");
const PostSchema = new variables_1.Schema({
    title: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, required: true, default: new Date() },
    author: { type: variables_1.Schema.Types.ObjectId, ref: 'User', required: true },
    published: { type: Boolean, required: true },
});
PostSchema.virtual('timestamp_formatted').get(function () {
    return variables_1.DateTime.fromJSDate(this.timestamp).toLocaleString(variables_1.DateTime.DATETIME_MED);
});
module.exports = variables_1.mongoose.model('Post', PostSchema);
