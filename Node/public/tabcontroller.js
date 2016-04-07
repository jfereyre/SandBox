// public/tabcontroller.js

g_testJerome.config(['$locationProvider', function($locationProvider) {
	//Enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(false);
}]);

g_testJerome.controller('tabController', function($scope) {
    $scope.tabs = [{
		'id' : 'Files', 
        'label' : 'Files',
        'templateUrl' : 'fileexplorer.html'
    }, {
		'id' : 'Usages', 
        'label' : 'Usages',
        'templateUrl' : 'usagemanager.html'
    }, {
		'id' : 'Videoplayer', 
        'label' : 'Videoplayer',
        'templateUrl' : 'videoplayer.html'
    }, {
		'id' : 'FileSetManager', 
        'label' : 'File set manager',
        'templateUrl' : 'filesetmanager.html'
    }];
	
	$scope.activeTab = $scope.tabs[0];    
	$scope.changeActiveTab = function (tabId) {
		$scope.activeTab = tabId;
	};

	$scope.isActiveTab = function (tabId) {
		return tabId === $scope.activeTab;
	}
});
