#include "json.h"
#include "hash_map.h"
#include "logger.h"
#include "string_buffer.h"
#include <stdio.h>
#include <string.h>


/**
 *
 */
t_JSONData * JSONDataCreate() {
	return (t_JSONData *)malloc(sizeof(t_JSONData));
}

/**
 *
 */
t_JSONArray JSONArrayCreate() {
	t_JSONData * l_newData = (t_JSONArray)JSONDataCreate();
	l_newData->m_type = ARRAY;
	l_newData->m_array = linkedListCreate();
	
	return l_newData;
}

/**
 *
 */
t_JSONObject JSONObjectCreate() {
	t_JSONData * l_newData = (t_JSONObject)JSONDataCreate();
	l_newData->m_type = OBJECT;
	l_newData->m_jsonObject = hashMapCreate();
	
	return l_newData;
}

/**
 *
 */
t_JSONString JSONStringCreate() {
	t_JSONData * l_newData = (t_JSONString)JSONDataCreate();
	l_newData->m_type = STRING;
	l_newData->m_string = NULL;
	
	return l_newData;
}

/**
 *
 */
t_JSONInteger JSONIntegerCreate() {
	t_JSONData * l_newData = (t_JSONInteger)JSONDataCreate();
	l_newData->m_type = INTEGER;
	l_newData->m_integer = 0;
	
	return l_newData;
}

/**
 *
 */
void JSONArrayAppend(t_JSONArray a_array, t_JSONData * a_data) {
	linkedListPush(a_array->m_array, a_data);
}

/**
 *
 */
void JSONAddStringAttribute(t_JSONObject a_object, char * a_attributeName, char * a_attributeValue) {
	t_JSONData * l_newJSONData = JSONDataCreate();
	l_newJSONData->m_type = STRING;
	l_newJSONData->m_string = strdup(a_attributeValue);
	hashMapAddValue((t_hashMap *)a_object->m_jsonObject, a_attributeName, l_newJSONData);
}

/**
 *
 */
void JSONAddIntegerAttribute(t_JSONObject a_object, char * a_attributeName, int a_attributeValue){
	LOG_ERROR("JSONAddIntegerAttribute not yet implemented.");
}

/**
 *
 */
void JSONAddObjectAttribute(t_JSONObject a_object, char * a_attributeName, t_JSONObject a_attributeValue){
	LOG_ERROR("JSONAddObjectAttribute not yet implemented.");
}

/**
 *
 */
void JSONAddArrayAttribute(t_JSONObject a_object, char * a_attributeName, t_JSONArray a_array){
	LOG_DEBUG("Entering JSONAddArrayAttribute");
	hashMapAddValue((t_hashMap *)a_object->m_jsonObject, a_attributeName, a_array);
	LOG_DEBUG("Exiting JSONAddArrayAttribute");
}
/**
 *
 */
t_stringBuffer * dumpJSONData(t_JSONData * a_jsonData) {
	t_stringBuffer * l_jsonBuffer = stringBufferCreate();

	if ( a_jsonData->m_type == OBJECT ) {
		LOG_DEBUG("Dump JSON data OBJECT");
		stringBufferConcat(l_jsonBuffer, dumpJSONObject(a_jsonData));
	} else if ( a_jsonData->m_type == INTEGER ) {
		LOG_DEBUG("Dump JSON data INTEGER");
		stringBufferWrite(l_jsonBuffer, "'%d'", a_jsonData->m_integer);
	}  else if ( a_jsonData->m_type == STRING ) {
		LOG_DEBUG("Dump JSON data STRING");
		stringBufferWrite(l_jsonBuffer, "'%s'", a_jsonData->m_string);
	} else if ( a_jsonData->m_type == ARRAY ) {
		LOG_DEBUG("Dump JSON data ARRAY");
		stringBufferWrite(l_jsonBuffer, "[");
		t_linkedListElement * m_currentDataListElement = a_jsonData->m_array->m_head;
		while(m_currentDataListElement != NULL) {
			t_JSONData * l_currentJSONData = (t_JSONData *)(m_currentDataListElement->m_data);
			stringBufferConcat(l_jsonBuffer, dumpJSONData(l_currentJSONData));
			if ( m_currentDataListElement->m_next != NULL ) {
				stringBufferWrite(l_jsonBuffer, ",");
			}
			m_currentDataListElement = m_currentDataListElement->m_next;
		}
		stringBufferWrite(l_jsonBuffer, "]");
	}

	return l_jsonBuffer;
}
/**
 *
 */
t_stringBuffer * dumpJSONObject(t_JSONObject a_object) {
	LOG_DEBUG("Entering dumpJSONObject");
	t_linkedList * l_keyList = hashMapGetKeys(a_object->m_jsonObject);
	t_stringBuffer * l_jsonBuffer = stringBufferCreate();
	
	if (l_keyList != NULL ) {
			
		t_linkedListElement * l_keyListElement = l_keyList->m_head;
		
		stringBufferWrite(l_jsonBuffer, "{");
		
		// Walk through the list of attributes defined in the JSON object.
		while ( l_keyListElement != NULL ) {
			
			char * l_key = l_keyListElement->m_data;
			
			t_linkedList * l_valueList = hashMapGetValues(a_object->m_jsonObject, l_key);
			
			if (l_valueList != NULL ) {
				
				t_linkedListElement * l_currentValue = l_valueList->m_head;
				 
				// Walk through the list of values linked to the attribute 
				while ( l_currentValue != NULL ) {
					
					t_JSONData * l_JSONData = (t_JSONData *)(l_currentValue->m_data);
					stringBufferWrite(l_jsonBuffer, "'%s' : ", l_key);
					stringBufferConcat(l_jsonBuffer, dumpJSONData(l_JSONData));
					l_currentValue = l_currentValue->m_next;
					
				}
			} else {
				LOG_DEBUG("No value found for attribute : %s\n", l_keyListElement->m_data);
			}
			
			l_keyListElement = l_keyListElement->m_next; 
			
		}
		
		stringBufferWrite(l_jsonBuffer, "}");
		LOG_DEBUG("Exiting dumpJSONObject");
		
		return l_jsonBuffer;
	}
}
