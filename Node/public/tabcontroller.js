// public/tabcontroller.js

g_testJerome.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
	$routeProvider.when('/', {
        templateUrl: 'tabset.html',
        controller: 'tabController'
    })
    .otherwise({
    	redirectTo: '/'
    });

	  // Enable html5Mode for pushstate ('#'-less URLs)
    // $locationProvider.html5Mode(true);
}]);

g_testJerome.controller('tabController', ['$scope', '$rootScope', function($scope, $rootScope) {
    $scope.tabs = [{
        "heading" : 'Files',
		"active" : true,
        "template" : 'fileexplorer.html'
    }, {
        "heading" : 'Usages',
		"active" : false,
        "template" : 'usagemanager.html'
    }, {
        "heading" : 'Videoplayer',
		"active" : false,
        "template" : 'videoplayer.html'
    }];
}]);
