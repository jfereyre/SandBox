# Project: FileList


RM       = rm -f
SUBDIRS  = src
OBJDIR   = $(shell pwd)/obj
BINDIR   = $(shell pwd)/bin

.PHONY: subdirs $(SUBDIRS)

subdirs: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ OBJDIR=$(OBJDIR) BINDIR=$(BINDIR)

