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
const error = require('../middleware/error'); // place to handle all errors

// all of our middleware calls
module.exports = function(app) {
  app.use(express.json());
  app.use('/api/genres', genres);
  app.use('/api/customers', customers);
  app.use('/api/movies', movies);
  app.use('/api/rentals', rentals);
  app.use('/api/users', users);
  app.use('/api/auth', auth);
  app.use('/api/returns', returns);
  app.use(error); // special middleware called after all the existing middleware, our single place to handle errors
}