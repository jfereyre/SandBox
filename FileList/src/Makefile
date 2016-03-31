# Project: FileList

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 
IFLAGS   = -I./dataStructure -I./JSON
LFLAGS	 = -L$(BINDIR) 
RM       = rm -f
SHAREDLIB= libsandbox.so
OBJ      = $(OBJDIR)/directory_explorer.o $(OBJDIR)/filelist.o
BIN	 = $(BINDIR)/FileList
LINKOBJ  = $(OBJDIR)/*.o

.PHONY: all clean 

all: $(OBJ) 

subdirs: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ OBJDIR=$(OBJDIR) BINDIR=$(BINDIR)

clean: clean-custom
	${RM} $(OBJ) $(BIN) $(SHAREDLIB) $(OBJDIR)/*

$(OBJDIR)/%.o: %.c %.h
	$(CC) -c -o $@ $< $(CFLAGS) $(IFLAGS)

$(BIN): $(OBJ)
	$(CC) $(OBJ) -o $@ $(CFLAGS) $(IFLAGS) $(LFLAGS)

