const admin = require('./admin');
const classify = require('./classify');
const article = require('./article');

module.exports = function (app){
  app.use('/api/admin',admin);
  app.use('/api/classify',classify);
  app.use('/api/article',article);
}
