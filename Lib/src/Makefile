# Project: Lib

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 
IFLAGS   = -I./dataStructure -I./JSON
RM       = rm -f
SHAREDLIB= libsandbox.so
OBJ      = $(OBJDIR)/logger.o $(OBJDIR)/string_buffer.o
LINKOBJ  = $(OBJDIR)/*.o

SUBDIRS = dataStructure JSON

.PHONY: all clean subdirs $(SUBDIRS)

all: $(OBJ) subdirs $(SHAREDLIB) 

subdirs: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ OBJDIR=$(OBJDIR) BINDIR=$(BINDIR)

clean: clean-custom
	${RM} $(OBJ) $(BIN) $(SHAREDLIB) $(OBJDIR)/*

$(OBJDIR)/%.o: %.c %.h
	$(CC) -c -o $@ $< $(CFLAGS) $(IFLAGS)

$(SHAREDLIB): $(OBJ)
	$(CC) -shared -o $(BINDIR)/$(SHAREDLIB) $(OBJDIR)/*

