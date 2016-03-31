# Project: Lib

CPP      = g++ -D__DEBUG__
CC       = gcc -D__DEBUG__
CXXFLAGS = $(CXXINCS) -g3
CFLAGS   = $(INCS) -g3 
IFLAGS   = 
OBJ      = $(OBJDIR)/linked_list.o $(OBJDIR)/hash_map.o
RM       = rm -f

.PHONY: all clean 

all: $(OBJ) 

clean: clean-custom
	${RM} $(OBJ) 

$(OBJDIR)/%.o: %.c %.h
	$(CC) -c -o $@ $< $(IFLAGS) $(CFLAGS) 
