import { Download, Filter, MessageSquareWarning } from 'lucide-react'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { DataTable } from '../../components/admin/DataTable'
import { Stat } from '../../components/common/Stat'
import { reports } from '../../data/siteData'

export function ReportsAdmin() {
  return (
    <>
      <AdminHeader title="Signalements" subtitle="Réception, priorisation et suivi des alertes citoyennes" action="Nouveau ticket" />
      <section className="admin-stats">
        <Stat value="2 540" label="Reçus" trend="+36 semaine" />
        <Stat value="1 684" label="Résolus" trend="66%" />
        <Stat value="18" label="Urgences" trend="Haute priorité" />
        <Stat value="4h" label="Délai moyen" trend="Premier tri" />
      </section>
      <div className="module-toolbar">
        <label><Filter /><input placeholder="Filtrer par commune, priorité ou statut..." /></label>
        <button className="btn outline"><Download /> Exporter</button>
      </div>
      <section className="dashboard-grid">
        <AdminCard title="File de traitement" wide><DataTable headers={['Code', 'Problème', 'Commune', 'Priorité', 'Statut']} rows={reports} /></AdminCard>
        <AdminCard title="Répartition">
          <div className="donut reports"><b>70%<small>ouverts</small></b></div>
        </AdminCard>
        <AdminCard title="Prochaine action">
          <div className="publish-box"><MessageSquareWarning /><b>Vérifier Limete</b><span>Dépôt sauvage près du marché central</span></div>
        </AdminCard>
      </section>
    </>
  )
}
