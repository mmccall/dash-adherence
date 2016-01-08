var dash_button = require('node-dash-button');
var dash_config = require('./config.json');
var dash = dash_button(dash_config.dash_list);

function logEntry (callback) {


	console.log('loggit')!

}


//Listen for initial dash config trigger.
dash.on("detected", function (dash_id){

    if (dash_id === dash_config.dash_list[0]){
        
        logEntry(function (err) {
        	if (err) {
        		console.log(err);
        	} else {
        		console.log('entry saved');
        	}
        });

    }

});