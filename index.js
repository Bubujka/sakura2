var express = require('express');

var app = module.exports = express();
app.set('view engine', 'jade');

var config = require('./config.js');

app.set('views', './views');
app.set('config', config);
app.use('/public', express.static('public'));

app.use('/api', require('./api.js'));
//app.use('/routes', require('./routes.js'));
app.listen(3000, function(){
  console.log('Express started');
});


