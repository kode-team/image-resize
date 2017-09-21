
var resizeImage = new ResizeImage({});


document.getElementById('play').addEventListener('click', function() {
	resizeImage.play('http://goose.redgoose.me/data/upload/original/201709/rg-20170905-000289.jpg').then(
		function(res)
		{
			console.log('RESULT: ', res);
			//document.querySelector('main').appendChild(res.el);
		},
		function(error)
		{
			console.log('ERROR:', error);
		}
	);
});
