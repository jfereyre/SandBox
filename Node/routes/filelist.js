var express = require('express');
var router = express.Router();
var exec = require('child_process').exec;
var assert = require('assert');
var config = require('config');
var g_fs  = require('fs');
var g_path = require('path');

exploreDir = function(a_directoryPath) {
	var l_directoryToExplore = [];
	var l_fileList = new Array();
	
	var l_directoryItems = g_fs.readdirSync(a_directoryPath);
	for ( var l_directoryItemIndex = 0 ; l_directoryItemIndex < l_directoryItems.length; l_directoryItemIndex++ ) {
		var l_fullDirectoryItemPath = g_path.join(a_directoryPath, l_directoryItems[l_directoryItemIndex]);
		var l_directoryItemName = l_directoryItems[l_directoryItemIndex];
		var l_directoryItemStat = g_fs.statSync(l_fullDirectoryItemPath);
		if ( l_directoryItemStat.isDirectory() == true ) {
			l_directoryToExplore.push(l_fullDirectoryItemPath);
		} else {
			l_fileList.push({	path : l_fullDirectoryItemPath,
								name : l_directoryItemName,
								extension : l_directoryItemName.split('.').pop()});	
		}
	}
	
	var l_currentDirectoryToExplore = l_directoryToExplore.pop();
	while (l_currentDirectoryToExplore) {
		l_fileList.concat(exploreDir(l_currentDirectoryToExplore));
		l_currentDirectoryToExplore = l_directoryToExplore.pop();
	}
	
	return l_fileList;
};


/* GET file listing. */
router.get('/', function(req, res, next) {
	res.json({files : exploreDir(config.get('file_exploration.root_dir'))});
});

module.exports = router;
