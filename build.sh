#!/bin/bash

mkdir -p docs/weekly
mkdir -p docs/css
mkdir -p docs/js
mkdir -p docs/images

# Generate index and about pages
pandoc src/index.md -o docs/index.html --template=templates/index.html --standalone --variable=year:$(date +%Y) --variable=is_home:true
pandoc src/weekly.md -o docs/weekly.html --template=templates/index.html --standalone --variable=year:$(date +%Y) --variable=is_weekly:true
pandoc src/about.md -o docs/about.html --template=templates/index.html --standalone --variable=year:$(date +%Y) --variable=is_about:true

# Generate weekly posts
for file in src/weekly/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .md)
        pandoc "$file" -o "docs/weekly/$filename.html" --template=templates/post.html --standalone --variable=year:$(date +%Y) --variable=is_weekly:true --toc
    fi
done

for file in src/posts/*.md; do
    if [ -f "$file" ]; then
        filename=$(basename "$file" .md)
        pandoc "$file" \
        -f markdown+tex_math_dollars+tex_math_single_backslash+tex_math_double_backslash \
        -o "docs/posts/$filename.html" --template=templates/post.html --standalone --variable=year:$(date +%Y) --toc --mathjax
    fi
done

# Copy static assets
cp -r css/* docs/css/
cp -r js/* docs/js/
if [ -d "images" ]; then
    cp -r images/* docs/images/
fi

echo "網站生成完成！"