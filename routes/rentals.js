/*** This code handles the http requests for rentals */

// load the required modules here
const {Rental, validate} = require('../models/rental'); 
const {Movie} = require('../models/movie'); 
const {Customer} = require('../models/customer'); 
const mongoose = require('mongoose');  
const Fawn = require('fawn'); // fawn allows two stage commit system, if error occurs on any steps database is reset back to it's orignal state
const express = require('express');
const router = express.Router();

// to use the fawn module
Fawn.init(mongoose);

// get all the rentals from the server
router.get('/', async (req, res) => {
  const rentals = await Rental.find().sort('-dateOut');
  res.send(rentals);
});

// post or add a rental to the server
// post response: returns the added rental 
router.post('/', async (req, res) => {
  // validate the body of the request
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  // verify that the customer exist
  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid customer.');

  // verify that the movie exist
  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid movie.');

  // if the stock of the movie is 0, a person cannot rent the movie, or it is not in stock    
  if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

  let rental = new Rental({ 
    customer: {
      _id: customer._id,
      name: customer.name, 
      phone: customer.phone
    },
    movie: {
      _id: movie._id,
      title: movie.title,
      dailyRentalRate: movie.dailyRentalRate
    }
  });

  try {
    new Fawn.Task()
      .save('rentals', rental)
      .update('movies', { _id: movie._id }, { 
        $inc: { numberInStock: -1 }
      })
      .run();
  
    res.send(rental);
  }
  catch(ex) {
    res.status(500).send('Something failed.');
  }
});

// gets a rental to the requester if given a rental id
// get response: returns the added rental 
router.get('/:id', async (req, res) => {
  const rental = await Rental.findById(req.params.id);

  if (!rental) return res.status(404).send('The rental with the given ID was not found.');

  res.send(rental);
});

module.exports = router; 