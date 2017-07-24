var fs = require('fs');

fs.readFile('./madeira.json', 'utf8', function(err, data){
	
	if (err) throw err;
	
	var obj = JSON.parse(data);
	var id = 0;
	for (var i = 0; i < obj.length; i++){
		if(obj[i].lat == 32.6676611 && obj[i].lon == -16.9779316){
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