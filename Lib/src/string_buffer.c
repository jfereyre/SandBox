#include "string_buffer.h"
#include "logger.h"
#include <stdio.h>
#include <string.h>


/**
 *
 **/
t_stringBuffer * stringBufferCreate() {
	t_stringBuffer * l_newStringBuffer = (t_stringBuffer *)malloc(sizeof(t_stringBuffer));
	
	if ( l_newStringBuffer != NULL ) {
		l_newStringBuffer->m_string = (char *)malloc(sizeof(char) * DEFAULT_STRING_BUFFER_SIZE);
		l_newStringBuffer->m_usedSize = 0;

		if ( l_newStringBuffer->m_string != NULL ) {
			l_newStringBuffer->m_size = DEFAULT_STRING_BUFFER_SIZE;
		} else {
			l_newStringBuffer->m_size = 0;
			LOG_WARNING("Fail allocating default buffer memory for new string buffer.");
		}
		memset(l_newStringBuffer->m_string, 0x00, l_newStringBuffer->m_size);
	} else {
		LOG_ERROR("Fail allocating memory for the new string buffer structure.");
	}
	
	return l_newStringBuffer;
}

void stringBufferCheckSizeAndWrite(t_stringBuffer * a_stringBuffer, char * a_newData, size_t a_additionalSize) {
	if ( a_additionalSize + a_stringBuffer->m_usedSize > a_stringBuffer->m_size ) {
		int l_nbExtension = ( a_additionalSize / DEFAULT_STRING_BUFFER_SIZE );
		int l_notComplete = ( a_additionalSize >=DEFAULT_STRING_BUFFER_SIZE ) && (( a_additionalSize % DEFAULT_STRING_BUFFER_SIZE ) != 0);
		l_nbExtension = (l_nbExtension == 0 ? 1 : l_nbExtension + l_notComplete);
		int l_biggerStringBufferSize = a_stringBuffer->m_size + l_nbExtension * DEFAULT_STRING_BUFFER_SIZE;
		
		LOG_DEBUG("Increasing buffer size from %d to %d ", a_stringBuffer->m_size, l_biggerStringBufferSize);
		
		char * l_biggerString = (char *) malloc(sizeof(char) * l_biggerStringBufferSize);
		memcpy(l_biggerString, a_stringBuffer->m_string, a_stringBuffer->m_usedSize);
		
		free(a_stringBuffer->m_string);
		a_stringBuffer->m_string = l_biggerString;
		a_stringBuffer->m_size = l_biggerStringBufferSize;
	}
		 
	memcpy(a_stringBuffer->m_string + a_stringBuffer->m_usedSize, a_newData, a_additionalSize);
	a_stringBuffer->m_usedSize += a_additionalSize;
	if ( a_stringBuffer->m_usedSize > a_stringBuffer->m_size )
		LOG_ERROR("used size : %d - size : %d \n", a_stringBuffer->m_usedSize, a_stringBuffer->m_size);
}

/**
 *
 **/
void stringBufferConcat(t_stringBuffer * a_stringBuffer, t_stringBuffer * a_secondstringBuffer) {
	stringBufferCheckSizeAndWrite(a_stringBuffer, a_secondstringBuffer->m_string, a_secondstringBuffer->m_usedSize);
}

/**
 *
 **/
void stringBufferWrite(t_stringBuffer * a_stringBuffer, char * a_fmt, ...) {
	
	va_list l_varlist;
	int n;
	char *s;
	int c;
	float f;
	char a_numberBuffer[30];

	va_start(l_varlist, a_fmt);
	while (*a_fmt != '\0') {
		if ( *a_fmt == '%' ) {
			switch (*++a_fmt) {
				case '%' : break;
				case 'c' : /* affichage d'un caractère */ 
					c = va_arg(l_varlist, int);
					snprintf(a_numberBuffer, 30, "%c", c);
					stringBufferCheckSizeAndWrite(a_stringBuffer, a_numberBuffer, strlen(a_numberBuffer));
					break;
        		case 'd' : /* affichage d'un entier */ 
					n = va_arg(l_varlist, int);
					snprintf(a_numberBuffer, 30, "%d", n); 
					stringBufferCheckSizeAndWrite(a_stringBuffer, a_numberBuffer, strlen(a_numberBuffer));
					break;
        		case 'f' : /* affichage d'un float */ 
					f = va_arg(l_varlist, double);    /* !!!!! */					
					snprintf(a_numberBuffer, 30, "%f", f); 
					stringBufferCheckSizeAndWrite(a_stringBuffer, a_numberBuffer, strlen(a_numberBuffer));
					break;
				case 's' : /* affichage d'une chaîne */ 
					s = va_arg(l_varlist, char *);
					stringBufferCheckSizeAndWrite(a_stringBuffer, s, strlen(s));
					break;
			} /* end switch */
		} else {
      		stringBufferCheckSizeAndWrite(a_stringBuffer, a_fmt, 1);
      	}
    	a_fmt++;
  	}   
	va_end(l_varlist);
}

/**
 *
 **/
char * stringBufferGetString(t_stringBuffer * a_stringBuffer) {
	return strdup(a_stringBuffer->m_string);
}

/**
 *
 **/
void stringBufferFree(t_stringBuffer * a_stringBuffer) {
	free(a_stringBuffer->m_string);
	free(a_stringBuffer);
	
}
