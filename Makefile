# Project: Lib

RM       = rm -f
SUBDIRS  = Lib FileList

.PHONY: all all-before all-after clean clean-custom

define script
cd $(1); \
$(MAKE) -f Makefile

endef

all: all-before subdirs all-after

subdirs:
	$(foreach dir, $(SUBDIRS), $(call script,$(dir)))

