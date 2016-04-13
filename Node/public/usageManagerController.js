// public/usageManagerController.js

g_testJerome.controller('usageManagerController', function($scope, $http, $log, listItemEditorService) {	
	$scope.listItemEditorService = listItemEditorService;
	$scope.context = listItemEditorService.createNewListContext("usages", 
																"/usagemanager/fileusages", 
																"/usagemanager/filetypes", 
																"New usage name", 
																"Usage name", 
																"Available extensions",
																"Concerned extensions",
																"extension",
																"extensionList");
});
