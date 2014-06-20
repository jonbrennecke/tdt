/**
 *
 * exports the TDT class, which is a proxy to the RPC server's methods
 * for calling TDT ActiveX functions on the host server
 *
 *
 */

( function ( mod ) {
	define( mod )
} ) ( function () {

	var Q = require('Q'),
		WSClient = require('ws');


	/**
	 * @param url <string>
	 *
	 */
	function TDT ( ip ) {
		if (!(this instanceof TDT)) {
			return new TDT();
		}

		this.ws = new WSClient();
		this.connectDefer = Q.defer();

		this.ws
			.open( ( ip || "localhost" ) + ":8888" )
			.then( function ( connection ) {

				console.log("connection opened")
				this.connectDefer.resolve( connection );

			}.bind(this));
	};

	TDT.prototype = {

		/**
		 * 
		 * @return <array> - list of tanks that are registered on the connected server
		 *
		 */
		getBlockNames : function ( tank, callback ) {
			Q.when( this.connectDefer.promise, function ( connection ) {

				var promise = this.ws.send( connection, {
					'function' : 'getBlockNames',
					'args' : tank
				})

				if ( ! callback )
					return promise

				promise.done( callback );

			}.bind(this))
		},

		/**
		 * 
		 * @return <array> - list of tanks that are registered on the connected server
		 *
		 */
		getTankNames : function ( callback ) {
			Q.when( this.connectDefer.promise, function ( connection ) {

				var promise = this.ws.send( connection, {
					'function' : 'getTankNames',
				})

				if ( ! callback )
					return promise

				promise.then( callback );

			}.bind(this))
		},

		/**
		 * 
		 * @return <array> - list of store names
		 *
		 */
		getStoreNames : function ( callback ) {
			Q.when( this.connectDefer.promise, function ( connection ) {

				var promise = this.ws.send( connection, {
					'function' : 'getStoreNames',
				})

				if ( ! callback )
					return promise

				promise.then( callback );

			}.bind(this))
		}

	};

	return TDT;

});