#include <stdio.h>
 
#include "linked_list.h"
#include "json.h"
#include "logger.h"
#include "directory_explorer.h"

/* run this program using the console pauser or add your own getch, system("pause") or input loop */

/**
 *
 */
int main(int argc, char *argv[]) {
	t_JSONArray l_fileList = JSONArrayCreate();
	if ( l_fileList != NULL ) {
		
		t_linkedList * l_directoryList = linkedListCreate();
		// linkedListPush(l_directoryList, "C:\\Users\\A624072\\Downloads\\lubuntu1210");
		// linkedListPush(l_directoryList, "C:\\Users\\A624072\\Downloads\\systor");
		linkedListPush(l_directoryList, "/bin");
		linkedListPush(l_directoryList, "/boot");
		linkedListPush(l_directoryList, "/etc");
		linkedListPush(l_directoryList, "/home");
		linkedListPush(l_directoryList, "/initrd.img");
		linkedListPush(l_directoryList, "/lib");
		linkedListPush(l_directoryList, "/lib64");
		linkedListPush(l_directoryList, "/opt");
		linkedListPush(l_directoryList, "/root");
		linkedListPush(l_directoryList, "/sbin");
		linkedListPush(l_directoryList, "/srv");
		linkedListPush(l_directoryList, "/usr");
		linkedListPush(l_directoryList, "/var");
		linkedListPush(l_directoryList, "/vmlinuz");
		LOG_DEBUG("before dumpJSONObject call.");
		printf("%s", stringBufferGetString(dumpJSONObject(exploreDirectories(l_directoryList))));
		LOG_DEBUG("after dumpJSONObject call.");

	} else {
		LOG_ERROR("Fail creating list used to store file informations.");
	}
}
