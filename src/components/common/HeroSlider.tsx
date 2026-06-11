import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { CmsPageKey } from '../../data/cmsContent'
import { useCmsPage } from '../../data/cmsContent'

type HeroAction = {
  label: string
  to: string
  variant?: 'primary' | 'light' | 'outline'
  icon?: ReactNode
}

type HeroSliderProps = {
  pageKey: CmsPageKey
  className?: string
  actions?: HeroAction[]
  children?: ReactNode
}

export function HeroSlider({ pageKey, className = '', actions = [], children }: HeroSliderProps) {
  const page = useCmsPage(pageKey)
  const slides = page.slides.length ? page.slides : ['/photos/tof1.jpg']

  return (
    <section className={`mock-hero home-hero cms-hero ${className}`}>
      <div className="hero-slides" aria-hidden="true">
        {slides.map((src, index) => <img src={src} alt="" key={`${src}-${index}`} style={{ animationDelay: `${index * 6}s` }} />)}
      </div>
      <div className="cms-hero-copy">
        <small>{page.eyebrow}</small>
        <h1>{page.title}</h1>
        <p>{page.text}</p>
        {!!actions.length && (
          <div className="actions">
            {actions.map((action) => (
              <Link className={`btn ${action.variant || 'primary'}`} to={action.to} key={action.label}>
                {action.icon} {action.label}
              </Link>
            ))}
          </div>
        )}
      </div>
      <aside className="cms-hero-info">
        <span className="kicker green">INFORMATION</span>
        <h2>{page.infoTitle}</h2>
        <p>{page.infoText}</p>
        {children}
      </aside>
    </section>
  )
}
