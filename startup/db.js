// connects to the mongo db

// loading the required modules
const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');

// connects to the database.  Error will be caught and terminated with winston.handleExceptions and logged onto uncaughtExceptions.log
module.exports = function() {
  const db = config.get('db');
  mongoose.connect(db)
    .then(() => winston.info(`Connected to ${db}...`));
}