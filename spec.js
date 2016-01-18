var mocha = require('mocha');
var chai = require('chai');
var app = require('./index.js');


describe('Test Logging Function:', function () {

    it('Log Entry', function (done) {
        app.logEntry(function (err, results) {
            if (err) {
                console.error(err);
            } else {
                console.log(results);
            }
            done();
        });
    });

});
