/***index.js is the main code that is run at startup***/

// loading the required modules for my web application
const winston = require('winston'); // for error logging
const express = require('express'); // framework for server development

 // creating the express application
const app = express();

// these are the connections to my modules required for the server
require('./startup/validation')(); // allows us to use JOI for validation
require('./startup/logging')(); // handles the logging of errors and exceptions, this module must come before routes
require('./startup/routes')(app); // handles the http routes
require('./startup/db')(); // connecting to mongoDB
require('./startup/config')(); // checks of private key for token is provided
require('./startup/prod')(app); // for production environment modules

// server listens on the environment port and winston logs onto logfile.log
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;