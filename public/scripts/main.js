requirejs.config({

	paths : {
		jquery : "bower_components/jquery/dist/jquery.min",
		jqueryui : "bower_components/jquery-ui/ui/minified/jquery-ui.min",
		Q : "bower_components/q/q",
		d3 : "bower_components/d3/d3.min",
		tdt : "tdt",
		ws : "ws",
		figurejs : "figurejs/figure",
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


require([ "tdt"],function ( TDT ) {

	require([ "figurejs" ], function ( Figure ) {

		var figure = Figure("#graph");
		
		var data = (function(a,b){ while(b--) { a[b] = Math.random(); } return a})([],500);

		figure.data.y = data;
		figure.data.x = (function(a,b){ while(b--) { a[b] = b; } return a})([],data.length);

		figure.attr({
			margins : { top: 50, right: 50, bottom: 50, left: 50 },
		});

		figure.area();

		// this.margins = { top: 50, right: 50, bottom: 50, left: 50 };
		// this.width = this.domElement.width() - (this.margins.left + this.margins.right);
		// this.height = this.domElement.height() - (this.margins.top + this.margins.bottom);



	})

	// $(".draggable").draggable()

	// var address = "10.237.221.204",
	// 	tdt = new TDT( address );

	// tdt.getTankNames( function ( tanks ) {

	// 	tanks = JSON.parse( tanks );
	// 	tanks.map( function ( tank ) {
	// 		$("<div class='tank' data-name='" + tank + "'>" + tank + "</div>")
	// 		.appendTo(".tanks")
	// 		.hover( function () {
	// 			// $(this).find(".blocks").show()
	// 		});
	// 	});

	// 	$(".tank").each(function () {

	// 		var blocksDiv = $("<div class='blocks'></div>").appendTo(this)

	// 		tdt.getBlockNames( this.dataset.name, function ( blocks ) {
	// 			console.log(blocks)
	// 			blocks = JSON.parse( blocks );
	// 			blocks.map( function ( block ) {
	// 				$(blocksDiv).append($("<div class='block' data-name='" + block + "'>" + block + "</div>"))
	// 			});
	// 		});
	// 	});


		// tdt.getStoreNames( { tank : tank, block : block } function ( storeNames ) {
		// 	console.log( storeNames )
		// });

	// });


})



