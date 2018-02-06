'use strict';

const App = require('libs/app');

const app = new App();

const middlewares = [
  'middlewares/logger',
  'middlewares/errors',
  'middlewares/bodyParser',
];

for (const path of middlewares) {
  const middleware = require(path);
  middleware.init(app);
}

const routers = [
  'routes/users',
];

for (const path of routers) {
  const router = require(path);
  app.use(router.routes());
}

module.exports = app;
