'use strict';

const chai = require('chai');
const sinon = require('sinon');
const request = require('supertest');
const _ = require('lodash');
const UserModel = require('models/user');
const app = require('app');

const {expect} = chai;

describe('User GET, UPDATE, DELETE, PATCH', () => {
  const sandbox = sinon.sandbox.create();
  const url = 'http://localhost:3000';
  const userId = '5a774bd67c7e132d2f4a91ca';

  before((done) => {
    app.init(done);
  });

  after((done) => {
    app.stop(done);
  });

  afterEach(() => {
    sandbox.restore();
  });

  describe('GET /users', () => {
    it('should find list of users', async () => {
      const user = new UserModel({
        displayName: 'Test',
        email: 'test@gmail.com',
      });

      sandbox.stub(UserModel, 'find').resolves([user]);

      const res = await request(url).get('/users');

      expect(UserModel.find).have.been.calledOnce;
      expect(res.body).to.be.eql([_.pick(user, 'id', 'displayName', 'email')]);
      expect(res.statusCode).to.be.equal(200);
    });
  });

  describe('GET /users/:user', () => {
    it('should respond with error if "user id" is not valid', async () => {
      const res = await request(url).get('/users/123456');

      expect(res.text).to.be.equal('User id is not valid');
      expect(res.statusCode).to.be.equal(404);
    });

    it('should respond with error if user was not found', async () => {
      sandbox.stub(UserModel, 'findById').resolves(null);

      const res = await request(url).get(`/users/${userId}`);

      expect(UserModel.findById).have.been.calledWithExactly(userId);
      expect(res.text).to.be.equal('User was not found');
      expect(res.statusCode).to.be.equal(404);
    });

    it('should return user', async () => {
      const user = new UserModel({
        displayName: 'Test',
        email: 'test@gmail.com',
      });

      sandbox.stub(UserModel, 'findById').resolves(user);

      const res = await request(url).get(`/users/${userId}`);

      expect(UserModel.findById).have.been.calledWithExactly(userId);
      expect(res.body).to.be.eql(_.pick(user, 'id', 'displayName', 'email'));
      expect(res.statusCode).to.be.equal(200);
    });
  });

  describe('PATCH /users/:user', () => {
    it('should respond with error if "user id" is not valid', async () => {
      const res = await request(url).patch('/users/123456');

      expect(res.text).to.be.equal('User id is not valid');
      expect(res.statusCode).to.be.equal(404);
    });

    it('should respond with error if user was not found', async () => {
      sandbox.stub(UserModel, 'findById').resolves(null);

      const res = await request(url).patch(`/users/${userId}`);

      expect(UserModel.findById).have.been.calledWithExactly(userId);
      expect(res.text).to.be.equal('User was not found');
      expect(res.statusCode).to.be.equal(404);
    });

    it('should update user', async () => {
      const user = new UserModel({
        displayName: 'Test',
        email: 'test@gmail.com',
      });

      sandbox.stub(user, 'save').resolves();
      sandbox.stub(UserModel, 'findById').resolves(user);

      const res = await request(url)
        .patch(`/users/${userId}`)
        .send({displayName: 'Serg'});

      expect(UserModel.findById).have.been.calledWithExactly(userId);
      expect(user.save).have.been.calledOnce;
      expect(res.body.displayName).to.be.equal('Serg');
      expect(res.statusCode).to.be.equal(200);
    });
  });

  describe('DELETE /users/:user', () => {
    it('should respond with error if "user id" is not valid', async () => {
      const res = await request(url).delete('/users/123456');

      expect(res.text).to.be.equal('User id is not valid');
      expect(res.statusCode).to.be.equal(404);
    });

    it('should respond with error if user was not found', async () => {
      sandbox.stub(UserModel, 'findById').resolves(null);

      const res = await request(url).delete(`/users/${userId}`);

      expect(UserModel.findById).have.been.calledWithExactly(userId);
      expect(res.text).to.be.equal('User was not found');
      expect(res.statusCode).to.be.equal(404);
    });

    it('should update user', async () => {
      const user = new UserModel({
        displayName: 'Test',
        email: 'test@gmail.com',
      });

      sandbox.stub(UserModel, 'findById').resolves(user);
      sandbox.stub(user, 'remove').resolves();

      const res = await request(url).delete(`/users/${userId}`);

      expect(UserModel.findById).have.been.calledWithExactly(userId);
      expect(user.remove).have.been.calledOnce;
      expect(res.statusCode).to.be.equal(200);
      expect(res.text).to.be.equal('Ok');
    });
  });

  describe('POST /users', () => {
    it('should respond with error if throw Validation Error', async () => {
      sandbox.stub(UserModel, 'create').rejects({
        name: 'ValidationError',
        errors: {
          email: {
            message: 'this user already exists',
          },
        },
      });

      const res = await request(url).post('/users');

      expect(UserModel.create).have.been.calledOnce;
      expect(res.body).to.be.eql({email: 'this user already exists'});
      expect(res.statusCode).to.be.equal(400);
    });

    it('should create new user', async () => {
      const dataStub = {
        displayName: 'Test',
        email: 'test@gmail.com',
      };
      const user = new UserModel(dataStub);

      sandbox.stub(UserModel, 'create').resolves(user);

      const res = await request(url)
        .post('/users')
        .send(dataStub);

      expect(UserModel.create).have.been.calledWithExactly(dataStub);
      expect(res.body).to.be.eql(_.pick(user, 'id', 'displayName', 'email'));
      expect(res.statusCode).to.be.equal(200);
    });
  });
});
