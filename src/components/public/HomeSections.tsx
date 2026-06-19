import {
  ArrowRight,
  Building2,
  CalendarDays,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  Globe2,
  GraduationCap,
  HandHeart,
  Heart,
  Leaf,
  MapPin,
  Megaphone,
  Recycle,
  Send,
  ShieldCheck,
  Sprout,
  Target,
  Trash2,
  UserRoundCheck,
  Users,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { brand } from '../../data/brand'
import { useCmsPage } from '../../data/cmsContent'
import { heroSlides, homeLiveNews } from '../../data/publicContent'
import { MapVisual } from '../common/MapVisual'

const impactMetrics = [
  [Trash2, '2 540', 'tonnes de déchets collectées', 'dans les zones d’intervention'],
  [Users, '18 750', 'citoyens mobilisés', 'aux côtés des équipes locales'],
  [MapPin, '156', 'quartiers accompagnés', 'dans la ville de Kinshasa'],
  [Sprout, '12 340', 'arbres plantés', 'pour restaurer les espaces urbains'],
] as const

const programmes = [
  {
    icon: Recycle,
    label: 'Environnement',
    title: 'Assainissement urbain',
    text: 'Collectes communautaires, curage des caniveaux et traitement des dépôts sauvages.',
    image: '/photos/tof3.jpg',
    result: '95 opérations menées',
  },
  {
    icon: GraduationCap,
    label: 'Éducation',
    title: 'Sensibilisation citoyenne',
    text: 'Écoles, marchés et quartiers mobilisés autour des bonnes pratiques environnementales.',
    image: '/photos/tof2.jpg',
    result: '38 000 personnes sensibilisées',
  },
  {
    icon: Leaf,
    label: 'Climat',
    title: 'Reboisement communautaire',
    text: 'Plantation, entretien et protection d’arbres avec les communautés et les partenaires.',
    image: '/photos/tof5.jpg',
    result: '12 340 arbres plantés',
  },
] as const

const newsItems = [
  {
    category: 'Action terrain',
    title: 'Grande opération de nettoyage communautaire à Limete',
    date: '24 mai 2026',
    image: '/photos/tof3.jpg',
    youtubeId: '3Guq-rZaxq8',
  },
  {
    category: 'Environnement',
    title: 'Plantation de 1 000 arbres à Mont Ngafula',
    date: '20 mai 2026',
    image: '/photos/tof5.jpg',
    youtubeId: 'ewpSQzm3T8k',
  },
  {
    category: 'Éducation',
    title: 'Cinq écoles engagées pour des quartiers plus propres',
    date: '18 mai 2026',
    image: '/photos/tof2.jpg',
    youtubeId: 'M9TVTvXvEP0',
  },
] as const

// Maintenance : chaque information du bandeau pointe vers une page publique existante.
const headlineLinks = [
  [homeLiveNews[0][0], homeLiveNews[0][1], '/actualites'],
  [homeLiveNews[1][0], homeLiveNews[1][1], '/actions'],
  [homeLiveNews[2][0], homeLiveNews[2][1], '/actualites'],
  [homeLiveNews[3][0], homeLiveNews[3][1], '/actions'],
  [homeLiveNews[4][0], homeLiveNews[4][1], '/carte'],
] as const

const partners = [
  ['Institutions publiques', Building2],
  ['Communautés locales', Users],
  ['Écoles et universités', GraduationCap],
  ['Entreprises responsables', HandHeart],
  ['Organisations citoyennes', Globe2],
] as const

export function HomeHero() {
  const home = useCmsPage('home')
  const slides = home.slides.length ? home.slides : heroSlides

  return (
    <section className="un-home-hero">
      <div className="hero-slides" aria-hidden="true">
        {slides.map((src, index) => <img src={src} alt="" key={`${src}-${index}`} style={{ animationDelay: `${index * 6}s` }} />)}
      </div>
      <div className="un-hero-overlay" />
      <div className="un-hero-content">
        <span className="un-eyebrow"><Globe2 /> {home.eyebrow}</span>
        {/* Maintenance : les deux lignes du message principal gardent la même échelle typographique. */}
        <h1 className="un-hero-title">
          <span>Ensemble pour une RDC</span>
          <span>et des villes propres, saines et durables que jamais auparavant</span>
        </h1>
        <p>{home.text}</p>
        <div className="un-hero-actions">
          <Link className="btn un-primary" to="/signaler"><Megaphone /> Signaler une zone</Link>
          <Link className="btn un-secondary" to="/actions">Découvrir nos programmes <ArrowRight /></Link>
        </div>
        <div className="un-hero-proof">
          <span><ShieldCheck /> Organisation citoyenne engagée</span>
          <span><MapPin /> Kinshasa, RDC</span>
        </div>
      </div>
    </section>
  )
}

export function LiveNewsStrip() {
  const scrollingHeadlines = [...headlineLinks, ...headlineLinks]

  return (
    <section className="un-alert-bar" aria-label="Actualités à la une">
      <b><Megaphone /> À la Une</b>
      <div className="un-alert-window">
        <div className="un-alert-track">
          {scrollingHeadlines.map(([title, date, path], index) => (
            <Link to={path} key={`${title}-${index}`}>
              <strong>{title}</strong>
              <small>{date}</small>
            </Link>
          ))}
        </div>
      </div>
      <Link className="un-alert-all" to="/actualites">Toutes les actualités <ArrowRight /></Link>
    </section>
  )
}

export function QuickActions() {
  const actions = [
    [Megaphone, 'Signaler', 'Alerter nos équipes sur une zone prioritaire.', '/signaler'],
    [MapPin, 'Suivre', 'Voir les interventions et leur progression.', '/carte'],
    [UserRoundCheck, "Devenir membre de l’ASBL LOBI", 'Rejoindre les membres actifs de notre association.', '/benevolat'],
    [CircleDollarSign, 'Soutenir', 'Financer une action concrète et mesurable.', '/don'],
  ] as const

  return (
    <nav className="un-action-rail" aria-label="Actions rapides">
      {actions.map(([Icon, title, text, path]) => (
        <Link to={path} key={title}>
          <Icon />
          <span><b>{title}</b><small>{text}</small></span>
          <ChevronRight />
        </Link>
      ))}
    </nav>
  )
}

export function ImpactSection() {
  return (
    <section className="un-section un-impact-section">
      <div className="un-impact-intro">
        <header className="un-section-heading">
          <div>
            <span className="un-kicker">NOTRE IMPACT</span>
            <h2>Des résultats concrets, mesurés sur le terrain.</h2>
          </div>
          <p>Nous associons mobilisation citoyenne, interventions locales et suivi transparent pour produire des changements durables.</p>
        </header>
        <article className="un-president-card">
          <img src="/photos/tof1.jpg" alt="TAMUKIUR Serge, Président de l’ASBL LOBI" />
          <div>
            <span>PRÉSIDENCE</span>
            <h3>TAMUKIUR Serge</h3>
            <p>Président de l’ASBL LOBI</p>
            <small>« Agir avec les communautés pour produire un impact durable. »</small>
          </div>
        </article>
      </div>
      <div className="un-impact-grid">
        {impactMetrics.map(([Icon, value, label, detail]) => (
          <article key={label}>
            <Icon />
            <strong>{value}</strong>
            <b>{label}</b>
            <span>{detail}</span>
          </article>
        ))}
      </div>
      <div className="un-impact-note">
        <Target />
        <p><b>Cap 2030 :</b> renforcer l’action communautaire dans toutes les communes de Kinshasa, avec des résultats publics et vérifiables.</p>
        <Link to="/resultats-impact">Voir le rapport d’impact <ArrowRight /></Link>
      </div>
    </section>
  )
}

export function ProgrammesSection() {
  return (
    <section className="un-section un-programmes-section">
      <header className="un-section-heading">
        <div>
          <span className="un-kicker">NOS PROGRAMMES</span>
          <h2>Trois leviers pour transformer durablement les quartiers.</h2>
        </div>
        <Link className="un-text-link" to="/actions">Voir tous nos programmes <ArrowRight /></Link>
      </header>
      <div className="un-programmes-grid">
        {programmes.map(({ icon: Icon, label, title, text, image, result }) => (
          <article key={title}>
            <div className="un-programme-image">
              <img src={image} alt={`Programme ${title}`} />
              <span><Icon /> {label}</span>
            </div>
            <div className="un-programme-body">
              <h3>{title}</h3>
              <p>{text}</p>
              <small><CheckCircle2 /> {result}</small>
              <Link to="/actions">Découvrir le programme <ArrowRight /></Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function NewsSection() {
  return (
    <section className="un-section un-news-section">
      <header className="un-section-heading">
        <div>
          <span className="un-kicker">ACTUALITÉS</span>
          <h2>Les dernières nouvelles de nos équipes et communautés.</h2>
        </div>
        <Link className="un-text-link" to="/actualites">Toutes les actualités <ArrowRight /></Link>
      </header>
      <div className="un-news-grid">
        {newsItems.map((item) => (
          <article key={item.title}>
            <img src={item.image} alt={item.title} />
            <div>
              <span>{item.category}</span>
              <h3>{item.title}</h3>
              <small><CalendarDays /> {item.date}</small>
              <Link to="/actualites">Lire l’actualité <ArrowRight /></Link>
            </div>
          </article>
        ))}
      </div>
      {/* Maintenance : conserver des identifiants YouTube d’intégration publics. */}
      <div className="un-news-videos">
        {newsItems.map((item) => (
          <article key={item.youtubeId}>
            <div className="un-video-frame">
              <iframe
                src={`https://www.youtube.com/embed/${item.youtubeId}`}
                title={`Vidéo : ${item.title}`}
                loading="lazy"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            <div><span>VIDÉO</span><b>{item.title}</b></div>
          </article>
        ))}
      </div>
    </section>
  )
}

export function HomeMapSection() {
  return (
    <section className="un-map-section">
      <div className="un-map-copy">
        <span className="un-kicker">PRÉSENCE TERRITORIALE</span>
        <h2>Suivez l’action de l’ONG LOBI à Kinshasa.</h2>
        <p>Consultez les zones signalées, les interventions en cours et les résultats déjà obtenus dans les communautés.</p>
        <div className="un-map-stats">
          <span><b>24</b> communes couvertes</span>
          <span><b>38</b> interventions actives</span>
          <span><b>92%</b> d’actions documentées</span>
        </div>
        <div className="actions">
          <Link className="btn un-primary" to="/carte"><MapPin /> Explorer la carte</Link>
          <Link className="btn un-map-report" to="/signaler"><Send /> Faire un signalement</Link>
        </div>
      </div>
      <div className="un-map-visual">
        <MapVisual />
        <div className="un-map-status"><i /><span><b>Interventions suivies</b><small>Mise à jour par les équipes terrain</small></span></div>
      </div>
    </section>
  )
}

export function PartnersSection() {
  return (
    <section className="un-section un-partners-section">
      <header className="un-section-heading centered">
        <div>
          <span className="un-kicker">NOS PARTENAIRES</span>
          <h2>Une coalition au service de l’intérêt général.</h2>
        </div>
        <p>Nous construisons des partenariats transparents avec les institutions, les communautés et le secteur privé.</p>
      </header>
      <div className="un-partners-grid">
        {partners.map(([label, Icon]) => <div key={label}><Icon /><span>{label}</span></div>)}
      </div>
      <Link className="un-partner-link" to="/contact">Devenir partenaire de l’ONG LOBI <ArrowRight /></Link>
    </section>
  )
}

export function HomeCta() {
  return (
    <section className="un-final-actions">
      <div>
        <span>AGIR AVEC NOUS</span>
        <h2>Chaque geste peut améliorer durablement un quartier.</h2>
        <p className="un-engagement-message">Citoyens, membres, donateurs et partenaires : votre engagement donne de la force aux solutions locales.</p>
      </div>
      <div className="un-final-actions-grid">
        <Link to="/benevolat"><Users /><span><b>Devenir membre de l’ASBL LOBI</b><small>Rejoindre notre association</small></span><ArrowRight /></Link>
        <Link to="/don"><Heart /><span><b>Faire un don</b><small>Soutenir un programme</small></span><ArrowRight /></Link>
        <Link to="/signaler"><Megaphone /><span><b>Signaler une zone</b><small>Déclencher une alerte citoyenne</small></span><ArrowRight /></Link>
      </div>
      <small className="un-final-signature">{brand.organization} · {brand.tagline}</small>
    </section>
  )
}
