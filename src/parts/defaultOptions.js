export const base = {

	quality: .75,
	format: 'jpg', // png,jpg
	outputType: 'base64', // base64, canvas, blob
	width: 320,
	height: null,
	reSample: 2,
	bgColor: '#ffffff',

	// callbacks
	callback_ready: function () { console.log('READY PLAY'); },

};
