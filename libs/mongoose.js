'use strict';

const mongoose = require('mongoose');

mongoose.Promise = Promise;

mongoose.set('debug', true);

module.exports = mongoose;
