// public/core.js
var g_testJerome = angular.module('testJerome', ['ngAnimate', 'ui.bootstrap'], function($interpolateProvider){
	$interpolateProvider.startSymbol('{[{');
	$interpolateProvider.endSymbol('}]}');
});

g_testJerome.controller('filesPaginationController', function($scope, $http, $log) {
	$http.get("/filelist").then(function(response) {
		var l_files = response.data.files;
		$scope.nbItems = l_files.length;

		for ( var l_fileIndex = 0 ; l_fileIndex < $scope.nbItems; l_fileIndex++) {
			l_file = l_files[l_fileIndex];
			l_file.normalizedPath = l_files[l_fileIndex].path.split('\\').join('/');
			l_file.name = l_file.normalizedPath.substring(l_file.normalizedPath.lastIndexOf('/')+1);

			var res = $http.post('/filemetadata/', JSON.stringify(l_file));
			console.log(JSON.stringify(l_file));
			res.success(function(data, status, headers, config) {
				console.log('post metadata done');
			});
			res.error(function(data, status, headers, config) {
				console.log('post metadata failed');
			});
		}
	});


	$http.get("/filemetadata").then(function(response) {
		$scope.files = response.data
		$scope.nbItems = $scope.files.length;

		$scope.nbPages = $scope.files.length / $scope.itemsPerPage;
	});

	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function() {
		$log.log('Page changed to: ' + $scope.currentPage);
	};

	$scope.filesToDisplay = function() {
		if ( $scope.files ) {
			return $scope.files.slice(($scope.currentPage-1)*$scope.itemsPerPage, ($scope.currentPage-1)*$scope.itemsPerPage + $scope.itemsPerPage);	} else {
			return [];
		}
	};

	$scope.totalItems = 64;
	$scope.currentPage = 1;
	$scope.nbPages = 0;
	$scope.maxSize = 3;
	$scope.nbItems = 0;
	$scope.itemsPerPage = 25;
});

