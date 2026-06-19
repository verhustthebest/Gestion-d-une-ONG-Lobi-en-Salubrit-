import { Plus, Search, Settings, X } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { useLocation } from 'react-router-dom'
import { AdminCard } from '../../components/admin/AdminCard'
import { AdminHeader } from '../../components/admin/AdminHeader'
import { DataTable } from '../../components/admin/DataTable'
import { Timeline } from '../../components/admin/Timeline'
import { makeCollectionId, readCmsCollections, writeCmsCollection } from '../../data/cmsCollections'
import type { CmsCollectionItem } from '../../data/cmsCollections'
import { moduleMeta } from '../../data/siteData'
import type { ModuleKey } from '../../types'

function isModuleKey(value: string | undefined): value is ModuleKey {
  return Boolean(value && value in moduleMeta)
}

export function AdminModulePage() {
  const location = useLocation()
  const segment = location.pathname.split('/').filter(Boolean).at(-1)
  const moduleKey: ModuleKey = isModuleKey(segment) ? segment : 'articles'
  const meta = moduleMeta[moduleKey]
  const [collections, setCollections] = useState(() => readCmsCollections())
  const [editing, setEditing] = useState<CmsCollectionItem | null>(null)
  const [creating, setCreating] = useState(false)
  const items = collections[moduleKey]

  function refresh(nextItems: CmsCollectionItem[]) {
    writeCmsCollection(moduleKey, nextItems)
    setCollections(readCmsCollections())
  }

  function saveItem(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const cells = meta.headers.map((header) => String(form.get(header) || '').trim())
    const nextItem: CmsCollectionItem = {
      id: editing?.id || makeCollectionId(moduleKey),
      cells,
      updatedAt: new Date().toLocaleDateString('fr-FR'),
    }
    const nextItems = editing
      ? items.map((item) => (item.id === editing.id ? nextItem : item))
      : [nextItem, ...items]

    refresh(nextItems)
    setEditing(null)
    setCreating(false)
  }

  function deleteItem(itemId: string) {
    refresh(items.filter((item) => item.id !== itemId))
  }

  const rows = items.map((item) => [
    ...item.cells,
    <div className="inline-actions" key={item.id}>
      <button className="table-action" type="button" onClick={() => setEditing(item)}>Modifier</button>
      <button className="table-action danger" type="button" onClick={() => deleteItem(item.id)}>Supprimer</button>
    </div>,
  ])
  const editedItem = editing || { id: '', cells: meta.headers.map(() => ''), updatedAt: '' }

  return (
    <>
      <AdminHeader title={meta.title} subtitle={meta.subtitle} action={meta.action} />
      <div className="module-toolbar">
        <label><Search /><input placeholder={`Rechercher dans ${meta.title.toLowerCase()}...`} /></label>
        <button className="btn primary" type="button" onClick={() => setCreating(true)}><Plus /> {meta.action}</button>
      </div>
      <section className="dashboard-grid">
        <AdminCard title="Contenus" wide>
          <DataTable headers={[...meta.headers, 'Action']} rows={rows} showActions={false} />
        </AdminCard>
        <AdminCard title="Qualite">
          <div className="module-score"><b>{items.length}</b><span>Contenus geres</span></div>
        </AdminCard>
        <AdminCard title="Historique"><Timeline /></AdminCard>
        <AdminCard title="Publication" wide>
          <div className="publish-box"><Settings /><b>Workflow local actif</b><span>Les contenus crees ici sont conserves dans le stockage local du navigateur.</span></div>
        </AdminCard>
      </section>
      {(editing || creating) && (
        <div className="modal-backdrop">
          <form className="editor cms-editor" onSubmit={saveItem}>
            <header>
              <div><span>CONTENU CMS</span><h2>{editing ? 'Modifier' : meta.action}</h2></div>
              <button type="button" onClick={() => { setEditing(null); setCreating(false) }}><X /></button>
            </header>
            {meta.headers.map((header, index) => (
              <label key={header}>
                {header}
                <input name={header} defaultValue={editedItem.cells[index] || ''} required={index === 0} />
              </label>
            ))}
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
