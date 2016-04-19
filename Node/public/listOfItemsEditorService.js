// public/listOfItemsEditorService.js
g_testJerome.factory('listItemEditorService', function($http, $log) {
	var listItemEditorService = { managedListContext : {} };
	
	listItemEditorService.createNewListContext = function( 	a_contextName, 
															a_nameListURL, 
															a_itemManagementURL, 
															a_newListNameLabel, 
															a_listNamesLabel, 
															a_availableItemsLabel, 
															a_selectedItemsLabel,
															a_listNameSelectionFieldName,
															a_listNameInsertionFieldName,
															a_itemSelectionFieldName, 
															a_itemListInsertionFieldName) {
		var l_context = { 	contextName : a_contextName,
							listNames : [],
							selectedListName : '',
							newListName : '',
							selectedItems : [],
							availableItems : [],
							nameListURL : a_nameListURL,
							itemManagementURL : a_itemManagementURL,
							newListNameLabel : a_newListNameLabel,
							listNamesLabel : a_listNamesLabel,
							availableItemsLabel : a_availableItemsLabel,
							selectedItemsLabel : a_selectedItemsLabel,
							listNameSelectionFieldName : a_listNameSelectionFieldName,
							listNameInsertionFieldName : a_listNameInsertionFieldName,
							itemSelectionFieldName : a_itemSelectionFieldName,
							itemListInsertionFieldName : a_itemListInsertionFieldName
						};
						
		listItemEditorService.managedListContext[a_contextName] = l_context;
		listItemEditorService.refreshLists(a_contextName);
		
		return l_context;
	};
	
	listItemEditorService.getContext = function(a_contextName) {
		return listItemEditorService.managedListContext[a_contextName];
	};
	
	listItemEditorService.refreshItems = function(a_contextName) {
		var l_context = listItemEditorService.getContext(a_contextName);
		l_context.availableItems = [];
		$http.get(l_context.itemManagementURL).then(function(response) {
			for ( var l_fileTypeIndex = 0 ; l_fileTypeIndex < response.data.length; l_fileTypeIndex++) {
				var l_isSelected = l_context.selectedItems.indexOf(response.data[l_fileTypeIndex][l_context.itemListInsertionFieldName]);
				if ( l_isSelected == -1 ) {
					// Add element only is it is not already selected in list.
					l_context.availableItems.push(response.data[l_fileTypeIndex][l_context.itemListInsertionFieldName]);
				}
			}
		});
	};
	
	listItemEditorService.selectLists = function(a_contextName) {
		var l_context = listItemEditorService.getContext(a_contextName);
		$http.get(l_context.nameListURL + "/" + l_context.selectedListName).then(function(response) {
			if ( response.data.length != 0 ) {
				console.log(response.data[0]);
				console.log("--" + l_context.itemListInsertionFieldName + "--");
				l_context.selectedItems = response.data[0][l_context.itemListInsertionFieldName];
			} else {
				l_context.selectedItems = [];
			}
			listItemEditorService.refreshItems(a_contextName);
		}, function(response) {
			l_context.selectedItems = [];
			listItemEditorService.refreshItems(a_contextName);
		});
	};

	listItemEditorService.refreshLists = function(a_contextName) {
		var l_context = listItemEditorService.getContext(a_contextName);
		l_context.listNames = [];
		$http.get(l_context.nameListURL).then(function(response) {
			for ( var l_listIndex = 0 ; l_listIndex < response.data.length; l_listIndex++) {
				l_context.listNames.push(response.data[l_listIndex][l_context.listNameSelectionFieldName]);
			}
		});
		l_context.selectedListName = l_context.listNames[0];
		listItemEditorService.selectLists(a_contextName);
	};
		
	listItemEditorService.moveItem = function(a_contextName, item, from, to) {
		var l_context = listItemEditorService.getContext(a_contextName);
        var idx=from.indexOf(item);
        if (idx != -1) {
            from.splice(idx, 1);
            to.push(item);      
        }
    };
	
    listItemEditorService.moveAll = function(a_contextName, from, to) {
		var l_context = listItemEditorService.getContext(a_contextName);
        angular.forEach(from, function(item) {
            to.push(item);
        });
        from.length = 0;
    };   
	
	listItemEditorService.save = function(a_contextName) {
		var l_context = listItemEditorService.getContext(a_contextName);
		var l_listData = {};
		if ( l_context.newListName == null ) {
			l_listData[listNameInsertionFieldName] = l_context.selectedListName;
		} else {
			l_listData[listNameInsertionFieldName] = l_context.newListName;
		}
		
		l_listData[l_context.itemListInsertionFieldName] = l_context.selectedItems;
		
		$http.post(l_context.nameListURL, l_listData).then(function(response) {
			l_context.newListName = null;
			listItemEditorService.refreshLists(a_contextName);
		});
    }; 

	listItemEditorService.reset = function(a_contextName) {
		var l_context = listItemEditorService.getContext(a_contextName);
		listItemEditorService.selectLists(a_contextName);
    };
	
	listItemEditorService.delete = function(a_contextName) {
		var l_context = listItemEditorService.getContext(a_contextName);
		$http.delete(l_context.nameListURL + "/" + l_context.selectedListName).then(function(response) {
			listItemEditorService.refreshLists(a_contextName);
		}, function(response) {
			listItemEditorService.selectLists(a_contextName);
		});
	};
	
	listItemEditorService.newListNameChange = function(a_contextName) {
		var l_context = listItemEditorService.getContext(a_contextName);
		if ( l_context.newListName == null || l_context.newListName == "") {
			l_context.newListName = null;
			listItemEditorService.selectLists(a_contextName);
		} else {
			// If data have already been selected unselect then for new list creation
			if ( l_context.selectedItems.length != 0 ) {
				l_context.selectedItems = [];
				listItemEditorService.refreshItems(a_contextName);
			}
		}
	};
	
	return listItemEditorService;
});
