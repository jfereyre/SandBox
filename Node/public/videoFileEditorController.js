// public/videfileeditorcontroller.js


g_testJerome.controller('videoFileEditorController', function($scope,$log,$http) {
	$scope.searchResults = [];
	$scope.searched = "";
	$scope.files = [];
	
	loadFiles = function() {
		$http.get("/usagemanager").then(function(response) {
			$scope.files = [];
			
			for ( var l_fileIndex=0; l_fileIndex < response.data.length; l_fileIndex++ ) {
				if ( ! response.data[l_fileIndex].additionaldata || ! response.data[l_fileIndex].additionaldata.moviedata ) {
					response.data[l_fileIndex].index = l_fileIndex;
					$scope.files.push(response.data[l_fileIndex]);
					$scope.nbItems = $scope.nbItems+1;
				}
			}
		});
	};
	
	searchResultCallback = function(a_searchResults) {
		$scope.searchResults = a_searchResults;
	};
	
	$scope.search = function() {
		var l_movieName = $scope.files[$scope.searched].name.replace("." + $scope.files[$scope.searched].extension, "");	
		$scope.searchMovieByTitle(l_movieName, searchResultCallback);
	};
	
	$scope.storeMovieData = function(a_movieData) {
		if ( ! $scope.files[$scope.searched].additionaldata ) {
			$scope.files[$scope.searched].additionaldata = {};
		}
		$scope.files[$scope.searched].additionaldata.moviedata = a_movieData;
		
		$http.post("/usagemanager", $scope.files[$scope.searched])
		.then(function(response){ 
			console.log("data saved");
		});
	}
	
	$scope.searchMovieByTitle = function(a_movieTitle, a_searchResultCallback) {
		$http.get("http://www.omdbapi.com/?s=%25" + a_movieTitle + "%25&tomatoes=true&plot=full")
		.then(function(response){ 
			if ( response.data.Response == "True" ) {
				a_searchResultCallback(response.data.Search);
			} else {
				a_searchResultCallback([]);
			}
		});
	};
	
	loadFiles();
});
