#include "hash_map.h"
#include "../logger.h"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>

/**
 *
 **/
typedef struct s_hashedKey {
	unsigned long m_hash;
	char * m_key;	
} t_hashedKey;

/**
 *
 **/
typedef struct s_hashedValues {
	t_linkedList * m_list;
	unsigned long m_hash;
} t_hashedValues;

/**
 * Local function declarations
 **/
unsigned long hash(char * str);
t_hashedValues * hashedValuesCreate();
t_hashedKey * hashedKeyCreate();

/**
 * Function used to compute hash value of key
 **/
unsigned long hash(char *str)
{
    unsigned long hash = 5381;
    int c;

    while (c = *str++)
		hash = ((hash << 5) + hash) + c; /* hash * 33 + c */

    return hash;
}

/**
 *
 **/
t_hashedKey * hashedKeyCreate(){
	t_hashedKey * l_newHashedKey = (t_hashedKey *)malloc(sizeof(t_hashedKey));
	
	if ( l_newHashedKey == NULL ) {
		LOG_ERROR("Fail allocating memory for new hashed key.");
	}
	
	return l_newHashedKey;
}

/**
 *
 **/
t_hashedValues * hashedValuesCreate() {
	t_hashedValues * l_newHashedValues = (t_hashedValues *)malloc(sizeof(t_hashedValues));
	
	if ( l_newHashedValues == NULL ) {
		LOG_ERROR("Fail allocating memory for new hashed values.");
	} else {	
		l_newHashedValues->m_list = linkedListCreate();
		
		if ( l_newHashedValues->m_list == NULL ) {
			LOG_ERROR("Fail allocating memory for new hashed values list.");
			free(l_newHashedValues);
			l_newHashedValues = NULL;
		}
	}
	
	return l_newHashedValues;
}

/**
 *
 **/
t_hashMap * hashMapCreate() {
	t_hashMap * l_newMap = (t_hashMap *)malloc(sizeof(t_hashMap));
	
	if ( l_newMap == NULL ) {
		LOG_ERROR("Fail allocating memory for the new hash map.");
	} else {
		l_newMap->m_keys = linkedListCreate();
		l_newMap->m_data = linkedListCreate();
		
		// Free allocated memories if an error occyrs.
		if ( l_newMap->m_keys == NULL || l_newMap->m_data == NULL ) {
			if ( l_newMap->m_keys != NULL ) { 
				free(l_newMap->m_keys);
			}
			if ( l_newMap->m_data != NULL ) { 
				free(l_newMap->m_data);
			}
			free(l_newMap);
			l_newMap = NULL;
		}
	}
	return l_newMap;
}

/**
 * This function the list of element that a linked to the same hashed value
 **/
t_linkedList * getHashedValues(t_hashMap * a_map, unsigned long a_hash) {
	t_linkedList * l_hashedValues = NULL;
	
	if ( a_map != NULL ) {
		t_linkedListElement * a_element = a_map->m_data->m_head;
		
		while ( a_element != NULL && a_element->m_next != NULL && ((t_hashedValues *)(a_element->m_next->m_data))->m_hash < a_hash ) {
			a_element = a_element->m_next;
		}
		
		if  ( a_element != NULL && a_element->m_next != NULL && ((t_hashedValues *)(a_element->m_next->m_data))->m_hash == a_hash ) {
			l_hashedValues = ((t_hashedValues *)(a_element->m_next->m_data))->m_list;
		}
	}
	
	return l_hashedValues;
}

/**
 *
 **/
void hashMapAddValue(t_hashMap * a_map, char * a_key, void * a_value) {
	unsigned long l_newHash = hash(a_key);
	
	t_linkedList * l_hashedValues = getHashedValues(a_map, l_newHash);
	
	if( l_hashedValues == NULL ) {
		// Need to create a new element list to store mapped data
		t_hashedValues * l_newHashedValues = hashedValuesCreate();
		
		if ( l_newHashedValues != NULL ) {
			// update hashed values
			l_newHashedValues->m_hash = l_newHash;
			linkedListPush(l_newHashedValues->m_list, a_value);
			
			linkedListPush(a_map->m_data, l_newHashedValues);
			
			// update hashed keys
			t_hashedKey * l_newHashedKey = hashedKeyCreate();
			if ( l_newHashedKey != NULL ) {
				l_newHashedKey->m_hash = l_newHash;
				l_newHashedKey->m_key = strdup(a_key);
			} else {
				LOG_ERROR("Can't add key to hashed keys since key list allocation fails.");
			}
			
			linkedListPush(a_map->m_keys, l_newHashedKey);
			
		} else {
			LOG_ERROR("Can't add element to map since hashed values allocation fails.");
		}
	} else {
		// Add new value to the hashed value list
		linkedListPush(l_hashedValues, a_value);
	}
}

/**
 *
 **/
void hashMapDelValue(t_hashMap * a_map, char * a_key) {
	LOG_ERROR("delElementFromMap NOT YET IMPLEMENTED.");
}

/**
 *
 **/
t_linkedList * hashMapGetKeys(t_hashMap * a_map) {
	t_linkedList * l_keyList = NULL;
	
	if ( a_map != NULL ) {
	
		l_keyList = linkedListCreate();
		
		if (l_keyList != NULL ) {
			t_linkedListElement * l_hashedKeysList = a_map->m_keys->m_head;
			
			while ( l_hashedKeysList != NULL ) {
				linkedListPush(l_keyList, strdup(((t_hashedKey *)l_hashedKeysList->m_data)->m_key));
				l_hashedKeysList = l_hashedKeysList->m_next;
			}
			
		} else {
			LOG_ERROR("Fail allocating result key list. Can't return key values.");
		}
	} else {
		LOG_ERROR("Can't get key values since map is NULL'.");
	}
	return l_keyList;
}

/**
 *
 */
t_linkedList * hashMapGetValues(t_hashMap * a_map, char * a_key) {
	unsigned long l_newHash = hash(a_key);
	
	t_linkedListElement * l_hashedKeysList = a_map->m_data->m_head;
	t_linkedList * l_valueList = NULL;
	
	while ( l_hashedKeysList != NULL ) {
		t_hashedValues * l_hashedValues = (t_hashedValues *)l_hashedKeysList->m_data;
		if ( l_hashedValues->m_hash == l_newHash ) {
			l_valueList = l_hashedValues->m_list;
		}
		l_hashedKeysList = l_hashedKeysList->m_next;
	}
	
	return l_valueList;

}

