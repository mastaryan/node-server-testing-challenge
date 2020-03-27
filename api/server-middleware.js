const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const session = require('express-session');
const knexStore = require('connect-session-knex')(session);
const knex = require('../database/connection');

const sessionConfig = {
  name: 'testing',
  secret: 'secret password',
  cookie: {
    maxAge: 1000 * 60 * 10,
    secure: false,
    httpOnly: true
  },
  resave: false,
  saveUninitialized: true,
  store: new knexStore({
    knex,
    tablename: 'sessions',
    createtable: true,
    sidfieldname: 'sid',
    clearInterval: 1000 * 60 * 15
  })
};

const corsConfig = {
  origin: 'http://localhost:3000',
  credentials: true
};

module.exports = server => {
  server.use(helmet());
  server.use(express.json());
  server.use(cors(corsConfig));
  server.use(session(sessionConfig));
};