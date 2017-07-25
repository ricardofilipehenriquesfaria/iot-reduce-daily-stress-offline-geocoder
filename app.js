var fs = require('fs');

fs.readFile('./madeira.json', 'utf8', function(err, data){
	
	if (err) throw err;
	
	var lat = 32.6676611;
	var lon = -16.9779316;
	
	var latFloor = Math.floor(lat *100000) / 100000;
	var latCeil = Math.ceil(lat *100000) / 100000;
	var lonFloor = Math.floor(lon *100000) / 100000;
	var lonCeil = Math.ceil(lon *100000) / 100000;
	
	var obj = JSON.parse(data);
	var id = 0;
	for (var i = 0; i < obj.length; i++){
		if(obj[i].lat >= latFloor && obj[i].lat <= latCeil && obj[i].lon >= lonFloor && obj[i].lon <= lonCeil){
			id = obj[i].id;
			console.log(id);
		}	
	}

	if(id != 0){
		for(var i = 0; i < obj.length; i++){
			if(obj[i].hasOwnProperty('nodes') && obj[i].hasOwnProperty('tags') && obj[i].tags.hasOwnProperty('name')){
				
				for(var j = 0; j < obj[i].nodes.length; j++){
					if(obj[i].nodes[j] == id){
						console.log(obj[i].tags.name);
					}
				}
			}		
		}
	}
});