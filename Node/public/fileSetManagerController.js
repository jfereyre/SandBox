// public/fileSetManagerController.js

g_testJerome.controller('fileSetManagerController', function($scope, $http, $log, listItemEditorService) {	
	$scope.listItemEditorService = listItemEditorService;
	$scope.context = listItemEditorService.createNewListContext("File sets", 
																"/filesetmanager", 
																"/usagemanager/forusage/video", 
																"New file set name", 
																"File set name", 
																"Available files",
																"Selected files",
																"name",
																"name",
																"name",
																"fileList");
});

