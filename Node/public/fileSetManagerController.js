// public/fileSetManagerController.js

g_testJerome.controller('fileSetManagerController', function($scope, $http, $log, videoPlayer) {
	$scope.availableFiles = [];
	$scope.selectedFiles = [];
	
	loadFileSets = function() {
		$http.get("/usagemanager/forusage/video").then(function(response) {
			console.log(response.data);
			$scope.availableFiles = response.data;
		});
	};
		
	$scope.moveItem = function(item, from, to) {
        var idx=from.indexOf(item);
        if (idx != -1) {
            from.splice(idx, 1);
            to.push(item);      
        }
    };
    $scope.moveAll = function(from, to) {
        angular.forEach(from, function(item) {
            to.push(item);
        });
        from.length = 0;
    };
	
	loadFileSets();
});

