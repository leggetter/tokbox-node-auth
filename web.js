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

	var user = request.body.user;

	console.log( 'recieved user %s', JSON.stringify( user ) );

	var sessionId = '';
	opentok.createSession(allowedHost, function(result){

		response.json( { sessionId: result } );

  	console.log( 'sent response' );
	});

});

app.post( '/get_token', function( request, response ) {

  console.log( request.body );
  
  var sessionId = request.body.sessionId;
  var user = request.body.user;

  if( !sessionId ) {
    response.send( 400 );
    reponse.end();
  }
  else {
    var token = opentok.generateToken( {
      session_id: sessionId, 
      role: OpenTok.RoleConstants.PUBLISHER, 
      connection_data: user.id
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