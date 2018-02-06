'use strict';

const _ = require('lodash');

exports.init = (app) => {
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      let body = 'Internal Server Error';
      let status = 500;

      if (err.status) {
        body = err.message;
        status = err.status;
      } else if (err.name === 'ValidationError') {
        body = _.reduce(err.errors, (obj, {message}, key) => {
          return _.set(obj, key, message);
        }, {});
        status = 400;
      } else {
        console.error(err.message, err.stack);
      }
      
      _.assign(ctx, {body, status});
    }
  });
};
