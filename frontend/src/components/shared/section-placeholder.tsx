type SectionPlaceholderProps = {
  title: string;
};

export function SectionPlaceholder({ title }: SectionPlaceholderProps) {
  return (
    <section>
      <h2>{title}</h2>
      <p>TODO: Implement {title} section.</p>
    </section>
  );
}
