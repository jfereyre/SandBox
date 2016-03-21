# Project: Lib

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
OBJ      = linked_list.o json.o hash_map.o logger.o string_buffer.o 
LINKOBJ  = linked_list.o json.o hash_map.o logger.o string_buffer.o
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 -fpic
RM       = rm -f
SHAREDLIB= sandbox.so

.PHONY: all all-before all-after clean clean-custom

all: all-before $(OBJ) $(SHAREDLIB) all-after

clean: clean-custom
	${RM} $(OBJ) $(BIN) lib$(SHAREDLIB)*

linked_list.o: linked_list.c
	$(CC) -c linked_list.c -o linked_list.o $(CFLAGS)

json.o: json.c
	$(CC) -c json.c -o json.o $(CFLAGS)

hash_map.o: hash_map.c
	$(CC) -c hash_map.c -o hash_map.o $(CFLAGS)

logger.o: logger.c
	$(CC) -c logger.c -o logger.o $(CFLAGS)

string_buffer.o: string_buffer.c
	$(CC) -c string_buffer.c -o string_buffer.o $(CFLAGS)

sandbox.so : $(OBJ)
	$(CC) -shared -o lib$(SHAREDLIB) $(OBJ)

