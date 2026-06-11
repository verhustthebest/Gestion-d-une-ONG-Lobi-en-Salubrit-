import { Search, Settings } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { DataTable } from '../../components/admin/DataTable'
import { Timeline } from '../../components/admin/Timeline'
import { moduleMeta, moduleRows } from '../../data/siteData'
import type { ModuleKey } from '../../types'

function isModuleKey(value: string | undefined): value is ModuleKey {
  return Boolean(value && value in moduleMeta)
}

export function AdminModulePage() {
  const location = useLocation()
  const segment = location.pathname.split('/').filter(Boolean).at(-1)
  const moduleKey: ModuleKey = isModuleKey(segment) ? segment : 'articles'
  const meta = moduleMeta[moduleKey]

  return (
    <>
      <AdminHeader title={meta.title} subtitle={meta.subtitle} action={meta.action} />
      <div className="module-toolbar">
        <label><Search /><input placeholder={`Rechercher dans ${meta.title.toLowerCase()}...`} /></label>
        <button className="btn primary">{meta.action}</button>
      </div>
      <section className="dashboard-grid">
        <AdminCard title="Contenus" wide>
          <DataTable headers={meta.headers} rows={moduleRows[moduleKey]} />
        </AdminCard>
        <AdminCard title="Qualite">
          <div className="module-score"><b>92</b><span>Score de preparation</span></div>
        </AdminCard>
        <AdminCard title="Historique"><Timeline /></AdminCard>
        <AdminCard title="Publication" wide>
          <div className="publish-box"><Settings /><b>Workflow pret</b><span>Brouillon, validation, publication et archivage sont simules pour la demo.</span></div>
        </AdminCard>
      </section>
    </>
  )
}
