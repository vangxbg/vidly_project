// index is the main file that is run at startup

// loading the required modules for my web application
const winston = require('winston'); // for error logging
const express = require('express'); // framework for server development

 // creating the express application
const app = express();

// these are the connections to my modules required for the server
require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup.prod')(app);

// server listens on the environment port and winston logs onto logfile.log
const port = process.env.PORT || 3000;
const server = app.listen(port, () => winston.info(`Listening on port ${port}...`));

module.exports = server;