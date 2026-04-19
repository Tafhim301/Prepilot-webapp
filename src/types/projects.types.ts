export type ContentBlock =
  | { type: "paragraph"; text: string }
  | { type: "heading"; level: 1 | 2 | 3 | 4; text: string }
  | { type: "list"; style: "bullet" | "numbered"; items: string[] }
  | { type: "quote"; text: string; author?: string }
  | { type: "image"; src: string; alt: string; caption?: string };

export interface Project {
  slug: string;
  title: string;
  shortTitle: string;
  excerpt: string;
  client: {
    name: string;
    logo: string;
  };
  solution: string;
  industry: string;
  awards: string[];
  coverImages: string[];
  featuredImage: string;
  content: ContentBlock[];
}