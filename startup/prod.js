/*** this code is for the support of deploying the app to the web */

const helmet = require('helmet');
const compression = require('compression');

module.exports = function(app){
    app.use(helmet());
    app.use(compression());
}