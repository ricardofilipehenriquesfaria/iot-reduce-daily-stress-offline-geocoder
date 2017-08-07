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
		
		if(road.indexOf("'") != -1){
			road = road.replace("'", ' ');
		}
		
		var query = "SELECT * from roads_data WHERE road = '" + road + "'";
		console.log(query);
		
		connection.query(query, function(err, results, fields) {
			if(results.length <= 0){
				request_module.getBoundingBoxes(connection, road);
			}
		});
	}		
}

