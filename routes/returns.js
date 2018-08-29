/*** This code handles the http requests for returns */

// load the required modules
const Joi = require('joi');
const validate = require('../middleware/validate');
const {Rental} = require('../models/rental');
const {Movie} = require('../models/movie');
const auth = require('../middleware/auth');
const express = require('express');
const router = express.Router();

// posting a return to the server
// post response is the updated rental object
router.post('/', [auth, validate(validateReturn)], async (req, res) => {
  const rental = await Rental.lookup(req.body.customerId, req.body.movieId); // look up the rental

  if (!rental) return res.status(404).send('Rental not found.');

  if (rental.dateReturned) return res.status(400).send('Return already processed.'); // if there is a date returned, movie has already been returned

  rental.return(); // return the rental
  await rental.save();

  // updates the stock of the movie
  await Movie.update({ _id: rental.movie._id }, {
    $inc: { numberInStock: 1 }
  });

  return res.send(rental);
});

// making sure that a customer id and movie id is provided
function validateReturn(req) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };

  return Joi.validate(req, schema);
}

module.exports = router;
