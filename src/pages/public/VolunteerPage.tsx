import { Award, GraduationCap, HandHeart, Send, Users } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'
import { Stat } from '../../components/common/Stat'
import { addStoreItem, makeId } from '../../data/appStore'
import { brand } from '../../data/brand'
import { checkHoneypot, checkRateLimit, isValidEmail, isValidPhone, sanitizeText, validateRequired } from '../../utils/formSecurity'

const domains = ['Nettoyage', 'Reboisement', 'Sensibilisation', 'Collecte de donn\u00e9es', 'Communication', 'Logistique']
const communes = ['Lemba', 'Limete', 'Gombe', 'Matete', 'Ngaliema', 'Masina', "N'djili", 'Bandalungwa']

export function VolunteerPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  function submitVolunteer(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (!checkHoneypot(form)) return
    const name = sanitizeText(form.get('name'), 120)
    const phone = sanitizeText(form.get('phone'), 60)
    const email = sanitizeText(form.get('email'), 160)
    const commune = sanitizeText(form.get('commune'), 80)
    const domain = sanitizeText(form.get('domain'), 80)
    const required = validateRequired([['Nom complet', name], ['Telephone', phone], ['Commune', commune], ['Domaine', domain]])
    const rateLimit = checkRateLimit('volunteer')

    if (!required.ok || !isValidPhone(phone) || (email && !isValidEmail(email)) || !rateLimit.ok) {
      setError(required.message || (!isValidPhone(phone) ? 'Veuillez entrer un numero de telephone valide.' : !isValidEmail(email) && email ? 'Veuillez entrer une adresse email valide.' : rateLimit.message || 'Envoi bloque.'))
      setSent(false)
      return
    }

    addStoreItem('volunteers', {
      id: makeId('VOL'),
      name,
      phone,
      email,
      commune,
      domain,
      status: 'Nouvelle candidature',
      createdAt: new Date().toISOString(),
    })
    setError('')
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <main className="mock-page volunteer-page">
      <HeroSlider
        pageKey="volunteer"
        className="volunteer-hero"
        actions={[
          { label: 'Rejoindre maintenant', to: '/benevolat' },
          { label: 'Voir les missions', to: '/actions', variant: 'outline' },
        ]}
      >
        <form className="volunteer-form panel" onSubmit={submitVolunteer}>
          <h2>Rejoignez-nous</h2>
          {error && <p className="form-error" role="alert">{error}</p>}
          {sent && <p className="success">Candidature enregistr\u00e9e. L'\u00e9quipe {brand.organization} vous contactera.</p>}
          <label className="hp-field">Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <label>Nom complet<input name="name" placeholder="Votre nom complet" required /></label>
          <label>T\u00e9l\u00e9phone<input name="phone" placeholder={brand.phone} required /></label>
          <label>Email<input name="email" type="email" placeholder="votre@email.com" /></label>
          <label>Commune<select name="commune" required><option value="">S\u00e9lectionnez votre commune</option>{communes.map((commune) => <option key={commune}>{commune}</option>)}</select></label>
          <label>Domaine<select name="domain" required>{domains.map((domain) => <option key={domain}>{domain}</option>)}</select></label>
          <button className="btn primary">Soumettre ma candidature <Send /></button>
        </form>
      </HeroSlider>
      <section className="stat-strip mock-stat-strip"><Stat value="18 750" label="B\u00e9n\u00e9voles mobilis\u00e9s" /><Stat value="320" label="Missions r\u00e9alis\u00e9es" /><Stat value="156" label="Quartiers impact\u00e9s" /><Stat value="95%" label="Taux de satisfaction" /></section>
      <section className="mock-grid four-cols">{[[HandHeart, 'Impact r\u00e9el'], [GraduationCap, 'Formation'], [Users, 'R\u00e9seau'], [Award, 'Reconnaissance']].map(([Icon, title]) => <article className="panel" key={String(title)}><Icon /><h2>{String(title)}</h2><p>Participez \u00e0 des actions concr\u00e8tes et d\u00e9veloppez vos comp\u00e9tences.</p></article>)}</section>
      <section className="campaign-cards compact">{domains.map((domain) => <article key={domain}><div className="photo-band" /><h3>{domain}</h3><p>Contribuez aux missions de {domain.toLowerCase()} sur le terrain.</p></article>)}</section>
      <section className="process-row wide">{['Inscription', 'Validation', 'Formation', 'Participation', 'Certification'].map((step, index) => <section key={step}><b>{index + 1}</b><h3>{step}</h3><p>Une progression simple pour rejoindre les actions.</p></section>)}</section>
      <section className="mock-cta"><h2>Pr\u00eat \u00e0 faire la diff\u00e9rence ?</h2><p>Votre engagement peut transformer notre ville.</p><Link className="btn light" to="/benevolat">Devenir b\u00e9n\u00e9vole maintenant</Link></section>
    </main>
  )
}
