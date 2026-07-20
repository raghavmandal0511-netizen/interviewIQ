type PagePlaceholderProps = {
  title: string;
  description: string;
};

export function PagePlaceholder({ title, description }: PagePlaceholderProps) {
  return (
    <section>
      <h1>{title}</h1>
      <p>{description}</p>
      <p>TODO: Implement this page UI.</p>
    </section>
  );
}
