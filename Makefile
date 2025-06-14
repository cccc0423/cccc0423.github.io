# Variables
YEAR := $(shell date +%Y)
DOCS_DIR := docs
SRC_DIR := src

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

.PHONY: all clean dirs assets

all: dirs $(MAIN_PAGES) $(WEEKLY_HTML) $(POSTS_HTML) assets

dirs:
	mkdir -p $(DIRS)

# Main pages
$(DOCS_DIR)/index.html: $(SRC_DIR)/index.md templates/index.html | dirs
	pandoc $< -o $@ --template=templates/index.html --standalone --variable=year:$(YEAR) --variable=is_home:true --mathjax

$(DOCS_DIR)/weekly.html: $(SRC_DIR)/weekly.md templates/index.html | dirs
	pandoc $< -o $@ --template=templates/index.html --standalone --variable=year:$(YEAR) --variable=is_weekly:true --mathjax

$(DOCS_DIR)/about.html: $(SRC_DIR)/about.md templates/index.html | dirs
	pandoc $< -o $@ --template=templates/index.html --standalone --variable=year:$(YEAR) --variable=is_about:true --mathjax

# Weekly posts
$(DOCS_DIR)/weekly/%.html: $(SRC_DIR)/weekly/%.md templates/post.html | dirs
	pandoc $< -o $@ --template=templates/post.html --standalone --variable=year:$(YEAR) --variable=is_weekly:true --toc --mathjax

# Posts
$(DOCS_DIR)/posts/%.html: $(SRC_DIR)/posts/%.md templates/post.html | dirs
	pandoc $< -o $@ --template=templates/post.html --standalone --variable=year:$(YEAR) --variable=is_weekly:true --toc --mathjax

# Copy static assets
assets: | dirs
	cp -r css/* $(DOCS_DIR)/css/
	cp -r js/* $(DOCS_DIR)/js/
	[ ! -d "images" ] || cp -r images/* $(DOCS_DIR)/images/
	@echo "Done!"

clean:
	rm -rf $(DOCS_DIR)