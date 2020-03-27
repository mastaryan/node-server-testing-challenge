// require('dotenv').config();
const express = require('express');
const middleware = require('./server-middleware.js');
const knightsRouter = require('../knights/router.js');

const server = express();

middleware(server);

server.use('/api/knights', knightsRouter);

server.get('/', (req, res) => {
  res.json({ api: 'online' });
});

module.exports = server;