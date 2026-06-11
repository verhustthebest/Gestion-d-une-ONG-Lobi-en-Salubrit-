import { MapPin, Plus } from 'lucide-react'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { DataTable } from '../../components/admin/DataTable'
import { MapVisual } from '../../components/common/MapVisual'
import { Stat } from '../../components/common/Stat'

const interventions = [
  ['INT-087', 'Nettoyage marche Limete', 'Limete', 'En cours', 'Equipe Limete 2'],
  ['INT-086', 'Curage caniveau', 'Ngaliema', 'Planifiee', 'Hydro Team'],
  ['INT-085', 'Reboisement ecole', 'Matete', 'Terminee', 'Volontaires'],
  ['INT-084', 'Collecte dechets', 'Gombe', 'En cours', 'Clean Congo'],
]

export function InterventionsAdmin() {
  return (
    <>
      <AdminHeader title="Interventions" subtitle="Planification des equipes et suivi des operations terrain" action="Planifier" />
      <section className="admin-stats">
        <Stat value="42" label="En cours" trend="+6 aujourd'hui" />
        <Stat value="95" label="Campagnes" trend="2026" />
        <Stat value="14" label="Equipes" trend="Actives" />
        <Stat value="86%" label="Execution" trend="Objectifs" />
      </section>
      <section className="dashboard-grid">
        <AdminCard title="Carte operationnelle" wide><MapVisual /></AdminCard>
        <AdminCard title="Planification">
          <div className="publish-box"><MapPin /><b>4 zones prioritaires</b><span>Limete, Ngaliema, Matete, Gombe</span><button className="btn primary"><Plus /> Ajouter</button></div>
        </AdminCard>
        <AdminCard title="Operations" wide><DataTable headers={['Code', 'Intervention', 'Commune', 'Statut', 'Equipe']} rows={interventions} /></AdminCard>
      </section>
    </>
  )
}
