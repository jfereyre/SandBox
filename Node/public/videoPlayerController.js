// public/videoPlayerController.js

g_testJerome.controller('videoPlayerController', function($scope, $http, $log, videoPlayer) {
	$scope.videoPlayer = videoPlayer;
	$scope.filePlaying = null;
	$scope.filePaused = null;
	$scope.filesToPlay = [];
	
	$scope.playing = function() {
		var res = $scope.videoPlayer.getPlaying();
		res.success( function(response) {
			$scope.filePlaying = response.playing;
			$scope.filePaused = response.paused;
			$scope.filesToPlay = response.files;
		});
	}
	
	$scope.play = function() {
		var res = $scope.videoPlayer.play();
		res.success( function(response) {
			$scope.playing();
		});
	}
	
	$scope.pause = function() {
		var res = $scope.videoPlayer.pause();
		res.success( function(response) {
			$scope.playing();
		});
	}
	
	$scope.stop = function() {
		var res = $scope.videoPlayer.stop();
		res.success( function(response) {
			$scope.playing();
		});
	}
	
	$scope.drop = function() {
		var res = $scope.videoPlayer.drop();
		res.success( function(response) {
			$scope.playing();
		});
	}
	
	$scope.refresh = function() {
		console.log("refresh function called");
		$scope.playing();
	}
	
	$scope.refresh();
});
