/*** unit testing for the user model */

// load the required modules
const {User} = require('../../../models/user');
const auth = require('../../../middleware/auth');
const mongoose = require('mongoose');

// test for authenticating middleware
describe('auth middleware', () => {
  it('should populate req.user with the payload of a valid JWT', () => {
    // create a fake user
    const user = { 
      _id: mongoose.Types.ObjectId().toHexString(), 
      isAdmin: true 
    };
    // generate a fake token from the fake user
    const token = new User(user).generateAuthToken();
    // generates a fake header
    const req = {
      header: jest.fn().mockReturnValue(token)
    };
    // set the response to blank, don't need a response
    const res = {};
    // sets a mock middleware
    const next = jest.fn();
    
    // authenticate generated token with the generated header
    auth(req, res, next);
    
    // the authetication should return back to the original created user
    expect(req.user).toMatchObject(user);
  });
});