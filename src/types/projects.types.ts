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
  };
  solution: string;
  industry: string;
  awards: string[];
  /** Always exactly 3 cover images for the stacked preview on listing cards */
  coverImages: [string, string, string];
  featuredImage: string;
  content: ContentBlock[];
}