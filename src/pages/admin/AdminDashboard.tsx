import { Edit3, FileText, FolderOpen, Image, MessageSquareQuote, Upload, Video } from 'lucide-react'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { BarChart } from '../../components/admin/BarChart'
import { DataTable } from '../../components/admin/DataTable'
import { cmsMetrics, recentActivities, recentContents } from '../../data/adminContent'

export function AdminDashboard() {
  return (
    <>
      <AdminHeader title="Tableau de Bord Contenu (CMS)" subtitle="Vue d'ensemble de tous les contenus du site public" action="Creer" />
      <section className="cms-metric-grid">
        {cmsMetrics.map(([Icon, value, label, trend]) => (
          <article className="cms-metric" key={label}>
            <Icon />
            <b>{value}</b>
            <span>{label}</span>
            <em>{trend}</em>
          </article>
        ))}
      </section>

      <section className="dashboard-grid cms-grid">
        <AdminCard title="Activites recentes">
          <ul className="activity-list">
            {recentActivities.map(([title, text, time]) => (
              <li key={title + time}><i /> <div><b>{title}</b><span>{text}</span></div><small>{time}</small></li>
            ))}
          </ul>
        </AdminCard>
        <AdminCard title="Contenus recents">
          <DataTable headers={['Titre', 'Type', 'Statut', 'Derniere modification']} rows={recentContents} />
        </AdminCard>
        <AdminCard title="Actions rapides">
          <div className="quick-admin">
            <button><Edit3 className="quick-admin-icon" /> Creer un article</button>
            <button><FileText className="quick-admin-icon" /> Ajouter une page</button>
            <button><Image className="quick-admin-icon" /> Televerser des photos</button>
            <button><Video className="quick-admin-icon" /> Ajouter une video</button>
            <button><Upload className="quick-admin-icon" /> Televerser un rapport</button>
            <button><MessageSquareQuote className="quick-admin-icon" /> Ajouter un temoignage</button>
            <button className="wide-action"><FolderOpen className="quick-admin-icon" /> Voir toutes les categories</button>
          </div>
        </AdminCard>
        <AdminCard title="Espace de stockage">
          <div className="storage-box"><div className="donut"><b>68%<small>utilise</small></b></div><div><b>6.8 Go</b><span>Espace utilise</span><b>10 Go</b><span>Espace total</span><b>1 248</b><span>Fichiers</span></div></div>
        </AdminCard>
        <AdminCard title="Evolution des contenus">
          <BarChart />
        </AdminCard>
        <AdminCard title="Repartition par type de contenu">
          <div className="donut"><b>268<small>Contenus</small></b></div>
        </AdminCard>
      </section>
    </>
  )
}
