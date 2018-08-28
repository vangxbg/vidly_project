// this is the code that does all the try and catch for promises but is
// no longer used because require ('express-async-errors') does this code

module.exports = function (handler) {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    }
    catch(ex) {
      next(ex); // calls next so that the error middleware handles the error
    }
  };  
}