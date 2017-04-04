let express = require('express');
let expressJwt = require('express-jwt');
let path= require('path');
let jwt = require('jsonwebtoken');
let rp = require('request-promise');
const config = require('./config/server.constant');


let app = module.exports = express.Router();

let jwtCheck = expressJwt({
    secret: config.sessionSecretKey2 })
        .unless({ path: ['/','/favicon.ico','/signup','/login','/authenticate']
  });

app.use('/api', jwtCheck);

app.get('/',function(req,res){
   res.sendFile(path.join(__dirname + '/src/index.html'));
});

app.post('/login',function(req,res){
  if (!(req.body.username === 'admin' && req.body.password === 'admin')) {
    res.status(401).send('Your credentials are not vaild')
    return;
  }
    var token = jwt.sign({username: req.body.username}, config.sessionSecretKey2);
    res.status(200).send({token: token,username: req.body.username});
});

app.post('/authenticate', function (req, res) {
  //TODO validate req.body.username and req.body.password
  //if is invalid, return 401
  if (!(req.body.username === 'admin' && req.body.password === 'admin')) {
    res.status(401).send('Your credentials are not vaild')
    return;
  }
  var profile = {
    username: req.body.username,
    first_name: 'Suresh',
    last_name: 'Akula',
    email: 'akula.suresh@yahoo.com',
    id: 123
  };

  // We are sending the profile inside the token
  var token = jwt.sign(
          {data:profile},
          config.sessionSecretKey2,
          { expiresIn: 60*5 });

  res.json({ token: token, profile: profile });
});

app.get('/api/allCountries',function(req,res){
    var params = req.headers;
    //console.log(req);
   var countries = [{name:"USA", value:"US"},
                             {name:"India", value:"IN"},
                             {name:"UK", value:"UK"}]

    res.status(200).send(countries);

});
app.get('/api/searchFlight', function(req, res){
            var options = {
                uri: "http://partners.api.skyscanner.net/apiservices/browseroutes/v1.0/"+req.query.searchQuery,
                qs: {
                    apiKey: config.api_key // -> uri + '?access_token=xxxxx%20xxxxx'
                },
                json: true // Automatically parses the JSON string in the response
            };
            rp(options)
                .then(function (repos) {
                    res.json(repos);
                })
                .catch(function (reason) {
                    // API call failed...
                    console.error("%s; %s", reason.error, reason.options);
                    console.log("%j", reason.response.statusCode);
                    res.json(null);
                });


});

/*


app.post('/loadUserProfile',function(req,res){
    var loginData = req.body;
    var userId = loginData.username;
    var password = loginData.password;
    var token = "";
    var userProfile={};
    if(userId === 'admin' && password === "admin"){
      userProfile.firstName ="Suresh";
      userProfile.lastName="Akula";
    }

console.log(userProfile);
    res.json({userProfile});

});



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
