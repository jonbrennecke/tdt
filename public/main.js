requirejs.config({

	paths : {
		jquery : "bower_components/jquery/dist/jquery.min",
		jqueryui : "bower_components/jquery-ui/ui/minified/jquery-ui.min",
		Q : "bower_components/q/q",
		underscore : "bower_components/underscore/underscore"

	},

	shim : {
		jquery : {
			exports : '$'
		},

		underscore : {
			deps: [ 'jquery' ],
			exports : '_'
		},

		jqueryui : {
			exports : '$',
			deps : [ 'jquery' ]
		},

		Q : {
			deps : ['underscore'],
			exports : 'Q'
		}
	}
});


require([ "Q" ], function ( Q ) {
	
	require([ "ws" ],function( WSClient ) {
		console.log(WSClient)
	})

});


