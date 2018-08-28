// this document uses winston module to handle the errors

// loading the required modules
const winston = require('winston'); // for error logging in general
// temporary disable
// require('winston-mongodb'); // for logging into mongo db
require('express-async-errors'); // special module, puts express CRUD operations in a try, catch block then calls next to pass over to error middleware created by me

module.exports = function() {
  // handles exceptions from outside of express that has not been handled
  winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true }), //this is a different logger on console to help new users see these errors and exceptions
    new winston.transports.File({ filename: 'uncaughtExceptions.log' // this is different from the default logger so call new
  })); 
  // handles rejection from promises that were that has not been handled
  process.on('unhandledRejection', (ex) => {
    throw ex; // turns it into an unhandled exception so winston.handleExceptions can handle it
  });
  
  // errors from winston gets logged here
  winston.add(winston.transports.File, { filename: 'logfile.log' }); // logged into logfile.log, the default logger
  //temporary disable
  // winston.add(winston.transports.MongoDB, { // loged into mongodb in vidly
  //   db: 'mongodb://localhost/vidly',
  //   level: 'info' // meaning info, warnings and errors will be logged
  // });  
}