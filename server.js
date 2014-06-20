/**
 *
 * serves public directory and compiles jade
 *
 */

var express = require('express'),
	app = express();

app.set('views', __dirname + '/public/jade/' );
app.set('view engine', 'jade');
app.engine( 'jade', require('jade').__express );
app.use( express.static( __dirname + '/public/') );

app.get('/', function ( req, res ) {

	res.render( "index" );

});

app.listen( process.env.npm_config_port || 3000 );