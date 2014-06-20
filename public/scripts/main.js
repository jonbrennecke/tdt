requirejs.config({

	paths : {
		jquery : "bower_components/jquery/dist/jquery.min",
		jqueryui : "bower_components/jquery-ui/ui/minified/jquery-ui.min",
		Q : "bower_components/q/q",
		tdt : "tdt",
		ws : "ws",
	},

	shim : {

		jquery : {
			exports : "$"
		},

		jqueryui : {
			deps : ["jquery"],
			exports : "$"
		},

		ws : {
			deps : ['Q']
		},

		tdt : {
			deps : [ 'Q', 'ws' ]
		}
	}
});


require([ "jqueryui", "tdt"],function ( $, TDT ) {

	$(".draggable").draggable()

	var address = "10.237.221.204",
		tdt = new TDT( address );

	tdt.getTankNames( function ( tanks ) {

		tanks = JSON.parse( tanks );
		tanks.map( function ( tank ) {
			$("<div class='tank' data-name='" + tank + "'>" + tank + "</div>")
			.appendTo(".tanks")
			.hover( function () {
				// $(this).find(".blocks").show()
			});
		});

		$(".tank").each(function () {

			var blocksDiv = $("<div class='blocks'></div>").appendTo(this)

			tdt.getBlockNames( this.dataset.name, function ( blocks ) {
				console.log(blocks)
				blocks = JSON.parse( blocks );
				blocks.map( function ( block ) {
					$(blocksDiv).append($("<div class='block' data-name='" + block + "'>" + block + "</div>"))
				});
			});
		});


		// tdt.getStoreNames( { tank : tank, block : block } function ( storeNames ) {
		// 	console.log( storeNames )
		// });

	});


})



