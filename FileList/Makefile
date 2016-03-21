# Project: FileList
# Makefile created by Dev-C++ 5.11

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
OBJ      = filelist.o linked_list.o json.o hash_map.o logger.o string_buffer.o directory_explorer.o
LINKOBJ  = filelist.o linked_list.o json.o hash_map.o logger.o string_buffer.o directory_explorer.o
BIN      = FileList
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3
RM       = rm -f

.PHONY: all all-before all-after clean clean-custom

all: all-before $(BIN) all-after

clean: clean-custom
	${RM} $(OBJ) $(BIN)

$(BIN): $(OBJ)
	$(CC) $(LINKOBJ) -o $(BIN) $(LIBS)

filelist.o: filelist.c
	$(CC) -c filelist.c -o filelist.o $(CFLAGS)

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

directory_explorer.o: directory_explorer.c
	$(CC) -c directory_explorer.c -o directory_explorer.o $(CFLAGS)
