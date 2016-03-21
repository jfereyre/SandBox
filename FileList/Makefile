# Project: FileList
# Makefile created by Dev-C++ 5.11

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
IFLAGS	 = -I ../Lib
LFLAGS	 = -L ../Lib -lsandbox
OBJ      = filelist.o directory_explorer.o
LINKOBJ  = filelist.o directory_explorer.o
BIN      = FileList
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3
RM       = rm -f

.PHONY: all all-before all-after clean clean-custom

all: all-before $(BIN) all-after

clean: clean-custom
	${RM} $(OBJ) $(BIN)

$(BIN): $(OBJ)
	$(CC) $(LINKOBJ) -o $(BIN) $(LFLAGS)

filelist.o: filelist.c
	$(CC) $(IFLAGS) $(LFLAGS) -c filelist.c -o filelist.o $(CFLAGS)

directory_explorer.o: directory_explorer.c
	$(CC) $(IFLAGS) $(LFLAGS) -c directory_explorer.c -o directory_explorer.o $(CFLAGS)
