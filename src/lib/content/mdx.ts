/**
 * MDX Processing Utilities
 * Handles parsing and processing of MDX content for case studies
 */

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { compileMDX } from 'next-mdx-remote/rsc';
import { codeToHtml } from 'shiki';

const CONTENT_DIR = path.join(process.cwd(), 'src/content');

/**
 * Get all MDX files from a specific directory
 */
export async function getMDXFiles(dir: 'blog' | 'case-studies'): Promise<string[]> {
  const contentPath = path.join(CONTENT_DIR, dir);

  if (!fs.existsSync(contentPath)) {
    return [];
  }

  const files = fs.readdirSync(contentPath);
  return files.filter((file) => file.endsWith('.mdx'));
}

/**
 * Parse MDX file and extract frontmatter
 */
export async function parseMDXFile<T = Record<string, unknown>>(
  dir: 'blog' | 'case-studies',
  filename: string
) {
  const filePath = path.join(CONTENT_DIR, dir, filename);
  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);

  return {
    frontmatter: data as T,
    content,
    slug: filename.replace('.mdx', ''),
  };
}

/**
 * Get all blog posts with metadata
 */
export async function getAllBlogPosts() {
  const files = await getMDXFiles('blog');

  const posts = await Promise.all(
    files.map(async (file) => {
      const { frontmatter, content, slug } = await parseMDXFile('blog', file);
      const stats = readingTime(content);

      return {
        slug,
        readingTime: Math.ceil(stats.minutes),
        ...frontmatter,
      };
    })
  );

  return posts.sort((a, b) => {
    const dateA = new Date(a.publishedAt as string);
    const dateB = new Date(b.publishedAt as string);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single blog post by slug
 */
export async function getBlogPost(slug: string) {
  const { frontmatter, content } = await parseMDXFile('blog', `${slug}.mdx`);
  const stats = readingTime(content);

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
    components: {
      // Custom MDX components can be added here
    },
  });

  return {
    slug,
    frontmatter,
    content: compiledContent,
    readingTime: Math.ceil(stats.minutes),
  };
}

/**
 * Get all case studies with metadata
 */
export async function getAllCaseStudies() {
  const files = await getMDXFiles('case-studies');

  const studies = await Promise.all(
    files.map(async (file) => {
      const { frontmatter, slug } = await parseMDXFile('case-studies', file);
      return {
        slug,
        ...frontmatter,
      };
    })
  );

  return studies.sort((a, b) => {
    const dateA = new Date(a.publishedAt as string);
    const dateB = new Date(b.publishedAt as string);
    return dateB.getTime() - dateA.getTime();
  });
}

/**
 * Get a single case study by slug
 */
export async function getCaseStudy(slug: string) {
  const { frontmatter, content } = await parseMDXFile('case-studies', `${slug}.mdx`);

  const { content: compiledContent } = await compileMDX({
    source: content,
    options: {
      parseFrontmatter: false,
    },
    components: {
      // Custom MDX components can be added here
    },
  });

  return {
    slug,
    frontmatter,
    content: compiledContent,
  };
}

/**
 * Highlight code blocks with Shiki
 */
export async function highlightCode(code: string, lang: string) {
  return await codeToHtml(code, {
    lang,
    theme: 'github-dark',
  });
}
