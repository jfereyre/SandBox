// public/videousage.js

g_testJerome.controller('videoController', function($scope, $http, $log, videoPlayer) {
	$scope.videoPlayer = videoPlayer;
	$scope.playingFile = "test";
	
	$scope.playing = function() {
		var res = $scope.videoPlayer.getPlaying();
		res.success( function(response) {
			console.log(response);
			$scope.playingFile = response.playing;
			$log.log("PLAYING " + $scope.playingFile);
		});
	}
	
	$scope.playing();
});
