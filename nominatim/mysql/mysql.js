var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user: 'root',
	password : '',
	database : 'nominatim',
	multipleStatements: true,
});

module.exports = {
	getRoadsData: function(json){
		
		var query = "";
		
		if(json.address.hasOwnProperty('road') 
			&& json.address.hasOwnProperty('suburb') 
			&& json.address.hasOwnProperty('city')){
		
			query = "SELECT * from roads_data WHERE road = '" + json.address.road 
					+ "' AND suburb = '" + json.address.suburb
					+ "' AND city = '" + json.address.city + "'";
					
		} else if(json.address.hasOwnProperty('road') 
			&& json.address.hasOwnProperty('suburb') 
			&& json.address.hasOwnProperty('town')){
				
			query = "SELECT * from roads_data WHERE road = '" + json.address.road 
					+ "' AND suburb = '" + json.address.suburb
					+ "' AND city = '" + json.address.town + "'";
					
		} else if (json.address.hasOwnProperty('road') 
			&& json.address.hasOwnProperty('town')){
				
			query = "SELECT * from roads_data WHERE road = '" + json.address.road 
					+ "' AND suburb = '' AND city = '" + json.address.town + "'";
			
		} else if (json.address.hasOwnProperty('road') 
			&& json.address.hasOwnProperty('city')){
				
			query = "SELECT * from roads_data WHERE road = '" + json.address.road 
					+ "' AND suburb = '' AND city = '" + json.address.city + "'";
			
		} else if (json.address.hasOwnProperty('road')){
				
			query = "SELECT * from roads_data WHERE road = '" + json.address.road 
					+ "' AND suburb = '' AND city = ''";
			
		}
						
		console.log(query);

		connection.query(query, function(err, results, fields) {
			
			var write = "";
			
			if(results.length <= 0){
				
				if(json.address.hasOwnProperty('road') 
					&& json.address.hasOwnProperty('suburb') 
					&& json.address.hasOwnProperty('city')){
				
					write = "INSERT INTO roads_data (road, suburb, city) VALUES ('" + json.address.road
							+ "','" + json.address.suburb
							+ "','" + json.address.city + "')";
							
				} else if(json.address.hasOwnProperty('road') 
					&& json.address.hasOwnProperty('suburb') 
					&& json.address.hasOwnProperty('town')){
						
					write = "INSERT INTO roads_data (road, suburb, city) VALUES ('" + json.address.road
							+ "','" + json.address.suburb
							+ "','" + json.address.town + "')";
							
				} else if (json.address.hasOwnProperty('road') 
					&& json.address.hasOwnProperty('town')){
						
					write = "INSERT INTO roads_data (road, city) VALUES ('" + json.address.road
							+ "','" + json.address.town + "')";
					
				} else if (json.address.hasOwnProperty('road') 
					&& json.address.hasOwnProperty('city')){
						
					write = "INSERT INTO roads_data (road, city) VALUES ('" + json.address.road
							+ "','" + json.address.city + "')";
					
				} else if (json.address.hasOwnProperty('road')){
						
					write = "INSERT INTO roads_data (road) VALUES ('" + json.address.road + "')";
					
				}
			
				console.log(write);
				
				connection.query(write, function(err, result, fields) {
					
					console.log("Nova Rua: " + result.insertId);
					
					var southLatitude = 0;
					var northLatitude = 0;
					var westLongitude = 0;
					var eastLongitude = 0;
					
					if (json.hasOwnProperty('boundingbox')){
						
						for(var k = 0; k < json.boundingbox.length; k++){
							
							if(k == 0){
								southLatitude = json.boundingbox[k];
							}
							if(k == 1){
								northLatitude = json.boundingbox[k];
							}
							if(k == 2){
								westLongitude = json.boundingbox[k];
							}
							if(k == 3){
								eastLongitude = json.boundingbox[k];
							}
						}
						
						var write = "INSERT INTO bounding_boxes (id_roads_data, southLatitude, northLatitude, westLongitude, eastLongitude) VALUES ('" + result.insertId
								+ "','" + southLatitude
								+ "','" + northLatitude 
								+ "','" + westLongitude 
								+ "','" + eastLongitude + "')";
					
						console.log(write);
		
						connection.query(write, function(err, result, fields) {
							
							if(err) console.log(err);
							console.log("Nova BoundingBox: " + result.insertId);
						});
					}	
				});
			} else {
				
				var southLatitude = 0;
				var northLatitude = 0;
				var westLongitude = 0;
				var eastLongitude = 0;
				
				if (json.hasOwnProperty('boundingbox')){
					
					for(var k = 0; k < json.boundingbox.length; k++){
						
						if(k == 0){
							southLatitude = json.boundingbox[k];
						}
						if(k == 1){
							northLatitude = json.boundingbox[k];
						}
						if(k == 2){
							westLongitude = json.boundingbox[k];
						}
						if(k == 3){
							eastLongitude = json.boundingbox[k];
						}
					}
					
					var write = "INSERT INTO bounding_boxes (id_roads_data, southLatitude, northLatitude, westLongitude, eastLongitude) VALUES ('" + results[0].id
							+ "','" + southLatitude
							+ "','" + northLatitude 
							+ "','" + westLongitude 
							+ "','" + eastLongitude + "')";
				
					console.log(write);
	
					connection.query(write, function(err, result, fields) {
						
						if(err) console.log(err);
						console.log("Nova BoundingBox: " + result.insertId);
					});
				}
			}	
		});
	}		
}

