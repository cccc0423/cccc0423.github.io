# Variables
BASE_URL := https://cccc0423.github.io
YEAR := $(shell date +%Y)
DOCS_DIR := docs
SRC_DIR := src
TEMPLATES_DIR := templates
CSS_DIR := css
JS_DIR := js
IMAGES_DIR := images

# Directories
DIRS := $(DOCS_DIR)/archive $(DOCS_DIR)/css $(DOCS_DIR)/js $(DOCS_DIR)/images $(DOCS_DIR)/posts

# Source files
ARCHIVE_SRC := $(wildcard $(SRC_DIR)/archive/*.md)
POSTS_SRC := $(wildcard $(SRC_DIR)/posts/*.md)

# Target files
ARCHIVE_HTML := $(patsubst $(SRC_DIR)/archive/%.md,$(DOCS_DIR)/archive/%.html,$(ARCHIVE_SRC))
POSTS_HTML := $(patsubst $(SRC_DIR)/posts/%.md,$(DOCS_DIR)/posts/%.html,$(POSTS_SRC))

# Main pages
MAIN_PAGES := $(DOCS_DIR)/index.html $(DOCS_DIR)/archive.html

# Templates
INDEX_TEMPLATE := $(TEMPLATES_DIR)/index.html
POST_TEMPLATE := $(TEMPLATES_DIR)/post.html

# Asset tracking
CSS_FILES := $(wildcard $(CSS_DIR)/*)
JS_FILES := $(wildcard $(JS_DIR)/*)
IMAGE_FILES := $(wildcard $(IMAGES_DIR)/*)

.PHONY: all clean dirs assets serve help

all: dirs $(MAIN_PAGES) $(ARCHIVE_HTML) $(POSTS_HTML) assets $(DOCS_DIR)/robots.txt

dirs:
	mkdir -p $(DIRS)

# Main pages with proper dependencies
$(DOCS_DIR)/index.html: $(SRC_DIR)/index.md $(INDEX_TEMPLATE) | dirs
	@echo "Building index page..."
	pandoc $< -o $@ --template=$(INDEX_TEMPLATE) --standalone --variable=year:$(YEAR) --variable=is_home:true --variable=canonical_url:$(BASE_URL)/index.html --mathjax

$(DOCS_DIR)/archive.html: $(SRC_DIR)/archive.md $(INDEX_TEMPLATE) | dirs
	@echo "Building archive page..."
	pandoc $< -o $@ --template=$(INDEX_TEMPLATE) --standalone --variable=year:$(YEAR) --variable=is_archive:true --variable=canonical_url:$(BASE_URL)/archive.html --mathjax

# Archive posts with proper dependencies
$(DOCS_DIR)/archive/%.html: $(SRC_DIR)/archive/%.md $(POST_TEMPLATE) | dirs
	@echo "Building archive post: $<"
	pandoc $< -o $@ --defaults=pandoc-defaults.yaml --template=$(POST_TEMPLATE) --variable=year:$(YEAR) --variable=is_archive_post:true --variable=canonical_url:$(BASE_URL)/archive/$(notdir $(basename $<)).html --toc --highlight-style pygments --number-sections=$(shell grep -q "number-sections: true" $< && echo "true" || echo "false")

# Posts with corrected variables
$(DOCS_DIR)/posts/%.html: $(SRC_DIR)/posts/%.md $(POST_TEMPLATE) | dirs
	@echo "Building post: $<"
	pandoc $< -o $@ --defaults=pandoc-defaults.yaml --template=$(POST_TEMPLATE) --variable=year:$(YEAR) --variable=is_post:true --variable=canonical_url:$(BASE_URL)/posts/$(notdir $(basename $<)).html --toc --highlight-style pygments --number-sections=$(shell grep -q "number-sections: true" $< && echo "true" || echo "false")

# Copy static assets with better dependency tracking
assets: $(DOCS_DIR)/css/.updated $(DOCS_DIR)/js/.updated $(DOCS_DIR)/images/.updated
	@echo "Assets updated!"

$(DOCS_DIR)/css/.updated: $(CSS_FILES) | dirs
	@echo "Copying CSS files..."
	cp -r $(CSS_DIR)/* $(DOCS_DIR)/css/
	@touch $@

$(DOCS_DIR)/js/.updated: $(JS_FILES) | dirs
	@echo "Copying JavaScript files..."
	cp -r $(JS_DIR)/* $(DOCS_DIR)/js/
	@touch $@

$(DOCS_DIR)/images/.updated: $(IMAGE_FILES) | dirs
	@echo "Copying image files..."
	[ ! -d "$(IMAGES_DIR)" ] || cp -r $(IMAGES_DIR)/* $(DOCS_DIR)/images/
	@touch $@

# Generate robots.txt
$(DOCS_DIR)/robots.txt: | dirs
	@echo "Generating robots.txt..."
	@echo "User-agent: *" > $@
	@echo "Allow: /" >> $@

# Help target
help:
	@echo "Available targets:"
	@echo "  all     - Build everything (default)"
	@echo "  clean   - Remove generated files"
	@echo "  assets  - Copy static assets only"
	@echo "  serve   - Start development server"
	@echo "  help    - Show this help"

clean:
	@echo "Cleaning generated files..."
	rm -rf $(DOCS_DIR)
