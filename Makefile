# Variables
YEAR := $(shell date +%Y)
DOCS_DIR := docs
SRC_DIR := src
TEMPLATES_DIR := templates
CSS_DIR := css
JS_DIR := js
IMAGES_DIR := images

# Directories
DIRS := $(DOCS_DIR)/weekly $(DOCS_DIR)/css $(DOCS_DIR)/js $(DOCS_DIR)/images $(DOCS_DIR)/posts

# Source files
WEEKLY_SRC := $(wildcard $(SRC_DIR)/weekly/*.md)
POSTS_SRC := $(wildcard $(SRC_DIR)/posts/*.md)

# Target files
WEEKLY_HTML := $(patsubst $(SRC_DIR)/weekly/%.md,$(DOCS_DIR)/weekly/%.html,$(WEEKLY_SRC))
POSTS_HTML := $(patsubst $(SRC_DIR)/posts/%.md,$(DOCS_DIR)/posts/%.html,$(POSTS_SRC))

# Main pages
MAIN_PAGES := $(DOCS_DIR)/index.html $(DOCS_DIR)/weekly.html $(DOCS_DIR)/about.html

# Templates
INDEX_TEMPLATE := $(TEMPLATES_DIR)/index.html
POST_TEMPLATE := $(TEMPLATES_DIR)/post.html

# Asset tracking
CSS_FILES := $(wildcard $(CSS_DIR)/*)
JS_FILES := $(wildcard $(JS_DIR)/*)
IMAGE_FILES := $(wildcard $(IMAGES_DIR)/*)

.PHONY: all clean dirs assets sitemap serve help

all: dirs $(MAIN_PAGES) $(WEEKLY_HTML) $(POSTS_HTML) assets sitemap

dirs:
	mkdir -p $(DIRS)

# Main pages with proper dependencies
$(DOCS_DIR)/index.html: $(SRC_DIR)/index.md $(INDEX_TEMPLATE) | dirs
	@echo "Building index page..."
	pandoc $< -o $@ --template=$(INDEX_TEMPLATE) --standalone --variable=year:$(YEAR) --variable=is_home:true --mathjax

# This new rule ensures src/weekly.md is updated ONLY if a new weekly post is added,
# or the generator script itself changes.
$(SRC_DIR)/weekly.md: $(WEEKLY_SRC) js/generate-weekly-list.js
	@echo "Updating weekly post list..."
	node js/generate-weekly-list.js

# The weekly.html rule is now simpler and only handles the pandoc conversion.
# It depends on the updated src/weekly.md.
$(DOCS_DIR)/weekly.html: $(SRC_DIR)/weekly.md $(INDEX_TEMPLATE) | dirs
	@echo "Building weekly listing page..."
	pandoc $< -o $@ --template=$(INDEX_TEMPLATE) --standalone --variable=year:$(YEAR) --variable=is_weekly:true --mathjax

$(DOCS_DIR)/about.html: $(SRC_DIR)/about.md $(INDEX_TEMPLATE) | dirs
	@echo "Building about page..."
	pandoc $< -o $@ --template=$(INDEX_TEMPLATE) --standalone --variable=year:$(YEAR) --variable=is_about:true --mathjax

# Weekly posts with proper dependencies
$(DOCS_DIR)/weekly/%.html: $(SRC_DIR)/weekly/%.md $(POST_TEMPLATE) | dirs
	@echo "Building weekly post: $<"
	pandoc $< -o $@ --defaults=pandoc-defaults.yaml --template=$(POST_TEMPLATE) --variable=year:$(YEAR) --variable=is_weekly:true --toc --number-sections=$(shell grep -q "number-sections: true" $< && echo "true" || echo "false")

# Posts with corrected variables
$(DOCS_DIR)/posts/%.html: $(SRC_DIR)/posts/%.md $(POST_TEMPLATE) | dirs
	@echo "Building post: $<"
	pandoc $< -o $@ --defaults=pandoc-defaults.yaml --template=$(POST_TEMPLATE) --variable=year:$(YEAR) --variable=is_post:true --toc --highlight-style pygments --number-sections=$(shell grep -q "number-sections: true" $< && echo "true" || echo "false")

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

# Generate sitemap
sitemap: $(DOCS_DIR)/sitemap.xml

$(DOCS_DIR)/sitemap.xml: $(MAIN_PAGES) $(WEEKLY_HTML) $(POSTS_HTML)
	@echo "Generating sitemap..."
	./generate-sitemap.sh

# Help target
help:
	@echo "Available targets:"
	@echo "  all     - Build everything (default)"
	@echo "  clean   - Remove generated files"
	@echo "  assets  - Copy static assets only"
	@echo "  sitemap - Generate sitemap only"
	@echo "  serve   - Start development server"
	@echo "  help    - Show this help"

clean:
	@echo "Cleaning generated files..."
	rm -rf $(DOCS_DIR)
