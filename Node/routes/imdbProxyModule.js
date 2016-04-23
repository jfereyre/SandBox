var express = require('express');
var router = express.Router();
var imdb = require('imdb-api');

/* GET file listing. */
router.get('/:fileName', function(req, res, next) {
	console.log(req.params.fileName);
	
	var movie;
	imdb.getReq({ name: 'The Toxic Avenger' }, function(err, things) {
		res.json({"things" : things, "err" : err});
	});
});

module.exports = router;
	