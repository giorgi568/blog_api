"use strict";
// const mongoose = require('mongoose');
Object.defineProperty(exports, "__esModule", { value: true });
// const Schema = mongoose.Schema;
const variables_1 = require("./variables");
const UserSchema = new variables_1.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    admin: { type: Boolean, required: true },
});
module.exports = variables_1.mongoose.model('User', UserSchema);
