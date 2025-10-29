// index.js
// where your node app starts

// init project
require('dotenv').config();
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 })); // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// endpoint principal del microservicio
app.get('/api/whoami', (req, res) => {
  // IP: preferir X-Forwarded-For (si está detrás de proxy) o req.ip
  const forwarded = req.headers['x-forwarded-for'];
  const ipaddress = forwarded ? forwarded.split(',')[0].trim() : (req.ip || req.connection.remoteAddress);

  // idioma: tomar del header accept-language (primer valor)
  const acceptLanguage = req.headers['accept-language'] || '';
  const language = acceptLanguage.split(',')[0];

  // software: user-agent completo o simplificado (texto dentro de paréntesis)
  const userAgent = req.headers['user-agent'] || '';
  // intentamos extraer la parte "entre paréntesis" (si existe) para que concuerde con el ejemplo FCC
  const match = userAgent.match(/\(([^)]+)\)/);
  const software = match ? match[1] : userAgent;

  res.json({
    "ipaddress": ipaddress,
    "language": language,
    "software": software
  });
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
