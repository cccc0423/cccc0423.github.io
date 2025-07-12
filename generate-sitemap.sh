#!/bin/bash

SITE_URL="https://cccc0423.github.io"
DOCS_DIR="docs"
SITEMAP="$DOCS_DIR/sitemap.xml"

# Create sitemap header
cat > "$SITEMAP" << EOF
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
EOF

# Helper function to add URL
add_url() {
    local file="$1"
    local priority="$2"
    local changefreq="$3"
    
    # Convert file path to URL
    local url=$(echo "$file" | sed "s|$DOCS_DIR/||" | sed 's|index.html$||')
    
    # Get last modification date
    local lastmod=$(date -r "$file" +%Y-%m-%d 2>/dev/null || date +%Y-%m-%d)
    
    cat >> "$SITEMAP" << EOF
  <url>
    <loc>$SITE_URL/$url</loc>
    <lastmod>$lastmod</lastmod>
    <changefreq>$changefreq</changefreq>
    <priority>$priority</priority>
  </url>
EOF
}

# Main pages (highest priority)
if [ -f "$DOCS_DIR/index.html" ]; then
    add_url "$DOCS_DIR/index.html" "1.0" "weekly"
fi

if [ -f "$DOCS_DIR/weekly.html" ]; then
    add_url "$DOCS_DIR/weekly.html" "0.8" "weekly"
fi

if [ -f "$DOCS_DIR/about.html" ]; then
    add_url "$DOCS_DIR/about.html" "0.8" "monthly"
fi

# Blog posts
for file in "$DOCS_DIR"/posts/*.html; do
    [ -f "$file" ] && add_url "$file" "0.8" "monthly"
done

# Weekly posts
for file in "$DOCS_DIR"/weekly/*.html; do
    [ -f "$file" ] && add_url "$file" "0.6" "monthly"
done

# Close sitemap
echo '</urlset>' >> "$SITEMAP"

echo "Sitemap generated: $SITEMAP"