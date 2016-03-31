#include <stdio.h>
 
#include "../../Lib/src/dataStructure/linked_list.h"
#include "../../Lib/src/JSON/json.h"
#include "../../Lib/src/logger.h"
#include "directory_explorer.h"

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

/**
 *
 */
int main(int argc, char *argv[]) {
	t_JSONArray l_fileList = JSONArrayCreate();
	if ( l_fileList != NULL ) {
		
		t_linkedList * l_directoryList = linkedListCreate();
		linkedListPush(l_directoryList, "C:\\");
		LOG_DEBUG("before dumpJSONObject call.");
		printf("%s", stringBufferGetString(dumpJSONObject(exploreDirectories(l_directoryList))));
		LOG_DEBUG("after dumpJSONObject call.");

	} else {
		LOG_ERROR("Fail creating list used to store file informations.");
	}
}
