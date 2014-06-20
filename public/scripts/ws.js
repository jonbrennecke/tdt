( function ( mod ) {
	define( mod )
} ) ( function () {

 	var Q = require('Q');

	function WSClient () {
		if (!(this instanceof WSClient)) {
			return new WSClient();
		}
	};

	WSClient.prototype = {

		/**
		 *
		 * open a websocket connection to 'url'
		 *
		 * @syntax: open([,url])
		 * @param url <string> - RPC server address (uses 'localhost' if none is provided)
		 * @return: a promise that resolves with the opened connection (the WebSocket object)
		 */
		open : function ( url ) {

			var connection = new WebSocket('ws://' + ( url || "localhost" ) + '/websocket'),
				deferOpen = Q.defer();

			connection.onopen = function () {
				deferOpen.resolve( connection );
			}

			connection.onerror = function ( err ) {
				deferOpen.notify( err );
			}

			connection.onclose = function ( event ) {
				deferOpen.reject( event );
			}

			return deferOpen.promise
		},

		/**
		 *
		 * send a string of encoded data to the python host
		 *
		 * @syntax: send( connection, msg )
		 * @param connection <object WebSocket> - open websocket connection
		 * @param msg <JSON> - data to send on the websocket
 		 * @return: a promise that resolves with the server's response
		 *
		 */
		send : function ( connection, msg ) {
			connection.send( JSON.stringify(msg) );

			var deferMessage = Q.defer();

			connection.onmessage = function ( event ) {
				if ( event instanceof MessageEvent )
					deferMessage.resolve( event.data );
				else deferMessage.reject( event.data );
			};

			return deferMessage.promise
		}
	};


	return WSClient;

});