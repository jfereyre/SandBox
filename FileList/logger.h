#ifndef __LOGGER_H__
#define __LOGGER_H__

typedef enum e_logLevel {
	LOG_LEVEL_ERROR,
	LOG_LEVEL_WARNING,
	LOG_LEVEL_INFO,
	LOG_LEVEL_DEBUG,
	NB_LOGLEVEL
} t_logLevel;


void doLog(t_logLevel a_level, char * a_file, int a_line, char * a_fmt, ...);

#define MAX_LOG_LEVEL LOG_LEVEL_ERROR

#define LOG_ERROR(...) 		doLog(LOG_LEVEL_ERROR, __FILE__, __LINE__, __VA_ARGS__)
#define LOG_WARNING(...) 	doLog(LOG_LEVEL_WARNING, __FILE__, __LINE__, __VA_ARGS__)
#define LOG_INFO(...) 		doLog(LOG_LEVEL_INFO, __FILE__, __LINE__, __VA_ARGS__)
#define LOG_DEBUG(...) 		doLog(LOG_LEVEL_DEBUG, __FILE__, __LINE__, __VA_ARGS__)

#endif /* __LOGGER_H__ */
