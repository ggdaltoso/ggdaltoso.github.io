export interface PostFrontmatter {
  title: string;
  date: string;
  template: string;
  draft: boolean;
  slug: string;
  category: string;
  tags: string[];
  description: string;
  issueNumber?: number;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  content: string; // Markdown raw
}
