/*** This code verifies if the user has the correct token to access our server */

const jwt = require('jsonwebtoken');
const config = require('config');

// takes the token from the header x-auth-token and decodes it to user.  sets the req.user to the decoded user.
module.exports = function (req, res, next) {
  const token = req.header('x-auth-token'); // the given header we chose
  if (!token) return res.status(401).send('Access denied. No token provided.');

  try {
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
    req.user = decoded; 
    next();
  }
  catch (ex) {
    res.status(400).send('Invalid token.');
  }
}