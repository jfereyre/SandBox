# Project: Lib

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 -fpic
IFLAGS   = -I ../
OBJDIR   = .
OBJ      = $(OBJDIR)/json.o 
RM       = rm -f

.PHONY: all all-before all-after clean clean-custom

all: all-before $(OBJ) all-after

clean: clean-custom
	${RM} $(OBJ) 

$(OBJDIR)/%.o: %.c %.h
	$(CC) $(CFLAGS) -c -o $@ $< $(IFLAGS)
