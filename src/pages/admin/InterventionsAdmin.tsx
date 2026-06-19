import { MapPin, Plus, X } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { DataTable } from '../../components/admin/DataTable'
import { MapVisual } from '../../components/common/MapVisual'
import { Stat } from '../../components/common/Stat'
import { makeId, readStore, writeStore } from '../../data/appStore'
import type { Intervention } from '../../data/appStore'

const interventionStatuses = ['Planifiee', 'En cours', 'Terminee', 'Suspendue']

export function InterventionsAdmin() {
  const [interventions, setInterventions] = useState(() => readStore('interventions'))
  const [editing, setEditing] = useState<Intervention | null>(null)
  const [creating, setCreating] = useState(false)
  const active = interventions.filter((intervention) => intervention.status === 'En cours').length
  const finished = interventions.filter((intervention) => intervention.status === 'Terminee').length
  const teams = new Set(interventions.map((intervention) => intervention.team)).size

  function saveIntervention(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const nextItem: Intervention = {
      id: editing?.id || makeId('INT'),
      title: String(form.get('title') || '').trim(),
      commune: String(form.get('commune') || '').trim(),
      status: String(form.get('status') || 'Planifiee'),
      team: String(form.get('team') || '').trim(),
      dueDate: String(form.get('dueDate') || '').trim(),
      linkedReportId: String(form.get('linkedReportId') || '').trim() || undefined,
    }
    const next = editing
      ? interventions.map((intervention) => (intervention.id === editing.id ? nextItem : intervention))
      : [nextItem, ...interventions]

    writeStore('interventions', next)
    setInterventions(next)
    setEditing(null)
    setCreating(false)
  }

  function deleteIntervention(interventionId: string) {
    const next = interventions.filter((intervention) => intervention.id !== interventionId)
    writeStore('interventions', next)
    setInterventions(next)
  }

  const rows = interventions.map((intervention) => [
    intervention.id,
    intervention.title,
    intervention.commune,
    intervention.status,
    intervention.team,
    <div className="inline-actions" key={intervention.id}>
      <button className="table-action" type="button" onClick={() => setEditing(intervention)}>Modifier</button>
      <button className="table-action danger" type="button" onClick={() => deleteIntervention(intervention.id)}>Supprimer</button>
    </div>,
  ])
  const edited = editing || { title: '', commune: '', status: 'Planifiee', team: '', dueDate: '', linkedReportId: '' }

  return (
    <>
      <AdminHeader title="Interventions" subtitle="Planification des equipes et suivi des operations terrain" action="Planifier" />
      <section className="admin-stats">
        <Stat value={String(active)} label="En cours" trend="Operations actives" />
        <Stat value={String(interventions.length)} label="Campagnes" trend="Total local" />
        <Stat value={String(teams)} label="Equipes" trend="Actives" />
        <Stat value={`${interventions.length ? Math.round((finished / interventions.length) * 100) : 0}%`} label="Execution" trend="Terminees" />
      </section>
      <section className="dashboard-grid">
        <AdminCard title="Carte operationnelle" wide><MapVisual /></AdminCard>
        <AdminCard title="Planification">
          <div className="publish-box">
            <MapPin />
            <b>{active} operations en cours</b>
            <span>Planifiez les equipes et suivez les zones prioritaires.</span>
            <button className="btn primary" type="button" onClick={() => setCreating(true)}><Plus /> Ajouter</button>
          </div>
        </AdminCard>
        <AdminCard title="Operations" wide>
          <DataTable headers={['Code', 'Intervention', 'Commune', 'Statut', 'Equipe', 'Action']} rows={rows} showActions={false} />
        </AdminCard>
      </section>
      {(editing || creating) && (
        <div className="modal-backdrop">
          <form className="editor cms-editor" onSubmit={saveIntervention}>
            <header>
              <div><span>INTERVENTION</span><h2>{editing ? 'Modifier' : 'Planifier'}</h2></div>
              <button type="button" onClick={() => { setEditing(null); setCreating(false) }}><X /></button>
            </header>
            <label>Titre<input name="title" defaultValue={edited.title} required /></label>
            <label>Commune<input name="commune" defaultValue={edited.commune} required /></label>
            <label>Equipe<input name="team" defaultValue={edited.team} required /></label>
            <label>Date prevue<input name="dueDate" type="date" defaultValue={edited.dueDate} required /></label>
            <label>Signalement lie<input name="linkedReportId" defaultValue={edited.linkedReportId || ''} placeholder="SIG-..." /></label>
            <label>Statut<select name="status" defaultValue={edited.status}>{interventionStatuses.map((status) => <option key={status}>{status}</option>)}</select></label>
            <div>
              <button className="btn outline" type="button" onClick={() => { setEditing(null); setCreating(false) }}>Annuler</button>
              <button className="btn primary">Enregistrer</button>
            </div>
          </form>
        </div>
      )}
    </>
  )
}
