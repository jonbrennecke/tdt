requirejs.config({
	paths : {
		jquery : "bower_components/jquery/dist/jquery.min",
		"jquery-ui" : "bower_components/jquery-ui/ui/minified/jquery-ui.min",
		"Q" : "bower_components/q/q"

	},

	shim : {
		jquery : {
			exports : "$"
		},

		"jquery-ui" : {
			exports : '$',
			deps : [ 'jquery' ]
		},

		"Q" : {
			exports : "Q"
		}
	}
});


require([ "jquery", "jquery-ui", "Q" ], function ( $ ) {
	console.log($)
});