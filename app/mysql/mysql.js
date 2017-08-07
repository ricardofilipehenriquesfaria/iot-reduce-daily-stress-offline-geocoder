var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user: 'root',
	password : '',
	database : 'nominatim',
	multipleStatements: true,
});

module.exports = {
	getRoadsData: function(latitude, longitude){
		var query = "SELECT * from bounding_boxes WHERE southLatitude <= '" + latitude
						+ "' AND northLatitude >= '" + latitude 
						+ "' AND westLongitude <= '" + longitude
						+ "' AND eastLongitude >= '" + longitude + "'";
		
		console.log(query);			
						
		connection.query(query, function(err, results, fields) {
			if(results.length > 0){
				connection.query("SELECT * from roads_data WHERE id = '" + results[0].id_roads_data + "'", function(err, results, fields) {
					if(results.length > 0){
						console.log("Road: " + results[0].road);
						console.log("Suburb: " + results[0].suburb);
						console.log("City: " + results[0].city);
					}
				});
			} else {
				console.log("Nenhuma estrada correspondente!");
			}
		});
	}
}