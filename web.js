var express = require('express');
var OpenTok = require('opentok');

var key = process.env.OPENTOK_KEY;
var secret = process.env.OPENTOK_SECRET;
var opentok = new OpenTok.OpenTokSDK(key, secret);
var allowedHost = process.env.ALLOWED_HOST;

var app = express.createServer( express.logger() );
app.use( express.bodyParser() );

var allowCrossDomain = function(req, res, next) {
    res.header( 'Access-Control-Allow-Origin', allowedHost );

    next();
};
app.use( allowCrossDomain );

app.post('/get_session', function(request, response) {

  // Add some form of authentication here

	opentok.createSession(allowedHost, function(result){
		response.json( { sessionId: result } );
	});

});

app.post( '/get_token', function( request, response ) {
  
  var sessionId = request.body.sessionId;

  // In this example a user JSON object is sent
  var user = request.body.user;

  // Add some form of authentication here

  if( !sessionId ) {
    response.send( 400 );
    reponse.end();
  }
  else {
    var token = opentok.generateToken( {
      session_id: sessionId, 
      role: OpenTok.RoleConstants.PUBLISHER, 
      connection_data: user.id // additional data can be set here
    });

    response.json( {
      sessionId: sessionId,
      token: token
    });
  }
});

var port = process.env.PORT || 5000;
app.listen(port, function() {
  console.log("Listening on " + port);
});