var express = require('express');
var router = express.Router();
var assert = require('assert');
var loki = require('lokijs');
var config = require('config');

var g_Db = new loki(config.get('database.location'), {
	autoload: true,
	autoloadCallback : loadHandler,
	autosave: true, 
	autosaveInterval: 10000}); 


function loadHandler() {
	// if database did not exist it will be empty so I will intitialize here
	g_tagsCollection = g_Db.getCollection('tags');
	if (g_tagsCollection === null) {
		g_tagsCollection = g_Db.addCollection('tags');
	}
}

router.post('/', function(req, res) {
	var l_tag = g_tagsCollection.find({ "name" : req.body.name });
	if ( l_tag == 0 ) {
		g_tagsCollection.insert({ "name" : req.body.name });
	}
	res.json({});
});

router.get('/', function(req, res) {
	res.json(g_tagsCollection.find({}));
});

router.delete('/:tagName', function(req, res) {
	var l_tag = g_tagsCollection.find({ "name" : req.params.tagName});
	if ( l_tag.length != 0 ) {
		g_tagsCollection.remove(l_tag[0]);
	}
	res.json({});
});

module.exports = router;

