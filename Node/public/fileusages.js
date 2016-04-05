// public/fileusages.js

g_testJerome.controller('fileUsagesController', function($scope, $http, $log) {	
	$scope.usageNames = [];
	$scope.selectedUsage = $scope.usageNames[0];
	$scope.newUsageName = null;
	$scope.selectedExtensions = [];
    $scope.availableExtensions = [];

	refreshFileTypes = function() {	
		$scope.availableExtensions = [];
		$http.get("/filemetadata/filetypes").then(function(response) {
			for ( var l_fileTypeIndex = 0 ; l_fileTypeIndex < response.data.length; l_fileTypeIndex++) {
				var l_isSelected = $scope.selectedExtensions.indexOf(response.data[l_fileTypeIndex].extension);
				if ( l_isSelected == -1 ) {
					// Add element only is it is not already selected in file usage.
					$scope.availableExtensions.push(response.data[l_fileTypeIndex].extension);
				}
			}
		});
	};
	
	$scope.selectUsage = function() {
		$http.get("/filemetadata/fileusages/" + $scope.selectedUsage).then(function(response) {
			if ( response.data.length != 0 ) {
				$scope.selectedExtensions = response.data[0].extensionList;
			} else {
				$scope.selectedExtensions = [];
			}
			refreshFileTypes();
		}, function(response) {
			$scope.selectedExtensions = [];
			refreshFileTypes();
		});
	};

	refreshFileUsages = function() {
		$scope.usageNames = [];
		$http.get("/filemetadata/fileusages").then(function(response) {
			for ( var l_fileUsageIndex = 0 ; l_fileUsageIndex < response.data.length; l_fileUsageIndex++) {
				$scope.usageNames.push(response.data[l_fileUsageIndex].name);
			}
		});
		$scope.selectedUsage = $scope.usageNames[0];
		$scope.selectUsage();
	};
	
	refreshFileUsages();
	
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
	
	$scope.save = function() {
		var l_fileUsageData = {};
		if ( $scope.newUsageName == null ) {
			l_fileUsageData.name = $scope.selectedUsage;
		} else {
			l_fileUsageData.name = $scope.newUsageName;
		}
		l_fileUsageData.extensionList = $scope.selectedExtensions;
		$http.post("/filemetadata/fileusages", l_fileUsageData).then(function(response) {
			$scope.newUsageName = null;
			refreshFileUsages();
		});
    };    
	
	$scope.reset = function() {
		$scope.selectUsage();
    };
	
	$scope.delete = function() {
		$http.delete("/filemetadata/fileusages/" + $scope.selectedUsage).then(function(response) {
			refreshFileUsages();
		}, function(response) {
			$scope.selectUsage();
		});
	};
	
	$scope.newUsageNameChange = function() {
		if ( $scope.newUsageName == null || $scope.newUsageName == "") {
			$scope.newUsageName = null;
			$scope.selectUsage();
		} else {
			// If data have already been selected unselect then for new file usage creation
			if ( $scope.selectedExtensions.length != 0 ) {
				$scope.selectedExtensions = [];
				refreshFileTypes();
			}
		}
	};
});
