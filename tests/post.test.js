const index = require('../routes/index');

const request = require('supertest');
const express = require('express');
const app = express();

// import { initilizeMongoServer } from './mongoConfigTesting';
const initializeMongoServer = require('./mongoConfigTesting')
initializeMongoServer();

app.use(express.urlencoded({ extended: false }));
app.use('/', index);

test('app route works', (done) => {
  request(app).get('/posts/').expect('Content-Type', /json/).expect(200, done);
});
