// public/tagManagerController.js

g_testJerome.controller('tagManagerController', function($scope, $http, $log, $rootScope) {

	$scope.tagList = [];
	$scope.selectedTag = null;
	$scope.searchedTag = null;
	
	refreshTagList = function() {
		$http.get('/tagmanager').then(function(response) {
			$scope.tagList = response.data;
			$scope.newTagName = null;
		});
	};
	
	$scope.addTag = function(a_name) {
		var l_tagData = { name : a_name };
		$http.post('/tagmanager', l_tagData).then(function(response) {
			refreshTagList();
		});
	};
	
	$scope.delTag = function(a_name) {
		$http.delete('/tagmanager/'+ a_name).then(function(response) {
			refreshTagList();
		});
	};
	
	// search function to match full text
	$scope.localSearch = function(str, people) {
		var matches = [];
		people.forEach(function(person) {
		var fullName = person.firstName + ' ' + person.surname;
		if ((person.firstName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
			(person.surname.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0) ||
			(fullName.toLowerCase().indexOf(str.toString().toLowerCase()) >= 0)) {
		  matches.push(person);
		}
	});
  return matches;
};
	
	refreshTagList();
});
