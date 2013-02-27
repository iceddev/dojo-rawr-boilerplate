define([
  // Require in modules here
  'dojo/_base/config',
  'dojo/node!express',
  'dojo/node!http',
  'dojo/node!path',
  'dojo/node!socket.io',
  'wsrpc',
  'server/routes/index'
], function(config, express, http, path, socketio, wsrpc, routes){

  var app = express();
  var server = http.createServer(app);
  var io = socketio.listen(server);

  app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', path.join(config.baseUrl,'views'));
    app.set('view engine', 'jade');
    app.use(express.favicon());
    app.use(express.logger('dev'));
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(config.baseUrl, 'public')));
  });

  app.configure('development', function(){
    app.use(express.errorHandler());
  });

  app.get('/', routes.index);


  //define some rpc functions
  wsrpc.functions.square = function(num){
    this.respond(num * num);
  };
  wsrpc.functions.divide = function(dividend,divisor){
    if(divisor === 0){
      this.error('division by zero!');
    }else{
      this.respond(dividend / divisor);
    }
  };

  //lisent on socket.io for incoming rpc requests
  wsrpc.listen(io);

  server.listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  });

});