// public/videousage.js

g_testJerome.factory('videoPlayer', function($http, $log) {
	var videoPlayerService = {};
	
	videoPlayerService.play = function(a_filePath) {
		var l_fileData = {path : a_filePath};
		var l_addFileResult = $http.post('/videoplayer/', l_fileData);
		l_addFileResult.success(function(data, status, headers, config) {
			var l_playResult = $http.post('/videoplayer/play');
		});
	}
	
	videoPlayerService.pause = function() {
		$http.post('/videoplayer/pause/');
	}
	
	videoPlayerService.stop = function() {
		$http.post('/videoplayer/stop/');
	}
	
	videoPlayerService.getPlaying = function() {
		return $http.get('/videoplayer/');
	}
		
	return videoPlayerService;
});
