# Project: Lib
RM       = rm -f
SUBDIRS  = src

.PHONY: subdirs $(SUBDIRS)

subdirs: $(SUBDIRS)

$(SUBDIRS):
	$(MAKE) -C $@ OBJDIR=$(OBJDIR) BINDIR=$(BINDIR)
