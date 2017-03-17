var express = require('express');
var bodyParser = require('body-parser');
var rp = require('request-promise');

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static('public'));

app.post('/login',function(req,res){
    var loginData = req.body;
    var userId = loginData.userId;
    var password = loginData.password;
    var token = "";
    if(userId === 'Siva' && password === "Allu"){
        token = "lalala"
    }
    
    res.json({securityToken:token});

});

/*

var request = require("request");

var options = { method: 'POST',
  url: 'http://partners.api.skyscanner.net/apiservices/pricing/v1.0',
  headers: 
   {
    'content-type': 'application/x-www-form-urlencoded',
    'content-type': 'application/json',
     accept: 'application/json' },
      formData: 
       { country: 'UK',
         currency: 'GBP',
         locale: 'en-GB',
         locationSchema: 'iata',
         
         grouppricing: 'on',
         originplace: 'SFO',
         destinationplace: 'HYD',
         outbounddate: '2017-03-23',
         inbounddate: '2017-03-30',
         adults: '1',
         children: '0',
         infants: '0',
         cabinclass: 'Economy' 
         } 
    };

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
*/

app.get('/searchFlight', function(req, res){
            var options = {
                uri: "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/"+req.query.searchQuery,
                qs: {
                    apiKey: '<need-key-skyrunner>' // -> uri + '?access_token=xxxxx%20xxxxx'
                },
                json: true // Automatically parses the JSON string in the response
            };
            rp(options)
                .then(function (repos) {
                    console.log('response:', repos);
                    res.json(repos);
                })
                .catch(function (reason) {
                    // API call failed...
                    console.error("%s; %s", reason.error, reason.options);
                    console.log("%j", reason.response.statusCode);
                    res.json(null);
                });


});

app.get('/allCountries',function(req,res){
    var params = req.headers;
    console.log(params['auth-token']);
   var countries = [{name:"USA", value:"US"},
                             {name:"India", value:"IN"},
                             {name:"UK", value:"UK"}]
    
    res.json(countries);

});

app.get('*', function(req, res) {
        res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
    });


var server = app.listen(8080, function () {
   var host = server.address().address
   var port = server.address().port

   console.log("Example app listening at http://%s:%s", host, port)

})