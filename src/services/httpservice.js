var Fetch = require('whatwg-fetch');
var baseUrl = 'http://api.openweathermap.org/data/2.5/forecast?'; // live IP address of service.

var service = {
    // REST design pattern (?)
    get: function(url){
        console.log("contacting openweathermap with URL: " + baseUrl + url);
        return fetch(baseUrl + url)
        // fetch immediately returns a promise - function called at a later point in time (async).
        // "response" holds headers, status code, json, etc...
        .then(function(response) {
            return response.json(); //
        });
    }
};

module.exports = service;
