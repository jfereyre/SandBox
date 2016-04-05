// public/videousage.js

g_testJerome.controller('videoController', function($scope, $http, $log) {
	$scope.playingFile = 'coucou';
	
	$scope.play = function() {
		$log.log("PLAY");
	}
	
	$scope.pause = function() {
		$log.log("PAUSE");
	}
	
	$scope.stop = function() {
		$log.log("STOP");
	}
});

