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
	g_fileTypesCollection = g_Db.getCollection('filetypes');
	if (g_fileTypesCollection === null) {
		g_fileTypesCollection = g_Db.addCollection('filetypes');
	}
	g_filesCollection = g_Db.getCollection('files');
	if (g_filesCollection === null) {
		g_filesCollection = g_Db.addCollection('files');
	}
	g_fileUsagesCollection = g_Db.getCollection('fileUsages');
	if (g_fileUsagesCollection === null) {
		g_fileUsagesCollection = g_Db.addCollection('fileUsages');
	}
}

registerNewFileExtensionIfNeeded = function(a_extension) {
	var l_extension = a_extension.toLowerCase();
	var l_fileTypes = g_fileTypesCollection.find({ extension : l_extension});
	if ( l_fileTypes.length == 0 ) {
		console.log({ extension : l_extension, type : '' });
		g_fileTypesCollection.insert({ extension : l_extension, type : '' });	
	}
}

router.post('/fileusages', function(req, res) {
	console.log("add usage : " + JSON.stringify(req.body));
	var l_fileUsage = g_fileUsagesCollection.find({ name : req.body.name});
	console.log(l_fileUsage);
	if ( l_fileUsage.length == 0 ) {
		g_fileUsagesCollection.insert(req.body);
	} else {
		l_fileUsage[0].extensionList = req.body.extensionList;
		g_fileUsagesCollection.update(l_fileUsage);
	}
	res.json({});
});
router.delete('/fileusages/:fileUsageName', function(req, res) {
	var l_fileUsage = g_fileUsagesCollection.find({name : req.params.fileUsageName});
	if ( l_fileUsage.length != 0 ) {
		g_fileUsagesCollection.remove(l_fileUsage[0]);
	}
	res.json({});
});

router.get('/fileusages/:fileUsageName', function(req, res) {
	res.json(g_fileUsagesCollection.find({name : req.params.fileUsageName}));
});

router.get('/fileusages', function(req, res) {
	res.json(g_fileUsagesCollection.find({}));
});

router.get('/fileusages/byextension/:extension', function(req, res) {
	res.json(g_fileUsagesCollection.find({extensionList : { $contains : req.params.extension}}));
});

router.put('/filetypes', function(req, res) {
	res.json(g_fileTypesCollection.find({}));
});

router.get('/filetypes', function(req, res) {
	res.json(g_fileTypesCollection.find({}));
});

router.post('/', function(req, res) {
	var l_file = g_filesCollection.find({ path : req.body.path});
	if ( l_file == 0 ) {
		g_filesCollection.insert(req.body);
	}
	registerNewFileExtensionIfNeeded(req.body.extension);
	res.json({});
});

router.get('/', function(req, res) {
	var l_files = g_filesCollection.find({});
	var l_result = [];
	for ( var l_fileIndex = 0 ; l_fileIndex < l_files.length; l_fileIndex++ ) {
		var l_fileUsages = g_fileUsagesCollection.find({extensionList : { $contains : l_files[l_fileIndex].extension}});
		var l_usageName = null;
		if ( l_fileUsages.length > 0 ) {
			l_usageName = l_fileUsages[0].name;
		}
		l_result.push({path : l_files[l_fileIndex].path, name : l_files[l_fileIndex].name, extension : l_files[l_fileIndex].extension, usageName : l_usageName});
	}
	
	res.json(l_result);
});

router.get('/forusage/:fileUsageName', function(req, res) {
	var l_usage = g_fileUsagesCollection.find({name : req.params.fileUsageName});
	var l_result = [];
	if ( l_usage.length == 1 ) {
		var l_result = g_filesCollection.find({extension : { $in : l_usage[0].extensionList}});
	}
	res.json(l_result);
});

module.exports = router;

