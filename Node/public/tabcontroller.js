// public/tabcontroller.js

g_testJerome.config(['$locationProvider', function($locationProvider) {
	//Enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(false);
}]);

g_testJerome.controller('tabController', function($scope,$log) {	
	$scope.activeTab = 'Files';    
	$scope.changeActiveTab = function (tabId) {
		$scope.activeTab = tabId;
	};

	$scope.isActiveTab = function (tabId) {
		return tabId === $scope.activeTab;
	}
});
