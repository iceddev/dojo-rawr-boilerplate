define([
  'dojo/_base/config',
  'dojo/node!http',
  'dojo/node!ecstatic',
  'dojo/node!engine.io',
  'rawr/server'
], function(config, http, ecstatic, engine, Rawr){

  'use strict';

  // Create our HTTP server to serve static files
  var server = http.createServer(
    ecstatic({
      root: config.baseUrl + '/public',
      autoIndex: true
    })
  ).listen(3000);

  // Attach our websocket intercept
  var io = engine.attach(server);

  // Define and expose some RPC functions
  var rpc = new Rawr(io, {
    square: function(num){
      return num * num;
    },
    divide: function(dividend,divisor){
      if(divisor === 0){
        return {
          error: 'division by zero!'
        };
      }else{
        return dividend / divisor;
      }
    }
  });

});