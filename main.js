const express = require('express');
const app = express();
var request = require('request');
var tcpp = require("tcp-ping");
var fs = require('fs');
var pool_list = fs.readFileSync('./pools.json', 'utf8');

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.route('/')
  .get(function(req, res, next) {
    console.log("Hit");
    var pools = JSON.parse(pool_list);
    for(var pool in pools) {
      console.log(pools[pool]);
      for(var server in pools[pool].servers) {
        tcpp.probe(pools[pool].servers[server].uri, pools[pool].servers[server].port, function(err, available) {
            console.log("Available? " + available);
        });
        tcpp.ping({ address: pools[pool].servers[server].uri, port: pools[pool].servers[server].port }, function(err, data) {
            console.log(data);
        });
      }
    }
    res.json(JSON.parse(pool_list));
  });
app.listen(80, function () {
  console.log('Example app listening on port 3000!')
})

request('https://api.coinmarketcap.com/v1/ticker/bitcoin/', function (error, response, body) {
  bitcoin_data = JSON.parse(body);
  //console.log('body:', body); // Print the HTML for the Google homepage.
});

tcpp.probe('zdash.suprnova.cc', 4048, function(err, available) {
    //console.log("Pool Available: " + available);
});

tcpp.ping({ address: 'zdash.suprnova.cc', port: 4048 }, function(err, data) {
    //console.log(data);
});
