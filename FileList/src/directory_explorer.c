#include "directory_explorer.h"
#include <string.h>
#include <stdio.h>
#include <stdlib.h>
#include <unistd.h>
#include <dirent.h>
#include <sys/types.h> 
#include <sys/stat.h> 
#include <errno.h>

#include <dataStructure/linked_list.h>
#include <JSON/json.h>
#include <logger.h>

#define FILE_PATH_SEPARATOR "/"

/**
 *
 */
void exploreDirectory(char * m_directory, t_JSONArray a_fileList) {
	DIR *l_dir;
	struct dirent *l_dirEntry;
	struct stat l_dirEntryStat;
	t_linkedList * l_explorationDirectoryList = linkedListCreate();
	
	l_dir = opendir (m_directory);
	if (l_dir != NULL)
	{
		// Walk through directory content
		while ((l_dirEntry = readdir (l_dir))) {
			t_stringBuffer * l_dirEntryFullPathStringBuffer = stringBufferCreate(); 
			stringBufferWrite(l_dirEntryFullPathStringBuffer, "%s" FILE_PATH_SEPARATOR "%s", m_directory, l_dirEntry->d_name);
			
			if( stat(stringBufferGetString(l_dirEntryFullPathStringBuffer),&l_dirEntryStat) < 0 ) {
				// if we can't stat the current directory entry display an error message
				LOG_ERROR("Fail getting stats for directory entry(%s) : %s", stringBufferGetString(l_dirEntryFullPathStringBuffer), strerror(errno));
			} else {
				// Check type of current directory entry
				if ( S_ISDIR(l_dirEntryStat.st_mode) ) {
					// Skipping "." and ".." directories
					if ( strcmp(l_dirEntry->d_name, "..") != 0 && strcmp(l_dirEntry->d_name, ".") != 0 ) {			
						linkedListPush(l_explorationDirectoryList, strdup(stringBufferGetString(l_dirEntryFullPathStringBuffer)));
					}
				} else {
					t_JSONObject l_newFileObject = JSONObjectCreate();
					
					JSONAddStringAttribute(l_newFileObject, "path", stringBufferGetString(l_dirEntryFullPathStringBuffer));
					LOG_DEBUG("Link new file object to file_list...");					
					JSONArrayAppend(a_fileList, l_newFileObject);
					LOG_DEBUG("Link new file object to file_list... DONE");
				}
			}
		}
		(void) closedir (l_dir);
	}
	else {
		LOG_ERROR("Couldn't open the directory");
	}
	
	char * l_dirToInspect = linkedListPop(l_explorationDirectoryList);
	
	while (l_dirToInspect != NULL ) {
		exploreDirectory(l_dirToInspect, a_fileList);
		l_dirToInspect = linkedListPop(l_explorationDirectoryList);
	}
}

/**
 *
 **/
void exploreDirectoryList(t_linkedList * a_directoryList, t_JSONArray a_fileList) {
	t_linkedListElement * l_currentDirectory = a_directoryList ->m_head;
	
	while ( l_currentDirectory != NULL ) {
		char * l_currentDirectoryPath = l_currentDirectory->m_data;
		exploreDirectory(l_currentDirectoryPath, a_fileList);
		l_currentDirectory = l_currentDirectory->m_next;
	}
}

/**
 *
 **/
t_JSONObject exploreDirectories(t_linkedList * a_directoryList) {
	t_JSONArray l_fileList = JSONArrayCreate();
	
	LOG_DEBUG("before exploreDirectory call.");
	exploreDirectoryList(a_directoryList, l_fileList);
	LOG_DEBUG("after exploreDirectory call.");
	
	t_JSONObject l_fileListObject = JSONObjectCreate();
	JSONAddArrayAttribute(l_fileListObject, "files", l_fileList);
	
	return l_fileListObject;
}
