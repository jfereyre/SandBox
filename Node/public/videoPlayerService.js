// public/videoPlayerService.js

g_testJerome.factory('videoPlayer', function($http, $log) {
	var videoPlayerService = {};
	
	videoPlayerService.addToPlayList = function(a_filePath) {
		var l_fileData = {path : a_filePath};
		$http.post('/videoplayer/', l_fileData);
	}
	
	videoPlayerService.play = function(a_filePath) {
		return $http.post('/videoplayer/play');
	}
	
	videoPlayerService.pause = function() {
		return $http.post('/videoplayer/pause/');
	}
	
	videoPlayerService.stop = function() {
		return $http.post('/videoplayer/stop/');
	}
		
	videoPlayerService.drop = function() {
		return $http.post('/videoplayer/drop/');
	}
	
	videoPlayerService.getPlaying = function() {
		return $http.get('/videoplayer/');
	}
		
	return videoPlayerService;
});
