var dash_button = require('node-dash-button');
var dash_config = require('./config.json');
var pg = require('pg');
var moment = require('moment');
var dash = dash_button(dash_config.dash_list[0].mac_address);


//Comparison function filters out entries within
//certain minutes of each other: value from config file.
//Dash may send multiple ARP messages, this helps prevent
//multiple entries. Returns boolean if in window.
function compareDateTime(date1, date2, dash_window) {
    var momentMin = moment(date2);
    var momentMax = momentMin.clone();
    momentMax.add(dash_window, "minutes");
    var momentEntry = moment(date1).isBetween(momentMin, momentMax);
    return momentEntry;
}

//Primary entry function. Logs event to database.
var logEntry = function (callback) {
    pg.connect(dash_config.database.connection_string, function (err, client, done) {
        if (err) {
            callback(err);
        }
        var timestamp = new Date();
        client.query("SELECT max(logged) FROM adherence_log", function (err, result) {
            if (err) {
                callback(err);
            }
            var maxTimestamp = result.rows[0].max;
            var timeWindow = compareDateTime(timestamp, maxTimestamp, dash_config.dash_window);

            if (timeWindow) {
                //release client.
                done();
                callback(
                    "Error: Log tried within " + dash_config.dash_window + " minutes"
                );
            } else {
                client.query('INSERT INTO adherence_log (medication, logged) VALUES ($1, $2)', [dash_config.dash_list[0].medication, timestamp], function (err, result) {
                    //release client.
                    done();
                    if (err) {
                        callback(err);
                    }
                    callback(null, "Entry logged: " + timestamp);
                });
            }
        });
    });
}

//Listen for initial dash config trigger.
dash.on("detected", function (dash_id) {
    if (dash_id === dash_config.dash_list[0].mac_address) {
        logEntry(function (err, result) {
            if (err) {
                console.error(err);
            } else {
                console.log(result);
            }
        });
    }
});

//Expose log function for testing.
this.logEntry = logEntry;
