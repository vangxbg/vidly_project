// this document defines the use of middleware for the routes

// loading the required modules
const express = require('express'); // framework for server development
const genres = require('../routes/genres'); // for genres route
const customers = require('../routes/customers'); // for customers route
const movies = require('../routes/movies'); // for movies route
const rentals = require('../routes/rentals'); // for rentals route
const users = require('../routes/users'); // for users route
const auth = require('../routes/auth'); // for authenticating route
const returns = require('../routes/returns'); // for the returns route
const error = require('../middleware/error'); // place to handle all caught errors

// all of our middleware calls
module.exports = function(app) {
  app.use(express.json()); // middleware so we can grab the body of the json http request
  app.use('/api/genres', genres); // middleware for genre http requests
  app.use('/api/customers', customers); // middleware for customers http requests
  app.use('/api/movies', movies); // middleware for movies http requests
  app.use('/api/rentals', rentals); // middleware for rentals http requests
  app.use('/api/users', users); // middleware for users http requests
  app.use('/api/auth', auth); // middleware for token authenticating
  app.use('/api/returns', returns); // middleware for returns http requests
  app.use(error); // special middleware called after all the existing middleware, our single place to handle caught errors
}