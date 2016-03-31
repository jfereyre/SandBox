# Project: FileList

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 
LFLAGS	 = -L$(BINDIR)
RM       = rm -f
OBJ      = $(OBJDIR)/directory_explorer.o $(OBJDIR)/filelist.o
EXTOBJ 	 = $(OBJDIR)/hash_map.o $(OBJDIR)/linked_list.o $(OBJDIR)/string_buffer.o $(OBJDIR)/json.o $(OBJDIR)/logger.o
BIN	 = $(BINDIR)/FileList
LINKOBJ  = $(OBJDIR)/*.o

.PHONY: all clean 

all: $(OBJ) $(BIN)

subdirs: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ OBJDIR=$(OBJDIR) BINDIR=$(BINDIR)

$(OBJDIR)/%.o: %.c %.h
	$(CC) -c -o $@ $< $(CFLAGS) $(IFLAGS)

$(BIN): $(OBJ)
	$(CC) $(CFLAGS) $(IFLAGS) $(OBJ) $(EXTOBJ) -o $@ 

