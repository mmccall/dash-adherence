var dash_button = require('node-dash-button');
var dash_config = require('./config.json');
var dash = dash_button(dash_config.dash_list);

dash.on("detected", function (dash_id){
    if (dash_id === dash_config.dash_list[0]){
        console.log("dash_config");
    } else if (dash_id === dash_config.dash_list[1]){
        console.log("found the other dash message!");
    }
});