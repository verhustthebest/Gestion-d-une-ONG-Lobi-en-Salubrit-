import { Eye, Save, X } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { DataTable } from '../../components/admin/DataTable'
import { Timeline } from '../../components/admin/Timeline'
import { defaultCmsPages, readCmsPages, writeCmsPage } from '../../data/cmsContent'
import type { CmsPageContent, CmsPageKey } from '../../data/cmsContent'

const pageLabels: Record<CmsPageKey, { title: string; slug: string; owner: string }> = {
  home: { title: 'Accueil', slug: '/', owner: 'CMS' },
  about: { title: 'A propos', slug: '/a-propos', owner: 'Communication' },
  actions: { title: 'Nos actions', slug: '/actions', owner: 'Programmes' },
  map: { title: 'Carte citoyenne', slug: '/carte', owner: 'Terrain' },
  news: { title: 'Actualites', slug: '/actualites', owner: 'Communication' },
  volunteer: { title: 'Devenir benevole', slug: '/benevolat', owner: 'Mobilisation' },
  report: { title: 'Signalement', slug: '/signaler', owner: 'Terrain' },
  donate: { title: 'Le don', slug: '/don', owner: 'Partenariats' },
  contact: { title: 'Contact', slug: '/contact', owner: 'Accueil' },
  impact: { title: 'Resultats & impact', slug: '/resultats-impact', owner: 'Direction' },
}

const pageOrder = Object.keys(defaultCmsPages) as CmsPageKey[]

export function PagesAdmin() {
  const [pages, setPages] = useState(() => readCmsPages())
  const [editingKey, setEditingKey] = useState<CmsPageKey>('home')
  const [editing, setEditing] = useState(false)
  const editingPage = pages[editingKey]

  function openEditor(key: CmsPageKey) {
    setEditingKey(key)
    setEditing(true)
  }

  function savePage(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const nextPage: CmsPageContent = {
      ...editingPage,
      eyebrow: String(form.get('eyebrow') || '').trim(),
      title: String(form.get('title') || '').trim(),
      text: String(form.get('text') || '').trim(),
      infoTitle: String(form.get('infoTitle') || '').trim(),
      infoText: String(form.get('infoText') || '').trim(),
      slides: String(form.get('slides') || '')
        .split('\n')
        .map((line) => line.trim())
        .filter(Boolean),
      status: String(form.get('status')) === 'Brouillon' ? 'Brouillon' : 'Publie',
      updatedAt: new Date().toLocaleDateString('fr-FR'),
    }

    writeCmsPage(nextPage)
    setPages(readCmsPages())
    setEditing(false)
  }

  const rows = pageOrder.map((key) => {
    const label = pageLabels[key]
    const page = pages[key]
    return [
      label.title,
      label.slug,
      'Page publique',
      page.status,
      label.owner,
      <button className="table-action" type="button" onClick={() => openEditor(key)} key={key}>Modifier</button>,
    ]
  })

  return (
    <>
      <AdminHeader title="Pages du site" subtitle="Editez les contenus principaux visibles sur le site public" action="Nouvelle page" />
      <section className="dashboard-grid">
        <AdminCard title="Pages publiees" wide>
          <DataTable headers={['Titre', 'URL', 'Type', 'Statut', 'Responsable', 'Action']} rows={rows} showActions={false} />
          <div className="edit-buttons">
            <button type="button" onClick={() => openEditor('home')}><Save /> Modifier Accueil</button>
            <Link className="btn outline" to="/" target="_blank"><Eye /> Previsualiser</Link>
          </div>
        </AdminCard>
        <AdminCard title="Historique"><Timeline /></AdminCard>
      </section>
      {editing && (
        <div className="modal-backdrop">
          <form className="editor cms-editor" onSubmit={savePage}>
            <header>
              <div><span>EDITION CMS</span><h2>{pageLabels[editingKey].title}</h2></div>
              <button type="button" onClick={() => setEditing(false)}><X /></button>
            </header>
            <label>Sur-titre<input name="eyebrow" defaultValue={editingPage.eyebrow} /></label>
            <label>Titre hero<input name="title" defaultValue={editingPage.title} required /></label>
            <label>Texte principal<textarea name="text" defaultValue={editingPage.text} required /></label>
            <label>Titre du panneau information<input name="infoTitle" defaultValue={editingPage.infoTitle} /></label>
            <label>Texte du panneau information<textarea name="infoText" defaultValue={editingPage.infoText} /></label>
            <label>Images du slider, une URL par ligne<textarea name="slides" defaultValue={editingPage.slides.join('\n')} /></label>
            <label>Statut<select name="status" defaultValue={editingPage.status}><option>Publie</option><option>Brouillon</option></select></label>
            <div><button className="btn outline" type="button" onClick={() => setEditing(false)}>Annuler</button><button className="btn primary">Enregistrer</button></div>
          </form>
        </div>
      )}
    </>
  )
}
