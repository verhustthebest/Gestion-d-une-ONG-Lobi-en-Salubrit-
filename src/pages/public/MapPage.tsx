import { CheckCircle, Clock, Filter, Heart, Layers, MapPin, Search, Send } from 'lucide-react'
import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { MapVisual } from '../../components/common/MapVisual'

const mapReports = [
  { id: 'SIG-1248', title: 'D\u00e9p\u00f4t sauvage', place: 'Limete, 10e Rue', commune: 'Limete', type: 'D\u00e9p\u00f4ts sauvages', status: 'En cours', progress: '65%', team: '\u00c9quipe Limete 2', dueDate: '16 juin 2026', people: 24 },
  { id: 'SIG-1247', title: 'Caniveau bouch\u00e9', place: 'Matete, March\u00e9 central', commune: 'Matete', type: 'Caniveaux bouch\u00e9s', status: 'Signalement re\u00e7u', progress: '20%', team: 'Validation terrain', dueDate: '18 juin 2026', people: 8 },
  { id: 'SIG-1246', title: 'D\u00e9chets de march\u00e9', place: 'Masina, Quartier 3', commune: 'Masina', type: 'D\u00e9chets de march\u00e9s', status: 'R\u00e9solu', progress: '100%', team: 'Collecte Est', dueDate: '15 juin 2026', people: 32 },
  { id: 'SIG-1245', title: 'Pollution rivi\u00e8re', place: "N'djili, rive Tshangu", commune: "N'djili", type: 'Pollution rivi\u00e8re / lac', status: 'En attente de validation', progress: '10%', team: 'Hydro Team', dueDate: '22 juin 2026', people: 12 },
]

const problemTypes = ['Tous', 'D\u00e9p\u00f4ts sauvages', 'Caniveaux bouch\u00e9s', 'D\u00e9chets de march\u00e9s', 'Pollution rivi\u00e8re / lac']
const statuses = ['Tous', 'Signalement re\u00e7u', 'En cours', 'R\u00e9solu', 'En attente de validation']

export function MapPage() {
  const [typeFilter, setTypeFilter] = useState('Tous')
  const [statusFilter, setStatusFilter] = useState('Tous')

  const filteredReports = useMemo(() => mapReports.filter((report) => {
    const typeMatch = typeFilter === 'Tous' || report.type === typeFilter
    const statusMatch = statusFilter === 'Tous' || report.status === statusFilter
    return typeMatch && statusMatch
  }), [typeFilter, statusFilter])

  const selected = filteredReports[0] || mapReports[0]
  const activeCount = filteredReports.length

  return (
    <main className="mock-page map-dashboard">
      <section className="map-top">
        <div><h1>Carte citoyenne des interventions</h1><p>{'Consultez les signalements, filtrez les op\u00e9rations et suivez les r\u00e9sultats dans votre commune.'}</p></div>
        <article><MapPin /> <b>{mapReports.length}</b><span>Signalements visibles</span></article>
        <article><Clock /> <b>{mapReports.filter((item) => item.status === 'En cours').length}</b><span>En cours</span></article>
        <article><CheckCircle /> <b>{mapReports.filter((item) => item.status === 'R\u00e9solu').length}</b><span>{'R\u00e9solus'}</span></article>
        <article><Layers /> <b>{activeCount}</b><span>{'R\u00e9sultats filtr\u00e9s'}</span></article>
        <Link className="btn primary" to="/signaler"><Send /> Signaler une zone</Link>
        <Link className="btn outline" to="/actions"><Heart /> Voir les campagnes</Link>
      </section>
      <section className="map-workspace">
        <aside className="panel filter-panel">
          <header><h2>Filtres</h2><button type="button" onClick={() => { setTypeFilter('Tous'); setStatusFilter('Tous') }}>{'R\u00e9initialiser'}</button></header>
          <b>{'Types de probl\u00e8mes'}</b>
          {problemTypes.map((item) => <button className={typeFilter === item ? 'active-filter' : ''} type="button" key={item} onClick={() => setTypeFilter(item)}>{item}</button>)}
          <b>Statuts</b>
          {statuses.map((item) => <button className={statusFilter === item ? 'active-filter' : ''} type="button" key={item} onClick={() => setStatusFilter(item)}>{item}</button>)}
          <select><option>Ce mois</option></select>
          <select><option>Toutes les communes</option></select>
          <button className="btn primary" type="button"><Filter /> {activeCount} {'r\u00e9sultat'}{activeCount > 1 ? 's' : ''}</button>
        </aside>
        <section className="map-stage">
          <label className="map-search"><Search /><input placeholder="Rechercher un quartier, une avenue..." /></label>
          <MapVisual />
          <div className="map-popover">
            <h3>{selected.title}</h3>
            <p>{selected.place}</p>
            <span className="badge en-cours">{selected.status}</span>
            <Link to="/signaler">{'Voir les d\u00e9tails'}</Link>
          </div>
        </section>
        <aside className="panel detail-panel">
          <h2>{'D\u00e9tail du signalement'}</h2>
          <div className="photo-band small campaign-photo-real"><img src="/photos/tof3.jpg" alt={`Intervention ${selected.commune}`} /></div>
          <span className="badge en-cours">{selected.status}</span>
          <h3>{selected.title}</h3>
          <p><MapPin /> {selected.place}</p>
          <dl><dt>Commune</dt><dd>{selected.commune}</dd><dt>Type</dt><dd>{selected.type}</dd><dt>{'\u00c9quipe assign\u00e9e'}</dt><dd>{selected.team}</dd><dt>{'Fin pr\u00e9vue'}</dt><dd>{selected.dueDate}</dd><dt>Progression</dt><dd>{selected.progress}</dd></dl>
          <Link className="btn primary" to="/actions">Voir l'intervention</Link>
        </aside>
      </section>
      <section className="mock-grid">
        <article className="panel">
          <h2>{'Interventions filtr\u00e9es'}</h2>
          {filteredReports.map((report) => <div className="intervention-row" key={report.id}><b>{report.title}</b><span>{report.place}</span><i>{report.progress}</i><small>{report.people} {'b\u00e9n\u00e9voles - fin pr\u00e9vue'} {report.dueDate}</small></div>)}
          {!filteredReports.length && <p>{'Aucun signalement ne correspond \u00e0 ces filtres.'}</p>}
        </article>
        <article className="panel"><h2>{'Campagne li\u00e9e \u00e0 cette zone'}</h2><div className="photo-band campaign-photo-real"><img src="/photos/tof2.jpg" alt={'Campagne li\u00e9e \u00e0 la zone filtr\u00e9e'} /></div><h3>Nettoyons Limete</h3><p>Objectif : 10 000 $</p><div className="progress"><i style={{ width: '78%' }} /></div><Link className="btn outline" to="/don">Soutenir cette campagne</Link></article>
        <article className="panel"><h2>Classement des communes</h2><ol className="ranking"><li>Limete - 95 interventions</li><li>Gombe - 71 interventions</li><li>Ngiri-ngiri - 48 interventions</li></ol></article>
      </section>
    </main>
  )
}
