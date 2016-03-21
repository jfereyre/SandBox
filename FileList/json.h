#ifndef __JSON_H__
#define __JSON_H__

#include "hash_map.h"
#include "string_buffer.h"

typedef enum e_JSONValueType { STRING, INTEGER, OBJECT, ARRAY } t_JSONValueType;

typedef struct s_JSONData {
	t_JSONValueType m_type;
	union {
		int m_integer;
		char * m_string;
		t_hashMap * m_jsonObject;
		t_linkedList *  m_array;
	};
} t_JSONData ;

typedef t_JSONData * t_JSONObject;
typedef t_JSONData * t_JSONString;
typedef t_JSONData * t_JSONInteger;
typedef t_JSONData * t_JSONArray;

void JSONAddStringAttribute(t_JSONObject a_object, char * a_attributeName, char * a_attributeValue);
void JSONAddIntegerAttribute(t_JSONObject a_object, char * a_attributeName, int a_attributeValue);
void JSONAddObjectAttribute(t_JSONObject a_object, char * a_attributeName, t_JSONObject a_attributeValue);
void JSONAddArrayAttribute(t_JSONObject a_object, char * a_attributeName, t_JSONArray a_array);

void JSONArrayAppend(t_JSONArray a_array, t_JSONData * a_data);

t_JSONObject JSONObjectCreate();
t_JSONArray JSONArrayCreate();
t_JSONString JSONStringCreate();
t_JSONInteger JSONIntegerCreate();

t_stringBuffer * dumpJSONObject(t_JSONObject a_object);

#endif /* __JSON_H__ */
