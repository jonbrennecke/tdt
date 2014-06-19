( function ( mod ) {
	define( mod )
} ) ( function () {

	function WSClient( host, port ) {

		this.connection = new WebSocket('ws://' + host + ':' + port + '/websocket');

		this.opened = Q.defer();

		this.connection.onopen = this.onOpen;
		this.connection.onmessage = this.response;

	};

	WSClient.prototype = {

		open : function () {
			return this.opened
		},

		// called immediately on open
		onOpen : function () {
			this.opened.resolve( this.connection )
		},

		// send a string of encoded data to the python host
		send : function ( msg ) {
			this.connection.send( msg )
		},

		// handle responses from the server
		response : function ( event ) {
			if ( event instanceof MessageEvent ) {

				var data = $.parseJSON( event.data );

				var node = new Node( data );

			};
		}
	};


	return WSClient

});