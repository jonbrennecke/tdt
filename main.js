var tank = 'C:\\TDT\\OpenEx\\MyProjects\\OptoTaggingTest_6-05\\DataTanks\\Demotank2',
	block = '6_13_14_10Min_stim2';


var tdt = require( __dirname + "/tdt" );



tdt
.open( tank, block, function ( err, data ) {
	// body...
});
// .done( function () {
// 	console.log('here')
// })
