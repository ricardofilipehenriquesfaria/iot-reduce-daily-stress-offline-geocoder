var fs = require('fs');
var wait = require('wait-for-stuff');

module.exports = {
	getRoadsData: function(mysql_module, request_module){
		fs.readFile('./madeira.json', 'utf8', function(err, data){
			
			if (err) throw err;
			
			var obj = JSON.parse(data);
			
			for(var i = 0; i < obj.length; i++){
				if(obj[i].hasOwnProperty('nodes') && obj[i].hasOwnProperty('tags') && obj[i].tags.hasOwnProperty('name')){
					if(obj[i].tags.name != "Bus"){
						mysql_module.getRoadsData(request_module, obj[i].tags.name);
					}
					wait.for.time(1);
				}
			}
		})
	}
}

