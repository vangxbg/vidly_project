/*** unit testing for the user model */

// load required modules
const {User} = require('../../../models/user');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

// test for user.generateAuthToken
describe('user.generateAuthToken', () => {
  // create a fake user payload, generate a token, decoded that token with new payload.  verify the new payload matches the fake payload
  it('should return a valid JWT', () => {
    const payload = { 
      _id: new mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true 
    };
    const user = new User(payload);
    const token = user.generateAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    expect(decoded).toMatchObject(payload);
  });
});