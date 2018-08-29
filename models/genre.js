/*** This code defines the schema for a genre */

// load required modules
const Joi = require('joi');
const mongoose = require('mongoose');

// creating an instance of a mongoose schema
const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 5,
    maxlength: 50
  }
});

// creating a class using the mongoose schema instantiated above
const Genre = mongoose.model('Genre', genreSchema);

// this validate funciton is used to validate the input for a genre
function validateGenre(genre) {
  const schema = {
    name: Joi.string().min(5).max(50).required()
  };

  return Joi.validate(genre, schema);
}

exports.genreSchema = genreSchema;
exports.Genre = Genre; 
exports.validate = validateGenre;