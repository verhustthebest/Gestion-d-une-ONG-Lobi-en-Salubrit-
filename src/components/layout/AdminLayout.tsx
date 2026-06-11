import {
  ArrowLeft,
  FileText,
  HandHeart,
  Image,
  LayoutDashboard,
  Map,
  Menu,
  MessageSquareWarning,
  Newspaper,
  Settings,
  Sparkles,
  Users,
  Video,
} from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { Logo } from '../common/Logo'

const adminLinks = [
  [LayoutDashboard, 'Tableau de bord', '/admin'],
  [FileText, 'Pages du site', '/admin/pages'],
  [Menu, 'Menus', '/admin/menus'],
  [Newspaper, 'Articles / Blog', '/admin/articles'],
  [MessageSquareWarning, 'Signalements', '/admin/signalements'],
  [Map, 'Interventions', '/admin/interventions'],
  [Image, 'Médias', '/admin/medias'],
  [Video, 'Vidéos', '/admin/videos'],
  [Users, 'Témoignages', '/admin/temoignages'],
  [HandHeart, 'Partenaires', '/admin/partenaires'],
  [Sparkles, 'FAQ', '/admin/faq'],
  [Settings, 'SEO', '/admin/seo'],
] as const

const adminSessionKey = 'onglobi.admin.session'
const adminPasscode = import.meta.env.VITE_ADMIN_PASSCODE || 'ONGLOBI-ADMIN-2026'

export function AdminLayout() {
  const [open, setOpen] = useState(false)
  const [unlocked, setUnlocked] = useState(() => window.sessionStorage.getItem(adminSessionKey) === 'ok')
  const [error, setError] = useState('')

  function unlock(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    const passcode = String(form.get('passcode') || '').trim()

    if (passcode !== adminPasscode) {
      setError("Code d'accès incorrect.")
      return
    }

    window.sessionStorage.setItem(adminSessionKey, 'ok')
    setError('')
    setUnlocked(true)
  }

  function lock() {
    window.sessionStorage.removeItem(adminSessionKey)
    setUnlocked(false)
  }

  if (!unlocked) {
    return (
      <main className="admin-login">
        <form className="admin-login-card" onSubmit={unlock}>
          <Logo />
          <span>ADMINISTRATION SÉCURISÉE</span>
          <h1>Accès au CMS</h1>
          <p>Entrez le code administrateur pour gérer les pages, signalements, médias et contenus du site.</p>
          {error && <p className="form-error" role="alert">{error}</p>}
          <label>Code administrateur<input name="passcode" type="password" autoComplete="current-password" required /></label>
          <button className="btn primary">Se connecter</button>
          <Link className="btn outline" to="/"><ArrowLeft /> Retour au site public</Link>
        </form>
      </main>
    )
  }

  return (
    <div className="admin-shell">
      <aside className={open ? 'open' : ''}>
        <Logo inverse />
        <small>ADMINISTRATION</small>
        <nav>
          {adminLinks.slice(0, 6).map(([Icon, label, path]) => (
            <NavLink end={path === '/admin'} to={path} key={label} onClick={() => setOpen(false)}>
              <Icon className="nav-icon" />
              {label}
            </NavLink>
          ))}
        </nav>
        <small>CONTENU DU SITE</small>
        <nav>
          {adminLinks.slice(6).map(([Icon, label, path]) => (
            <NavLink to={path} key={label} onClick={() => setOpen(false)}>
              <Icon className="nav-icon" />
              {label}
            </NavLink>
          ))}
        </nav>
        <div className="side-bottom">
          <div className="user">
            <span>MB</span>
            <div><b>Matondo Banza</b><small>Administrateur</small></div>
          </div>
          <button className="logout-link" type="button" onClick={lock}>Verrouiller l'admin</button>
          <Link to="/"><ArrowLeft /> Voir le site public</Link>
        </div>
      </aside>
      <div className="admin-content">
        <button className="admin-menu" onClick={() => setOpen(!open)}><Menu /></button>
        <Outlet />
      </div>
    </div>
  )
}
