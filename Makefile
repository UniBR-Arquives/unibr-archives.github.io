TSCC = tsc
ARQUIVE_TS = src/dist/script.ts
OUTDIR = src/js/
all: build
build:
	$(TSCC) $(ARQUIVE_TS) --outDir $(OUTDIR)
.PHONY: all build