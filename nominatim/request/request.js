var request = require('request');
var wait = require('wait-for-stuff');

module.exports = {
	getRoadsData: function(mysql_module, road){
		
		if(road.indexOf("'") != -1){
			road = road.replace(/'/g, ' ');
		}
		
		var url = encodeURI("http://nominatim.openstreetmap.org/search?q=" + road + ",Madeira&format=json&polygon=1&addressdetails=1");

		request({url: url, json: true}, function (err, res, json){
			
			if (err) throw err;
			
			if (json.length != 0) {
				for (var i = 0; i < json.length ; i++){
					if(json[i].hasOwnProperty('address') && json[i].address.hasOwnProperty('road')){
						mysql_module.getRoadsData(json[i]);
						wait.for.time(1);	
					}
				}
			}
		});
	}
}
