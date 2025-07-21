

// js/generate-weekly-list.js

const fs = require('fs');
const path = require('path');

// Define paths
const SRC_DIR = path.join(__dirname, '..', 'src');
const WEEKLY_DIR = path.join(SRC_DIR, 'weekly');
const WEEKLY_MD_PATH = path.join(SRC_DIR, 'weekly.md');

// --- Helper Functions ---

/**
 * Reads and processes weekly post files.
 * @returns {Array<Object>} A sorted list of post objects.
 */
function getWeeklyPosts() {
    try {
        const files = fs.readdirSync(WEEKLY_DIR);

        return files
            .filter(file => file.endsWith('.md'))
            .map(file => {
                const basename = path.basename(file, '.md');
                const datePart = basename.split('-')[0];
                
                // Format date for display and sorting
                const year = datePart.substring(0, 4);
                const month = datePart.substring(4, 6);
                const day = datePart.substring(6, 8);
                const formattedDate = `${year}-${month}-${day}`;

                return {
                    date: formattedDate,
                    filename: `${basename}.html`
                };
            })
            .sort((a, b) => b.date.localeCompare(a.date)); // Sort by date descending

    } catch (error) {
        console.error('Error reading weekly posts:', error);
        return [];
    }
}

/**
 * Generates the Markdown list of posts.
 * @param {Array<Object>} posts - The list of post objects.
 * @returns {string} The Markdown-formatted list.
 */
function generateMarkdownList(posts) {
    return posts
        .map(post => `- [${post.date}](weekly/${post.filename})`)
        .join('\n');
}

/**
 * Updates the weekly.md file with the new list.
 * @param {string} newList - The new Markdown list.
 */
function updateWeeklyMarkdown(newList) {
    try {
        let content = fs.readFileSync(WEEKLY_MD_PATH, 'utf8');

        // Regex to find either the placeholder or the old list
        const placeholderRegex = /<!-- WEEKLY_POSTS_PLACEHOLDER -->/;
        const listRegex = /(- \[0-9]{4}-[0-9]{2}-[0-9]{2}\]\(weekly\/[0-9]{8}-weekly-writing\\.html\)\n?)+/;

        if (listRegex.test(content)) {
            // Replace the existing list
            content = content.replace(listRegex, `${newList}\n`);
        } else if (placeholderRegex.test(content)) {
            // Replace the placeholder
            content = content.replace(placeholderRegex, newList);
        } else {
            console.warn('Could not find a placeholder or an existing list to replace.');
            return; // Exit if no target is found
        }

        fs.writeFileSync(WEEKLY_MD_PATH, content, 'utf8');
        console.log('Successfully updated src/weekly.md');

    } catch (error) {
        console.error('Error updating weekly.md:', error);
    }
}

// --- Main Execution ---

function main() {
    const posts = getWeeklyPosts();
    if (posts.length > 0) {
        const markdownList = generateMarkdownList(posts);
        updateWeeklyMarkdown(markdownList);
    }
}

main();
