import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'

export function SectionTitle({ eyebrow, title, link }: { eyebrow: string; title: string; link?: string }) {
  return (
    <div className="section-title">
      <div>
        <span className="kicker green">{eyebrow}</span>
        <h2>{title}</h2>
      </div>
      {link && (
        <Link to={link}>
          Voir tout <ArrowRight />
        </Link>
      )}
    </div>
  )
}
