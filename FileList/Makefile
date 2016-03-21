# Project: FileList

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
IFLAGS   = -I ../../Lib/src
LFLAGS   = -L ../../Lib/bin -lsandbox
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 
RM       = rm -f
OBJDIR   = obj
OBJ      = $(OBJDIR)/directory_explorer.o $(OBJDIR)/filelist.o
LINKOBJ  = $(OBJDIR)/*.o
BINDIR	 = ./
BIN	 = $(BINDIR)/FileList

SUBDIRS = 

.PHONY: all all-before all-after clean clean-custom

define script
cd $(1); \
$(MAKE) -f Makefile OBJDIR=../$(OBJDIR)

endef

all: all-before subdirs $(BIN) all-after

subdirs:
	$(foreach dir, $(SUBDIRS), $(call script,$(dir)))

clean: clean-custom
	${RM} $(OBJ) $(BIN) $(SHAREDLIB) $(OBJDIR)/*

$(BIN): $(OBJ)
	$(CC) $(LINKOBJ) -o $(BIN) $(LFLAGS) $(IFLAGS)

$(OBJDIR)/%.o: %.c %.h
	$(CC) $(CFLAGS) -c -o $@ $< $(IFLAGS)
