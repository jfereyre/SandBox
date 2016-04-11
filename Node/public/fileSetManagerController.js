// public/fileSetManagerController.js

g_testJerome.controller('fileSetManagerController', function($scope, $http, $log, videoPlayer) {
	$scope.availableFiles = [];
	$scope.selectedFiles = [];
	
	$scope.tagList =  [{ name : 'Serie'}]
	
	$scope.fileSetList = [	{ 	name : 'un',
								childFileSet : [ 
									{	name : 'deux', 
										childFileSet : [
											{	name : 'trois', 
												childFileSet : [],
												fileList : [],
												tagList :   []
											},
											{	name : 'quatre', 
												childFileSet : [],
												fileList : []
											},
											{	name : 'cinq', 
												childFileSet : [],
												fileList : []
											},
										]
									}
								],
								fileList : []
							}
						];
	
	loadFileSets = function() {
		$http.get("/usagemanager/forusage/video").then(function(response) {
			$scope.availableFiles = response.data;
		});
	};
	
	$scope.toggle = function (scope) {
        scope.toggle();
	};
	
	$scope.remove = function (scope) {
		scope.remove();
	};
	
	$scope.newSubItem = function (scope, newFileSetTitle) {
		$log.log(newFileSetTitle);
        var fileSetData = scope.$modelValue;
        fileSetData.childFileSet.push({
          name: newFileSetTitle,
          childFileSet: [],
		  fileList : []
        });
	};
	
	$scope.refresh = function() {
		loadFileSets();
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

