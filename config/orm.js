var connection = require('./config/connection.js');

function selectAll(){
	connection.query('SELECT * FROM burgers', function(err, data){
		if(err){
			throw err;
		} else{
			console.log(data);
		}
	})
};




