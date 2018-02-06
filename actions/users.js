'use strict';

const {Types: {ObjectId}} = require('mongoose');
const _ = require('lodash');
const User = require('models/user');

exports.findUser = async (id, ctx, next) => {
  if (!ObjectId.isValid(id)) {
    return ctx.throw(404, 'User id is not valid');
  }

  const user = await User.findById(id);

  if (!user) {
    return ctx.throw(404, 'User was not found');
  }

  ctx.user = user;

  return next();
};

exports.getListOfUsers = async (ctx) => {
  ctx.body = await User.find();
};

exports.createUser = async (ctx) => {
  const {displayName, email} = ctx.request.body;

  const user = await User.create({displayName, email});

  ctx.body = user;
};

exports.getUser = (ctx) => {
  ctx.body = ctx.user;
};

exports.removeUser = async (ctx) => {
  await ctx.user.remove();

  ctx.body = 'Ok';
};

exports.updateUser = async (ctx) => {
  const {user} = ctx;
  const {displayName, email} = ctx.request.body;

  _.merge(user, {displayName, email});

  await user.save();

  ctx.body = user;
};
