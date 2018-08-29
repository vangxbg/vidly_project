/*** This code handles the http requests for genres */

// load the required modules
const validateObjectId = require('../middleware/validateObjectId');  // object validation of user input
const auth = require('../middleware/auth'); // authenticates the user to see if they have the proper token
const admin = require('../middleware/admin'); // checks if user is an admin
const {Genre, validate} = require('../models/genre'); // grabs our genre model that we created
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router(); // allows us to use the express routed from the startup folder

// get response: to return all the genres back sorted by name
router.get('/', async (req, res) => {
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// post a new genre to the server but must have an authenticated token first
// post response: return successful posted genre back
router.post('/', auth, async (req, res) => {
  const { error } = validate(req.body); // calls validate function from genre module
  if (error) return res.status(400).send(error.details[0].message);

  // creates a genre instance from the class Genre and saves it to the database
  let genre = new Genre({ name: req.body.name });
  genre = await genre.save();
  
  res.send(genre);
});

// put or update the the genre if given a valid genre Object id, authenticated token
// put response: return successful updated genre back
router.put('/:id', [auth, validateObjectId], async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // find the genre given the id and update the name of the genre
  const genre = await Genre.findByIdAndUpdate(req.params.id, { name: req.body.name }, {
    new: true
  });

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');
  
  res.send(genre);
});

// delete a certain genre if given a valid genre Object id, authenticated token and is an administrator
// delete response: returns successful deleted genre back
router.delete('/:id', [auth, admin, validateObjectId], async (req, res) => {
  const genre = await Genre.findByIdAndRemove(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

// gets the genre back if given a valid genre Object id
// get response: returns sucessful genre back
router.get('/:id', validateObjectId, async (req, res) => {
  const genre = await Genre.findById(req.params.id);

  if (!genre) return res.status(404).send('The genre with the given ID was not found.');

  res.send(genre);
});

module.exports = router;