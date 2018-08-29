/*** This code handles the http requests for customers */

// loading the required modules
const {Customer, validate} = require('../models/customer'); 
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// get response: to return all the customers back sorted by name
router.get('/', async (req, res) => {
  const customers = await Customer.find().sort('name');
  res.send(customers);
});

// post or create a new customer to the server
// post response: return successful created customer back
router.post('/', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  let customer = new Customer({ 
    name: req.body.name,
    isGold: req.body.isGold,
    phone: req.body.phone
  });
  customer = await customer.save();
  
  res.send(customer);
});

// put or edit the customer given a customer id
// put response: returns the successfully updated customer
router.put('/:id', async (req, res) => {
  const { error } = validate(req.body); 
  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findByIdAndUpdate(req.params.id,
    { 
      name: req.body.name,
      isGold: req.body.isGold,
      phone: req.body.phone
    }, { new: true });

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');
  
  res.send(customer);
});

// delete the customer given a customer id
// delete reponse: returns the successfully deleted customer
router.delete('/:id', async (req, res) => {
  const customer = await Customer.findByIdAndRemove(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

// get the customer given a certian customer id
// get response: returns the customer
router.get('/:id', async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send('The customer with the given ID was not found.');

  res.send(customer);
});

module.exports = router; 