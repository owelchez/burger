var express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
var exphbs = require('express-handlebars');
var methodOverride = require('method-override');

var app = express(); // DUH!

/*MySQL connection initialization*/
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'whatever',
  database : 'burgers_db'
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

app.use(methodOverride('_method'));
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(__dirname + '/public'));

connection.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log('connected as id ' + connection.threadId);
});


/********************************************/
                /*MySQL Commands*/
/********************************************/

                      //root get route
app.get('/', function(req, res){
  connection.query('SELECT * FROM burgers WHERE devoured = false', function(err, data){
    if(err){
      throw err;
    } else {
      console.log(data);
      res.render('index', {burger: data});
    }
  })
})
                    /*^^^^^^ This is working! ^^^^^^*/

                  /*Root route for devoured burgers*/
/*app.get('/devoured', function(req, res){
  connection.query('SELECT * FROM burgers WHERE devoured = true', function(err, data){
    if(err){
      throw err;
    } else {
      res.render('index', {devoured: data});
    }
  })
})*/

            /*^^^^^^ Working on this! ^^^^^^*/


                      /*POST route*/
app.post('/create', function(req, res){
  connection.query('INSERT INTO burgers (burger_name, devoured) VALUES (?, false)', [req.body.burger_name, req.body.devoured], function(err, data){
    if(err){
      throw err;
    } else{
      res.redirect('/');
    }
  });
});

                    /*^^^^^^ This is working ^^^^^^*/

app.delete('/delete', function(req, res){
  connection.query('DELETE FROM burgers WHERE id = ?', [req.body.id], function(err, result){
    if(err){
      throw err;
    } else {
      res.redirect('/');
    }
  });
});

                      /*^^^^^^ This is working ^^^^^^*/





/********************************************/

var PORT = 3000;
app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);