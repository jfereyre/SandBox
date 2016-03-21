#ifndef __JSON_H__
#define __JSON_H__

#include <dataStructure/hash_map.h>
#include <string_buffer.h>

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

extern void JSONAddStringAttribute(t_JSONObject a_object, char * a_attributeName, char * a_attributeValue);
extern void JSONAddIntegerAttribute(t_JSONObject a_object, char * a_attributeName, int a_attributeValue);
extern void JSONAddObjectAttribute(t_JSONObject a_object, char * a_attributeName, t_JSONObject a_attributeValue);
extern void JSONAddArrayAttribute(t_JSONObject a_object, char * a_attributeName, t_JSONArray a_array);

extern void JSONArrayAppend(t_JSONArray a_array, t_JSONData * a_data);

extern t_JSONObject JSONObjectCreate();
extern t_JSONArray JSONArrayCreate();
extern t_JSONString JSONStringCreate();
extern t_JSONInteger JSONIntegerCreate();

extern t_stringBuffer * dumpJSONObject(t_JSONObject a_object);

#endif /* __JSON_H__ */
