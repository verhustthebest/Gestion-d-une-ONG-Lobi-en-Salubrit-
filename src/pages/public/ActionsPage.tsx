import { CalendarDays, Heart, MapPin, Search, Truck, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'
import { MapVisual } from '../../components/common/MapVisual'
import { Stat } from '../../components/common/Stat'

const campaigns = [
  ['Nettoyons Limete', 'Limete', 'Juin 2026', 'En cours', '120 b\u00e9n\u00e9voles', '25 tonnes collect\u00e9es', '78%'],
  ['Kinshasa Verte', 'Ngaliema', 'Mai 2026', 'En cours', '95 b\u00e9n\u00e9voles', '18 tonnes collect\u00e9es', '65%'],
  ['\u00c9coles propres', 'Matete', 'Avril 2026', 'Sensibilisation', '80 b\u00e9n\u00e9voles', '12 \u00e9coles sensibilis\u00e9es', '60%'],
  ['Rivi\u00e8res sans d\u00e9chets', "N'djili", 'Mai 2026', 'En cours', '60 b\u00e9n\u00e9voles', '15 tonnes collect\u00e9es', '50%'],
]

export function ActionsPage() {
  const [filter, setFilter] = useState('Tous')

  return (
    <main className="mock-page">
      <HeroSlider
        pageKey="actions"
        className="actions-hero"
        actions={[
          { label: 'Faire un don', to: '/don', icon: <Heart /> },
          { label: 'Devenir benevole', to: '/benevolat', variant: 'outline', icon: <Users /> },
        ]}
      >
        <div className="hero-mini-list">
          <b>95 campagnes realisees</b>
          <span>Nettoyage, reboisement et sensibilisation</span>
        </div>
      </HeroSlider>
      <section className="stat-strip mock-stat-strip">
        <Stat value="95" label={'Campagnes r\u00e9alis\u00e9es'} trend={'+18 cette ann\u00e9e'} />
        <Stat value="2 540" label={'Tonnes de d\u00e9chets collect\u00e9es'} trend={'+620 cette ann\u00e9e'} />
        <Stat value="156" label="Quartiers assainis" trend={'+34 cette ann\u00e9e'} />
        <Stat value="18 750" label={'B\u00e9n\u00e9voles mobilis\u00e9s'} trend={'+2 340 cette ann\u00e9e'} />
      </section>
      <section className="filters mock-filters">
        <div><Search /><input placeholder="Rechercher une campagne, un quartier..." /></div>
        {['Tous', 'Nettoyage', 'Reboisement', 'Sensibilisation', 'Collecte de donn\u00e9es', '\u00c9v\u00e9nements'].map((item) => <button className={filter === item ? 'active' : ''} onClick={() => setFilter(item)} key={item}>{item}</button>)}
        <select><option>{'Plus r\u00e9cent'}</option><option>Plus ancien</option></select>
      </section>
      <section className="campaign-cards">
        {campaigns.map(([title, place, date, status, volunteers, result, progress]) => (
          <article key={title}>
            <div className="photo-band campaign-photo-real"><img src={title.includes('Limete') ? '/photos/tof3.jpg' : title.includes('Verte') ? '/photos/tof5.jpg' : '/photos/tof2.jpg'} alt={`Campagne ${title}`} /><span className="badge en-cours">{status}</span></div>
            <h3>{title}</h3>
            <p><MapPin /> {place} <CalendarDays /> {date}</p>
            <div><span><Users /> {volunteers}</span><span><Truck /> {result}</span></div>
            <div className="progress"><i style={{ width: progress }} /></div>
            <footer><Link className="btn outline" to="/benevolat">Participer</Link><Link className="btn primary" to="/don">Soutenir</Link></footer>
          </article>
        ))}
      </section>
      <section className="featured-campaign">
        <div><span className="badge publie">CAMPAGNE DU MOIS</span><h2>Nettoyons Limete</h2><p>{'Une grande op\u00e9ration de nettoyage et d\'assainissement des avenues et caniveaux de la commune.'}</p><b>78%</b><span>Il reste 22 jours pour atteindre l'objectif</span><Link className="btn primary" to="/don">Soutenir cette campagne</Link></div>
      </section>
      <section className="mock-grid two-cols">
        <article className="panel"><h2>{'Avant / Apr\u00e8s'}</h2><div className="before-row"><span>Caniveau - Limete</span><span>{'March\u00e9 - Matete'}</span><span>{'D\u00e9p\u00f4t sauvage - Masina'}</span></div></article>
        <article className="panel"><h2>Carte des interventions</h2><MapVisual /></article>
      </section>
    </main>
  )
}
