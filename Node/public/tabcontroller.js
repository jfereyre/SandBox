// public/tabcontroller.js

g_testJerome.config(['$locationProvider', function($locationProvider) {
	//Enable html5Mode for pushstate ('#'-less URLs)
    $locationProvider.html5Mode(false);
}]);

g_testJerome.controller('tabController', function($scope,$log,$rootScope) {	
	$scope.activeTab = 'Files';    
	$scope.changeActiveTab = function (a_tabId) {
		$scope.activeTab = a_tabId;
		$rootScope.$broadcast('tabSelectedEvent', {tab_id : a_tabId})
	};

	$scope.isActiveTab = function (a_tabId) {
		return a_tabId === $scope.activeTab;
	}
});
