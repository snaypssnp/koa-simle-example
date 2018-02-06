'use strict';

const Koa = require('koa');
const mongoose = require('libs/mongoose');
const config = require('config');
const isFunction = require('lodash/isFunction');

const port = config.get('port');
const isNotTest = process.env.NODE_ENV !== config.get('envs.test');

module.exports = class App extends Koa {
  init(cb) {
    if (isNotTest) {
      mongoose.connect(config.get('mongodb.uri'), {useMongoClient: true});
    }

    this.app = this.listen(port, (err) => {
      if (!err) {
        console.log(`START APP ON PORT: ${port}`);
      }

      return isFunction(cb) && cb(err);
    });
  }

  stop(cb) {
    if (isNotTest) {
      mongoose.disconnect();
    }

    this.app.close((err) => {
      if (!err) {
        console.log(`STOP APP ON PORT: ${port}`);
      }

      return isFunction(cb) && cb(err);
    });
  }
};
