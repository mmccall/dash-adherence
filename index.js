var dash_button = require('node-dash-button');
var dash_config = require('./config.json');
var pg = require('pg');
var dash = dash_button(dash_config.dash_list);

function logEntry(callback) {

    //this initializes a connection pool
    //it will keep idle connections open for a (configurable) 30 seconds
    //and set a limit of 20 (also configurable)
    pg.connect(dash_config.database.connection_string, function (err, client, done) {
        if (err) {
            return console.error('error fetching client from pool', err);
        }
        client.query('INSERT INTO adherence_log (medication) VALUES ($1)', ['Latanaprost'], function (err, result) {
            //call `done()` to release the client back to the pool
            done();
            if (err) {
                return console.error('error running query', err);
            }
            //console.log(result);
            callback();
        });
    });

}


//Listen for initial dash config trigger.
dash.on("detected", function (dash_id) {

    if (dash_id === dash_config.dash_list[0]) {

        logEntry(function (err) {
            if (err) {
                console.log(err);
            } else {
                console.log('entry saved');
            }
        });
    }
});
