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
  password : '',
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
  connection.query('SELECT * FROM burgers', function(err, data){
    if(err){
      throw err;
    } else {
      console.log(data);
      res.render('index', {burger:data});
    }
  })
})


                      /*POST route*/
app.post('/create/burger', function(req, res){
  connection.query('INSERT INTO burgers SET ?', req.body, function(err, data){
    if(err){
      throw err;
    } else{
      res.redirect('/create/burgers' + data.insertId);
    }
  });
});






/********************************************/

var PORT = 3000;
app.listen(PORT);
console.log('Hackin\' n Slacking on PORT ' + PORT);