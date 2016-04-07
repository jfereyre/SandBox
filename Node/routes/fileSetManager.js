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
	g_fileSetsCollection = g_Db.getCollection('filesets');
	if (g_fileSetsCollection === null) {
		g_fileSetsCollection = g_Db.addCollection('filesets');
	}
}

router.post('/', function(req, res) {
	var l_fileset = g_fileSetsCollection.find({ name : req.body.name });
	console.log(l_fileset);
	if ( l_fileset.length == 0 ) {
		g_fileSetsCollection.insert(req.body);
	} else {
		l_fileset[0].fileList = req.body.fileList;
		g_fileSetsCollection.update(l_fileset);
	}
	res.json({});
});

router.delete('/:fileSetName', function(req, res) {
	var l_fileSet = g_fileSetsCollection.find({name : req.params.fileSetName});
	if ( l_fileSet.length != 0 ) {
		g_fileSetsCollection.remove(l_fileSet[0]);
	}
	res.json({});
});

router.get('/:fileSetName', function(req, res) {
	res.json(g_fileSetsCollection.find({name : req.params.fileSetName}));
});

router.get('/', function(req, res) {
	var l_fileSets = g_fileSetsCollection.find({});	
	res.json(l_fileSets);
});

module.exports = router;

