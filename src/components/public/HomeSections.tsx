import { ArrowRight, Heart, Leaf, MapPin, Play, Sprout, Trash2, UserRoundCheck, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../../data/brand'
import { useCmsPage } from '../../data/cmsContent'
import { heroSlides, homeCtaLinks, homeLeaders, homeLiveNews, homeQuickLinks, homeVideos, Megaphone, volunteerChecklist } from '../../data/publicContent'
import { MapVisual } from '../common/MapVisual'

export function HomeHero() {
  const home = useCmsPage('home')
  const slides = home.slides.length ? home.slides : heroSlides

  return (
    <section className="mock-hero home-hero">
      <div className="hero-slides" aria-hidden="true">
        {slides.map((src, index) => <img src={src} alt="" key={`${src}-${index}`} style={{ animationDelay: `${index * 6}s` }} />)}
      </div>
      <div>
        <small>{home.eyebrow}</small>
        <h1>{home.title}</h1>
        <p>{home.text}</p>
        <div className="actions">
          <Link className="btn primary" to="/signaler"><UserRoundCheck /> Signaler une zone</Link>
          <Link className="btn light" to="/don"><Heart /> Faire un don</Link>
        </div>
        <small>{'+18 750 citoyens engag\u00e9s'}</small>
      </div>
      <aside className="hero-side-panel" aria-label="Impact de l'ONG LOBI">
        <div className="video-control">
          <button className="play-button" aria-label="Voir notre vid\u00e9o"><Play /></button>
          <span>{'Voir notre vid\u00e9o (01:24)'}</span>
        </div>
        <div className="hero-impact-card">
          <b>Impact réel</b>
          <section><Trash2 /><strong>2 540</strong><span>Zones nettoyées</span></section>
          <section><Users /><strong>18 750</strong><span>Bénévoles mobilisés</span></section>
          <section><MapPin /><strong>156</strong><span>Quartiers assainis</span></section>
          <section><Sprout /><strong>12 340</strong><span>Arbres plantés</span></section>
          <small>{brand.president}, Président</small>
        </div>
        <Leaf className="hero-leaf-mark" />
        <div className="hero-dots"><i className="active" /><i /><i /><i /></div>
      </aside>
    </section>
  )
}

export function LiveNewsStrip() {
  const tickerItems = [...homeLiveNews, ...homeLiveNews]

  return (
    <section className="live-strip">
      <b><Megaphone /> {'Actualit\u00e9s en direct'}</b>
      <div className="ticker-window">
        <div className="ticker-track">
          {tickerItems.map(([title, date], index) => (
            <Link to="/actualites" key={`${title}-${index}`}>
              <strong>{title}</strong>
              <span>{date}</span>
            </Link>
          ))}
        </div>
      </div>
      <Link to="/actualites">{'Voir toutes les actualit\u00e9s'} <ArrowRight /></Link>
    </section>
  )
}

export function QuickActions() {
  return (
    <section className="mock-quick">
      {homeQuickLinks.map(([Icon, title, text, path]) => (
        <Link to={path} key={title}>
          <Icon />
          <b>{title}</b>
          <span>{text}</span>
        </Link>
      ))}
    </section>
  )
}

export function LeaderPanel() {
  const [name, role, badge] = homeLeaders[0]

  return (
    <section className="leader-panel">
      <header>
        <h2>{'Notre Pr\u00e9sident'}</h2>
        <p>{'Engag\u00e9 chaque jour pour une Kinshasa plus propre, plus saine et plus durable.'}</p>
      </header>
      <article className="home-president-card" key={name}>
        <img src="/photos/tof1.jpg" alt={`Portrait terrain de ${name}`} />
        <div>
          <span className="badge publie">{badge}</span>
          <h3>{name}</h3>
          <p>{role}</p>
          <small>{'Visionnaire et engag\u00e9, il guide la mission de '} {brand.organization} {'pour un impact durable \u00e0 Kinshasa.'}</small>
        </div>
      </article>
    </section>
  )
}

export function HomeMapFunding() {
  return (
    <section className="mock-grid">
      <article className="panel">
        <h2>Carte interactive des interventions</h2>
        <p>{"Explorez la carte pour voir les zones signal\u00e9es et suivre l'\u00e9tat des interventions en temps r\u00e9el."}</p>
        <ul className="legend-list">
          <li><i className="blue" /> {'Signalement re\u00e7u'}</li>
          <li><i className="orange-dot" /> En cours</li>
          <li><i className="green-dot" /> {'R\u00e9solus'}</li>
          <li><i className="red-dot" /> En attente de validation</li>
        </ul>
      </article>
      <MapVisual />
      <article className="panel">
        <span className="kicker green">SOUTENEZ NOS ACTIONS</span>
        <h2>Financer une campagne, changer des vies</h2>
        <p>{'Votre soutien permet de mener des actions concr\u00e8tes sur le terrain.'}</p>
        <div className="mini-progress"><b>65%</b><span>Nettoyage de quartiers</span></div>
        <div className="mini-progress orange"><b>40%</b><span>Sensibilisation communautaire</span></div>
        <div className="mini-progress"><b>80%</b><span>Reboisement urbain</span></div>
        <div className="actions compact-actions">
          <Link className="btn primary" to="/don">Faire un don <ArrowRight /></Link>
          <Link className="btn outline" to="/actions">Voir nos campagnes</Link>
        </div>
      </article>
    </section>
  )
}

export function VolunteerAndNews() {
  return (
    <section className="home-bottom-grid">
      <article className="volunteer-card">
        <span>{'DEVENEZ B\u00c9N\u00c9VOLE'}</span>
        <h2>{'Agissez sur le terrain, faites la diff\u00e9rence'}</h2>
        <p>{'Rejoignez notre communaut\u00e9 de b\u00e9n\u00e9voles et participez activement \u00e0 la transformation de Kinshasa.'}</p>
        <ul>
          {volunteerChecklist.map(([Icon, label]) => <li key={label}><Icon /> {label}</li>)}
        </ul>
        <Link className="btn light" to="/benevolat">{'Devenir b\u00e9n\u00e9vole'}</Link>
      </article>
      <article className="panel news-panel videos-panel">
        <header><h2>{"Vid\u00e9os d'actualit\u00e9"}</h2><Link to="/actualites">Voir toutes <ArrowRight /></Link></header>
        <div className="news-cards video-cards">
          {homeVideos.map(([title, date, youtubeId, duration]) => (
            <article key={youtubeId}>
              <a className="video-thumb" href={`https://youtu.be/${youtubeId}`} target="_blank" rel="noreferrer">
                <iframe
                  src={`https://www.youtube.com/embed/${youtubeId}`}
                  title={title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <span>{duration}</span>
              </a>
              <b>{title}</b>
              <small>{date}</small>
            </article>
          ))}
        </div>
      </article>
    </section>
  )
}

export function HomeCta() {
  return (
    <section className="mock-cta">
      <h2>Agissons ensemble pour une Kinshasa plus propre.</h2>
      <p>{"Chaque action compte. Rejoignez-nous d\u00e8s aujourd'hui !"}</p>
      <div className="actions">
        {homeCtaLinks.map(([Icon, label, path]) => <Link className="btn light" to={path} key={label}><Icon /> {label}</Link>)}
      </div>
    </section>
  )
}
