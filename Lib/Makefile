# Project: Lib

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 -fpic
RM       = rm -f
SHAREDLIB= libsandbox.so
BINDIR   = .
OBJDIR   = obj
OBJ      = $(OBJDIR)/logger.o $(OBJDIR)/string_buffer.o
LINKOBJ  = $(OBJDIR)/*.o

SUBDIRS = dataStructure JSON

.PHONY: all all-before all-after clean clean-custom

define script
cd $(1); \
$(MAKE) -f Makefile OBJDIR=../$(OBJDIR)

endef

all: all-before subdirs $(SHAREDLIB) all-after

subdirs:
	$(foreach dir, $(SUBDIRS), $(call script,$(dir)))

clean: clean-custom
	${RM} $(OBJ) $(BIN) $(SHAREDLIB) $(OBJDIR)/*

$(OBJDIR)/%.o: %.c %.h
	$(CC) $(CFLAGS) -c -o $@ $<

$(SHAREDLIB): $(OBJ)
	$(CC) -shared -o $(BINDIR)/$(SHAREDLIB) $(OBJDIR)/*

