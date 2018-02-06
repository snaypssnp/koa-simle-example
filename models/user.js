'use strict';

const mongoose = require('mongoose');
const beautifyUnique = require('mongoose-beautiful-unique-validation');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  displayName: {
    type: String,
    required: 'displayName was not found',
  },
  email: {
    type: String,
    unique: 'this user already exists',
    required: 'email was not found',
    validate: [
      {
        validator: validator.isEmail,
        msg: 'email is not valid',
      },
    ],
  },
}, {timestamps: true});

userSchema.set('toJSON', {
  transform(doc, ret) {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
    delete ret.createdAt;
    delete ret.updatedAt;
  },
});

userSchema.plugin(beautifyUnique);

module.exports = mongoose.model('User', userSchema);
