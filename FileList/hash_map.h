#ifndef __HASH_MAP_H__
#define __HASH_MAP_H__

#include "linked_list.h"

typedef struct s_hashMap {
	t_linkedList * m_keys;
	t_linkedList * m_data;
} t_hashMap;

t_hashMap * hashMapCreate();

void hashMapAddValue(t_hashMap * a_map, char * a_key, void * a_value);
void hashMapDelValue(t_hashMap * a_map, char * a_key);
t_linkedList * hashMapGetKeys(t_hashMap * a_map);
t_linkedList * hashMapGetValues(t_hashMap * a_map, char * a_key);

#endif /* __HASH_MAP_H__ */
