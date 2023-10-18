import path from 'path';
import fs from 'fs';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

// get directory of files to parse
const postsDirectory = path.join(process.cwd(), 'posts');

export function getSortedPostsData() {
    // get file names under posts directory
    const filenames = fs.readdirSync(postsDirectory);
    const allPostsData = filenames.map(filename => {
        // remove '.md' from filenames to get id for rendering
        const id = filename.replace(/\.md$/, '');
        // read markdown file as string
        const fullPath = path.join(postsDirectory, filename);
        const fileContents = fs.readFileSync(fullPath, 'utf-8');

        // use gray-matter to parse the post metadata section
        const matterResult = matter(fileContents);

        // combine data with the id
        return {
            id,
            ...matterResult.data
        };
    });
    return allPostsData.sort((a, b) => {
        if (a.date < b.date) {
            return -1
        } else if (a.date === b.date) {
            return 0;
        }
        return 1;
    })
}

export function getAllPostsIds() {
    const filenames = fs.readdirSync(postsDirectory);
    return filenames.map((filename) => {
        return {
            params: {
                id: filename.replace(/\.md$/, '')
            },
        };
    });
}

export async function getPostData(id) {
    const fileFullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fileFullPath, 'utf-8');
    // parse with gray-matter
    const matterResult = matter(fileContents);

    // use remark to convert markdown to HTML string
    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHTML = processedContent.toString();

    return {
        id,
        contentHTML,
        ...matterResult.data,
    }
}