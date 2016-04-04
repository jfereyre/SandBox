var express = require('express');
var router = express.Router();

var assert = require('assert');
var loki = require('lokijs');

var g_DBPath = 'C:\\Users\\A624072\\AppData\\Local\\Temp\\DB\\filemetadata.db';
var g_Db = new loki(g_DBPath, {
	autoload: true,
	autoloadCallback : loadHandler,
	autosave: true, 
	autosaveInterval: 10000}); 


function loadHandler() {
	// if database did not exist it will be empty so I will intitialize here
	g_fileTypesCollection = g_Db.getCollection('filetypes');
	if (g_fileTypesCollection === null) {
		g_fileTypesCollection = g_Db.addCollection('filetypes');
	}
	g_filesCollection = g_Db.getCollection('files');
	if (g_filesCollection === null) {
		g_filesCollection = g_Db.addCollection('files');
	}
}

router.post('/filetypes', function(req, res) {
	res.json({});
});

router.get('/filetypes', function(req, res) {
	res.json(g_fileTypesCollection.find({}));
});

router.post('/', function(req, res) {
	g_filesCollection.insert(req.body);
	res.json({});
});

router.get('/', function(req, res) {
	var l_files = g_filesCollection.find({});
	var l_result = [];
	
	for ( var l_fileIndex = 0 ; l_fileIndex < l_files.length; l_fileIndex++ ) {
		l_result.push({path : l_files[l_fileIndex].path, name : l_files[l_fileIndex].name, extension : l_files[l_fileIndex].extension});
	}
	
	res.json(l_result);
});


module.exports = router;

