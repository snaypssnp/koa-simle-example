'use strict';

const Router = require('koa-router');
const {
  findUser, getListOfUsers, createUser, getUser, removeUser, updateUser,
} = require('actions/users');

const router = new Router({
  prefix: '/users',
});

router
  .param('user', findUser)
  .get('/', getListOfUsers)
  .post('/', createUser)
  .get('/:user', getUser)
  .delete('/:user', removeUser)
  .patch('/:user', updateUser);

module.exports = router;
