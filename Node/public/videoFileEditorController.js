// public/videfileeditorcontroller.js


g_testJerome.controller('videoFileEditorController', function($scope,$log,$http) {
	$scope.searchResults = [];
	$scope.selectedFileIndex = "";
	$scope.searchedTitle = "";
	$scope.files = [];
	$scope.errorMessage = null;
	
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
		for (var l_resultIndex = 0 ; l_resultIndex < a_searchResults.length; l_resultIndex++ ) {
			if ( a_searchResults[l_resultIndex].Poster.trim() == 'N/A' ) {
				a_searchResults[l_resultIndex].Poster = null;
			}
		}
		$scope.searchResults = a_searchResults;
	};
	
	getSelectedFile = function() {
		var l_file = null;
		for ( var l_fileIndex=0; l_fileIndex < $scope.files.length; l_fileIndex++ ) {
			l_file = $scope.files[l_fileIndex];
			if ( l_file.index == $scope.selectedFileIndex ) {
				break;
			}
		}
		return l_file;
	}
	
	$scope.fileSelected = function() {
		var l_file = getSelectedFile();
		$scope.searchedTitle=l_file.name.replace("." + l_file.extension, "").replace(/ *\([^)]*\) */g, "");;
	}
	
	$scope.search = function() {
		var l_file = getSelectedFile();
		var l_movieName = $scope.searchedTitle.replace("." + l_file.extension, "");	
		$scope.searchMovieByTitle(l_movieName, searchResultCallback);
	};
	
	$scope.createAndStoreMovieData = function() {
		var l_file = getSelectedFile();
		if ( ! l_file.additionaldata ) {
			l_file.additionaldata = {};
		}
		
		l_file.additionaldata.moviedata = { "Title" : $scope.searchedTitle,
											"Year" : $scope.searchedMovieYear,
											"imdbID" : "",
											"Type" : $scope.searchedMovieType,
											"Poster" : $scope.searchedMoviePosterURL};
		
		$http.post("/usagemanager", l_file)
		.then(function(response){ 
			console.log("data saved");
		});
	}
	
	$scope.storeMovieData = function(a_movieData) {
		var l_file = getSelectedFile();
		if ( ! l_file.additionaldata ) {
			l_file.additionaldata = {};
		}
		l_file.additionaldata.moviedata = a_movieData;
		
		$http.post("/usagemanager", l_file)
		.then(function(response){ 
			console.log("data saved");
		});
	}
	
	$scope.searchMovieByTitle = function(a_movieTitle, a_searchResultCallback) {
		$http.get("http://www.omdbapi.com/?s=%25" + a_movieTitle + "%25&tomatoes=true&plot=full")
		.then(function(response){ 
			if ( response.data.Response == "True" ) {
				console.log(JSON.stringify(response.data.Search));
				a_searchResultCallback(response.data.Search);
			} else {
				$scope.errorMessage = response.data.Error;	
				a_searchResultCallback([]);
			}
		});
	};
	
	loadFiles();
});
