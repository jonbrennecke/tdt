var Q = require('q');


function TDT () {
	
};

TDT.prototype = {

	open : function ( tank, block, callback ) {

		return Q.fcall( function () {

		});

	},

	close : function () {

	}

};

module.exports = new TDT();