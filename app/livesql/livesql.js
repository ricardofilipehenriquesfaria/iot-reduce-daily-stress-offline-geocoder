var LiveSQL = require('live-sql');

var manager = new LiveSQL({
	"host": "localhost",
	"user": "zongji",
	"password": "zongji",
	"database": "gps_data"
});

manager.subscribe("gps_data");	
	
module.exports = {
	getChanges: function(mysql_module){
		manager.on("*.*.*", function(event){
			
			if(event.type() == 'tablemap') return;
				
			if(event.type() == 'write') {
				
				for (var i = event.effected() - 1; i >= 0; i--) {

					var eventRowsArray = event.rows();
					var eventRows = eventRowsArray[0];
					
					console.log(eventRows);
					mysql_module.getRoadsData(eventRows.latitude, eventRows.longitude);
				 };
			}
		});

		manager.start();
	}
}