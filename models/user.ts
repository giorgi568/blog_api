// const mongoose = require('mongoose');

// const Schema = mongoose.Schema;
import { mongoose, Schema } from './variables';


const UserSchema = new Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  admin: { type: Boolean, required: true },
});

module.exports = mongoose.model('User', UserSchema)
