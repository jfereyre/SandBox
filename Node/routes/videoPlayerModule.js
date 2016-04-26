var express = require('express');
var router = express.Router();
var assert = require('assert');
var omxdirector = require('omxdirector'); 
var config = require('config');

var fileToPlayList = [];
var filePlaying = {};
var filePaused = {};

router.post('/', function(req, res) {
	console.log("add file : " + JSON.stringify(req.body.path));

	fileToPlayList.push(req.body);
	
	res.json({});
});

router.get('/', function(req, res) {
	res.json({files : fileToPlayList, playing : filePlaying, paused : filePaused});
});

router.post('/play', function(req, res) {
	if( filePaused != null ) {
		filePlaying = filePaused;
		filePaused = null;
		omxdirector.play();
	} else if ( fileToPlayList.length != 0 ) {
		filePlaying = fileToPlayList.pop();
		omxdirector.play(filePlaying.path, {loop : false, audioOutput : config.get('video_player.audio_output')});
	}
	console.log('Play file : ' + filePlaying.path);
	res.json({});
});

router.post('/pause', function(req, res) {	
	filePaused = filePlaying;
	filePlaying = null;
	omxdirector.pause();
	res.json({});
});

router.post('/stop', function(req, res) {
	filePlaying = null;
	filePaused = null;
	omxdirector.stop();
	res.json({});
});

router.post('/drop', function(req, res) {
	filePlaying = fileToPlayList.pop();
	filePaused = null;
	res.json({});
});

module.exports = router;

