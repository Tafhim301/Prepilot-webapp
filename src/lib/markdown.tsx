import React from "react";

/**
 * Tiny inline markdown renderer.
 * Supports: **bold**, *italic*, [text](url)
 * Safe: no HTML injection, everything rendered as React nodes.
 */
export function renderInlineMarkdown(text: string): React.ReactNode[] {
  const nodes: React.ReactNode[] = [];
  // Tokenize: links first, then bold, then italic
  const pattern = /(\[([^\]]+)\]\(([^)]+)\))|(\*\*([^*]+)\*\*)|(\*([^*]+)\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[1]) {
      // Link
      nodes.push(
        <a
          key={key++}
          href={match[3]}
          className="text-primary underline underline-offset-4 hover:text-primary/80 transition-colors"
          target="_blank"
          rel="noopener noreferrer"
        >
          {match[2]}
        </a>
      );
    } else if (match[4]) {
      // Bold
      nodes.push(
        <strong key={key++} className="font-bold text-foreground">
          {match[5]}
        </strong>
      );
    } else if (match[6]) {
      // Italic
      nodes.push(
        <em key={key++} className="italic">
          {match[7]}
        </em>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}