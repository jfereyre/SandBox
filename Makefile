# Project: Lib

RM       = rm -f
SUBDIRS  = Lib FileList
OBJDIR   = $(shell pwd)/obj
BINDIR   = $(shell pwd)/bin

.PHONY: subdirs $(SUBDIRS) clean

subdirs: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ OBJDIR=$(OBJDIR) BINDIR=$(BINDIR)

FileList : Lib

clean:
	$(RM) $(OBJDIR)/* $(BINDIR)/*
