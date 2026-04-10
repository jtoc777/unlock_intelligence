interface MarkdownContentProps {
  html: string;
}

export function MarkdownContent({ html }: MarkdownContentProps) {
  return (
    <div
      className="wiki-prose"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}
