// this code allows us to use joi for validating inputs

// load the required modules
const Joi = require('joi');

module.exports = function() {
  Joi.objectId = require('joi-objectid')(Joi);
}