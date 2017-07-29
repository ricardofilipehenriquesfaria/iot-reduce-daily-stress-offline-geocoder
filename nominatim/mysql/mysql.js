var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user: 'root',
	password : '',
	database : 'nominatim',
	multipleStatements: true,
});

module.exports = {
	getRoadsData: function(request_module, road){
		connection.query("SELECT * from roads_data WHERE road = '" + road + "'", function(err, results, fields) {
			if(results.length <= 0){
				request_module.getBoundingBoxes(connection, road);
			}
		});
	}		
}

