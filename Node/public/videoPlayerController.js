// public/videoPlayerController.js

g_testJerome.controller('videoPlayerController', function($scope, $http, $log, videoPlayer) {
	$scope.videoPlayer = videoPlayer;
	$scope.filePlaying = null;
	$scope.filePaused = null;
	$scope.filesToPlay = [];
	
	$scope.playing = function() {
		var res = $scope.videoPlayer.getPlaying();
		res.success( function(response) {
			console.log(response);
			$scope.filePlaying = response.playing;
			$scope.filePaused = response.paused;
			$scope.filesToPlay = response.files;
			$log.log("PLAYING " + $scope.filePlaying);
		});
	}
	
	$scope.play = function() {
		var res = $scope.videoPlayer.play();
		res.success( function(response) {
			$scope.playing();
			$log.log("PLAYING " + $scope.filePlaying);
		});
	}
	
	$scope.pause = function() {
		var res = $scope.videoPlayer.pause();
		res.success( function(response) {
			$scope.playing();
			$log.log("PAUSING " + $scope.filePlaying);
		});
	}
	
	$scope.stop = function() {
		var res = $scope.videoPlayer.stop();
		res.success( function(response) {
			$scope.playing();
			$log.log("STOPING " + $scope.filePlaying);
		});
	}
	
	$scope.drop = function() {
		var res = $scope.videoPlayer.drop();
		res.success( function(response) {
			$scope.playing();
			$log.log("STOPING " + $scope.filePlaying);
		});
	}
	
	$scope.refresh = function() {
		$scope.playing();
		$log.log("REFRESHING");
	}
	
	$scope.refresh();
});
