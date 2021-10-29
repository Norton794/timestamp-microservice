// server.js
// where your node app starts
const moment = require("moment");
// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/:date?", function (req, res) {
  const { date } = req.params;

  if (!date) {
    let d = new Date();
    res.json({
      unix: new Date(d).getTime(),
      utc: new Date(d).toUTCString()
    });
  } else {
    if (!isNaN(date)) {
      res.json({
        unix: new Date(parseInt(date)).getTime(),
        utc: new Date(parseInt(date)).toUTCString()
      });
    }
    else if (moment.utc(date, 'YYYY-M-D', true).isValid()) {
      res.json({
        unix: new Date(date).getTime(),
        utc: new Date(date).toUTCString()
      });
    }
    else {
      res.json({ error: "Invalid Date" });
    }
  }




});



// listen for requests :)
var listener = app.listen(process.env.PORT || 54432, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
