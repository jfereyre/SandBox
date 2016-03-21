#include "logger.h"
#include <stdio.h>
#include <stdarg.h>

char * g_logLevelStrings[NB_LOGLEVEL] = {"ERROR", "WARNING", "INFO", "DEBUG"};

void doLog(t_logLevel a_level, char * a_file, int a_line, char * a_fmt, ...) {
	if ( a_level <= MAX_LOG_LEVEL ) {
		va_list l_argList;
		printf( "[%s] %s:%d -> ", g_logLevelStrings[a_level], a_file, a_line );
		va_start( l_argList, a_fmt );
		vprintf( a_fmt, l_argList );
		va_end( l_argList );
		printf( "\n");
	}
}

