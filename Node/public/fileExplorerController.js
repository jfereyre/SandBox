// public/fileExplorerController.js

g_testJerome.controller('fileExplorerController', function($scope, $http, $log, videoPlayer) {
	$scope.videoPlayer = videoPlayer;

	loadFiles = function() {
		$http.get("/usagemanager").then(function(response) {
			$scope.files = response.data
			$scope.nbItems = $scope.files.length;

			$scope.nbPages = $scope.files.length / $scope.itemsPerPage;
		});
	};
	
	loadFiles();
	
	$scope.$on('tabSelectedEvent', function(event, args) {
		if ( args.tab_id == 'Files' ) {
			$scope.refresh();
		}
	});
	
	$scope.refreshFileList = function() {
		$http.get("/fileexplorer").then(function(response) {
			var l_files = response.data.files;
			$scope.nbItems = l_files.length;

			for ( var l_fileIndex = 0 ; l_fileIndex < $scope.nbItems; l_fileIndex++) {
				l_file = l_files[l_fileIndex];
				l_file.normalizedPath = l_files[l_fileIndex].path.split('\\').join('/');
				l_file.name = l_file.normalizedPath.substring(l_file.normalizedPath.lastIndexOf('/')+1);
				
				var res = $http.post('/usagemanager/', l_file);
				res.error(function(data, status, headers, config) {
					console.log('post metadata failed');
				});
			}
		});
	};
	
	$scope.setPage = function (pageNo) {
		$scope.currentPage = pageNo;
	};

	$scope.pageChanged = function() {
		
	};
	
	$scope.refresh = function() {
		loadFiles();
	};
	
	$scope.filesToDisplay = function() {
		if ( $scope.files ) {
			return $scope.files.slice(($scope.currentPage-1)*$scope.itemsPerPage, ($scope.currentPage-1)*$scope.itemsPerPage + $scope.itemsPerPage);	} else {
			return [];
		}
	};
	
	$scope.setNbItemsPerPage = function(a_itemsPerPage) {
		$scope.itemsPerPage = a_itemsPerPage;
	};
	
	$scope.totalItems = 64;
	$scope.currentPage = 1;
	$scope.nbPages = 0;
	$scope.maxSize = 3;
	$scope.nbItems = 0;
	$scope.itemsPerPage = 10;
});

