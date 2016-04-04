var express = require('express');
var router = express.Router();
var Db = require('tingodb')().Db;
var assert = require('assert');

var g_DBPath = 'C:\\Users\\A624072\\AppData\\Local\\Temp\\DB';

router.post('/filetypes', function(req, res) {
	res.send('ok');
});

router.get('/filetypes', function(req, res) {
	var l_fileMetaDataDB = new g_Db(g_DBPath, {});
	var l_fileTypesCollection = l_fileMetaDataDB.collection('filetypes');
	var l_fileTypesCursor = l_fileTypesCollection.find({});
	l_fileTypesCursor.toArray(function(err, a_fileTypeArray) {
		res.json(a_fileTypeArray);
	});
});

router.post('/', function(req, res) {
	var db = new Db(g_DBPath, {});
	console.log(req.body);
	collection.insertOne(JSON.stringify(req.body), function(err, result){console.log(err); console.log(result)});
	res.json({});
});

router.get('/', function(req, res) {
	var db = new Db(g_DBPath, {});
	var l_filesCollection = db.collection('files');
	var l_filesCursor = l_filesCollection.find({});
	l_filesCursor.toArray(function(err, a_fileArray) {
		res.json(a_fileArray);
	});
});

router.get('/:file_id', function(req, res) {
	var l_fileMetaDataDB = new g_Db(g_DBPath, {});
	var l_filesCollection = l_fileMetaDataDB.collection('files');
	var l_fileCursor = l_filesCollection.findById(req.params.file_id);
	l_fileCursor.toArray(function(err, a_file) {
		res.json(a_file);
	});
});

module.exports = router;
