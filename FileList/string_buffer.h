#ifndef __STRING_BUFFER_H__
#define __STRING_BUFFER_H__

#define DEFAULT_STRING_BUFFER_SIZE 256

#include <stdlib.h>
#include <stdarg.h>
typedef struct s_stringBuffer {
	size_t m_size;
	size_t m_usedSize;
	char * m_string;
} t_stringBuffer; 

t_stringBuffer * stringBufferCreate();
void stringBufferFree();
void stringBufferWrite(t_stringBuffer * a_stringBuffer, char * a_fmt, ...);
char * stringBufferGetString(t_stringBuffer * a_stringBuffer);
#endif /* __STRING_BUFFER_H__ */
