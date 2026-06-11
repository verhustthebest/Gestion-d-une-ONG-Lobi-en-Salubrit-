export function PageHero({ eyebrow, title, text }: { eyebrow: string; title: string; text: string }) {
  return (
    <section className="page-hero">
      <span className="kicker">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{text}</p>
    </section>
  )
}
