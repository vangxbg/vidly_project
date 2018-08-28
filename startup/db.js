/*** this code connects our server to mongoDB either on the cloud or on our localhost ***/

// loading the required modules
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

// connects to a database dependong on the NODE_ENV variable. 
module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
    // No need for .catch for promise because Error will be caught and terminated with winston.handleExceptions and logged onto uncaughtExceptions.log
}