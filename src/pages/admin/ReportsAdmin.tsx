import { Download, Filter, MessageSquareWarning } from 'lucide-react'
import { useState } from 'react'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { DataTable } from '../../components/admin/DataTable'
import { Stat } from '../../components/common/Stat'
import { readStore, writeStore } from '../../data/appStore'
import type { CitizenReport } from '../../data/appStore'

const reportStatuses = ['Signalement recu', 'En attente', 'En cours', 'Resolue']

function normalizeText(value: string) {
  return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
}

function reportStatusValue(status: string) {
  const normalized = normalizeText(status)
  if (normalized.includes('en attente')) return 'En attente'
  if (normalized.includes('en cours')) return 'En cours'
  if (normalized.includes('resolu')) return 'Resolue'
  return 'Signalement recu'
}

export function ReportsAdmin() {
  const [reports, setReports] = useState(() => readStore('reports'))
  const total = reports.length
  const resolved = reports.filter((report) => normalizeText(report.status).includes('resolu')).length
  const urgent = reports.filter((report) => normalizeText(report.urgency).includes('elevee') || normalizeText(report.urgency).includes('haute')).length
  const nextReport = reports.find((report) => !normalizeText(report.status).includes('resolu')) || reports[0]

  function updateReport(reportId: string, patch: Partial<CitizenReport>) {
    const next = reports.map((report) => (report.id === reportId ? { ...report, ...patch } : report))
    writeStore('reports', next)
    setReports(next)
  }

  const rows = reports.map((report) => [
    report.id,
    report.problemType,
    report.commune,
    report.urgency,
    report.status,
    <select
      className="table-select"
      value={reportStatusValue(report.status)}
      onChange={(event) => updateReport(report.id, { status: event.target.value })}
      key={report.id}
    >
      {reportStatuses.map((status) => <option key={status}>{status}</option>)}
    </select>,
  ])

  return (
    <>
      <AdminHeader title="Signalements" subtitle="Reception, priorisation et suivi des alertes citoyennes" action="Nouveau ticket" />
      <section className="admin-stats">
        <Stat value={String(total)} label="Recus" trend="Stockage local" />
        <Stat value={String(resolved)} label="Resolus" trend={`${total ? Math.round((resolved / total) * 100) : 0}%`} />
        <Stat value={String(urgent)} label="Urgences" trend="Haute priorite" />
        <Stat value="4h" label="Delai moyen" trend="Premier tri" />
      </section>
      <div className="module-toolbar">
        <label><Filter /><input placeholder="Filtrer par commune, priorite ou statut..." /></label>
        <button className="btn outline" type="button"><Download /> Exporter</button>
      </div>
      <section className="dashboard-grid">
        <AdminCard title="File de traitement" wide>
          <DataTable headers={['Code', 'Probleme', 'Commune', 'Priorite', 'Statut', 'Action']} rows={rows} showActions={false} />
        </AdminCard>
        <AdminCard title="Repartition">
          <div className="donut reports"><b>{total ? Math.round(((total - resolved) / total) * 100) : 0}%<small>ouverts</small></b></div>
        </AdminCard>
        <AdminCard title="Prochaine action">
          <div className="publish-box">
            <MessageSquareWarning />
            <b>{nextReport ? `Verifier ${nextReport.commune}` : 'Aucun signalement'}</b>
            <span>{nextReport ? nextReport.description : 'La file de traitement est vide.'}</span>
          </div>
        </AdminCard>
      </section>
    </>
  )
}
