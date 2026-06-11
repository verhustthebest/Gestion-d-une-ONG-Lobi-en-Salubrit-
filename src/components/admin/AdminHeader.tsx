import { Bell, Plus, Search } from 'lucide-react'

export function AdminHeader({ title, subtitle, action = 'Nouveau' }: { title: string; subtitle: string; action?: string }) {
  return (
    <header className="admin-header">
      <div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div>
        <label><Search /><input placeholder="Rechercher..." /></label>
        <Bell />
        <button className="btn primary"><Plus /> {action}</button>
      </div>
    </header>
  )
}
