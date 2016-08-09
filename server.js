var express = require('express');
var bodyParser = require('body-parser');
var method_override = require('method-override');
var connection = require('./config/connection.js')

var app = express(); // DUH!

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

//root get route
app.get('/', function(req,res) {
    connection.query('SELECT * FROM burgers', function(err, data) {
      if (err) throw err;

      //test it
      console.log(data);

      //test it
      //res.send(data);

      //res.render('index', {events : data});
    });
});



//post route -> back to home
app.post('/create', function(req, res) {

    //test it
    //console.log('You sent, ' + req.body.event);

    //test it
    //res.send('You sent, ' + req.body.event)

    connection.query('INSERT INTO events (event) VALUES (?)', [req.body.event], function(err, result) {
      if (err) throw err;

      res.redirect('/');
    });
});



/********************************************/
                /*MySQL Commands*/
/********************************************/



/********************************************/

var PORT = 3000;
app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);