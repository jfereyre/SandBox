var express = require('express');
var router = express.Router();
var assert = require('assert');
var omxdirector = require('omxdirector'); 

var fileToPlayList = [];
var filePlaying = null;

router.post('/', function(req, res) {
	console.log("add file : " + JSON.stringify(req.body.path));

	fileToPlayList.push(req.body.path);
	
	res.json({});
});

router.get('/', function(req, res) {
	console.log("add file : " + JSON.stringify(req.body.path));

	res.json({files : fileToPlayList, playing : filePlaying});
});

router.post('/play', function(req, res) {
	filePlaying = fileToPlayList.pop();
	
	console.log('Play file : ' + filePlaying);
	res.json({});
});

router.post('/pause', function(req, res) {
	console.log('pause file : ' + filePlaying);	
	res.json({});
});

router.post('/stop', function(req, res) {
	console.log('stop file : ' + filePlaying);
	res.json({});
});

module.exports = router;

