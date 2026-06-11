import { Menu, X } from 'lucide-react'
import { useState } from 'react'
import { Link, NavLink, Outlet } from 'react-router-dom'
import { brand } from '../../data/brand'
import { Logo } from '../common/Logo'

export function PublicLayout() {
  const [open, setOpen] = useState(false)

  return (
    <div className="public-shell">
      <header className="public-nav">
        <Logo />
        <button aria-label="Ouvrir le menu" className="menu-button" onClick={() => setOpen(!open)}>
          {open ? <X /> : <Menu />}
        </button>
        <nav className={open ? 'open' : ''} onClick={() => setOpen(false)}>
          <NavLink to="/">Accueil</NavLink>
          <NavLink to="/a-propos">{'\u00c0 propos'}</NavLink>
          <NavLink to="/actions">Nos actions</NavLink>
          <NavLink to="/carte">Carte interactive</NavLink>
          <NavLink to="/actualites">{'Actualit\u00e9s'}</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </nav>
        <Link className="btn dark desktop-only" to="/admin">Se connecter</Link>
      </header>
      <Outlet />
      <footer>
        <div className="footer-brand">
          <Logo inverse />
          <p>{brand.description}</p>
        </div>
        <div>
          <b>Navigation</b>
          <Link to="/">Accueil</Link>
          <Link to="/actions">Nos actions</Link>
          <Link to="/carte">Carte interactive</Link>
          <Link to="/actualites">{'Actualit\u00e9s'}</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div>
          <b>Nos actions</b>
          <Link to="/signaler">Signaler une zone</Link>
          <Link to="/carte">Suivre les interventions</Link>
          <Link to="/benevolat">{'Devenir b\u00e9n\u00e9vole'}</Link>
          <Link to="/don">Faire un don</Link>
          <Link to="/actions">Nos campagnes</Link>
        </div>
        <div>
          <b>Ressources</b>
          <Link to="/resultats-impact">Rapports d'impact</Link>
          <Link to="/resultats-impact">Documents</Link>
          <Link to="/contact">FAQ</Link>
          <Link to="/mentions-legales">{'Mentions l\u00e9gales'}</Link>
          <Link to="/confidentialite">{'Confidentialit\u00e9'}</Link>
        </div>
        <div>
          <b>Contact</b>
          <span>{brand.phone}</span>
          <span>{brand.email}</span>
          <span>{brand.address}</span>
        </div>
        <div>
          <b>{'Restez inform\u00e9'}</b>
          <span>{"Abonnez-vous \u00e0 notre newsletter pour recevoir nos derni\u00e8res actualit\u00e9s et rapports d'impact."}</span>
          <label className="footer-newsletter"><input placeholder="Votre email" /><button>S'abonner</button></label>
          <small>{'Pas de spam, d\u00e9sabonnement facile.'}</small>
        </div>
        <small className="footer-copy">{'\u00a9'} {brand.copyrightYear} {brand.shortName}. {'Tous droits r\u00e9serv\u00e9s.'}</small>
      </footer>
    </div>
  )
}
