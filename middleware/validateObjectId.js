/*** This code verifies that the user input is of the type objectId otherwise it will return a status 404 */

const mongoose = require('mongoose');

module.exports = function(req, res, next) {
  if (!mongoose.Types.ObjectId.isValid(req.params.id))
    return res.status(404).send('Invalid ID.');
  
  next();
}