

let express=require('express');
let app=express();
let bodyParser=require('body-parser');
let helmet = require('helmet');
const config = require('./server/config/server.constant');

/*
var csrf = require('csurf');*/


let session = require('cookie-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use('/',express.static(__dirname + '/src'));

//adds some small XSS protections
app.use(helmet.xssFilter());
// to keep clients from sniffing the MIME type
//app.use(helmet.noSniff())
//to prevent clickjacking
//app.use(helmet.frameguard());
app.use(helmet.hidePoweredBy());

app.use(require('./server/server.routes'));

let expiryDate = new Date(Date.now() + config.timeout)

app.use(session({
  name: 'sessionTravelApp',
  keys: [config.sessionSecretKey1, config.sessionSecretKey2],
  cookie: {
    secure: true,
    httpOnly: true,
    domain: 'localhost:8080',
    path: 'src',
    expires: expiryDate
  }
}));

//app.use(csrf());
app.use(function(req, res, next) {
  //res.locals._csrf = req.csrfToken();
  //res.cookie('XSRF-TOKEN', req.csrfToken());
  //console.log(res.locals._csrf );
  // Update a value in the cookie so that the set-cookie will be sent.
 // Only changes every minute so that it's not sent with every request.
  req.session.nowInMinutes = Math.floor(Date.now() / 60e3)
  next();
});

let server = app.listen(config.server_port, function () {
   var host = server.address().address
   var port = server.address().port
   console.log("Travel app listening at http://%s:%s", host, port)

})
