import { Camera, CheckCircle, Headphones, MapPin, Megaphone, Send, ShieldCheck } from 'lucide-react'
import { useState } from 'react'
import type { ChangeEvent, FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'
import { MapVisual } from '../../components/common/MapVisual'
import { Stat } from '../../components/common/Stat'
import { addStoreItem, fileToDataUrl, makeId } from '../../data/appStore'
import { brand } from '../../data/brand'
import { checkHoneypot, checkRateLimit, sanitizeText, validateRequired } from '../../utils/formSecurity'

const communes = ['Lemba', 'Limete', 'Gombe', 'Matete', 'Ngaliema', 'Masina', "N'djili", 'Bandalungwa']
const problems = ['D\u00e9p\u00f4t sauvage', 'Caniveau bouch\u00e9', 'D\u00e9chets de march\u00e9', 'Pollution rivi\u00e8re / lac', 'D\u00e9charge informelle', "Abattage d'arbres"]

export function ReportPage() {
  const [sentId, setSentId] = useState('')
  const [photo, setPhoto] = useState('')
  const [problemType, setProblemType] = useState(problems[0])
  const [urgency, setUrgency] = useState('Moyenne')
  const [error, setError] = useState('')

  async function selectPhoto(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0]
    if (!file) return
    setPhoto(await fileToDataUrl(file))
  }

  function submitReport(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (!checkHoneypot(form)) return
    const location = sanitizeText(form.get('location'), 180)
    const commune = sanitizeText(form.get('commune'), 80)
    const description = sanitizeText(form.get('description'), 1800)
    const required = validateRequired([['Localisation', location], ['Commune', commune], ['Description', description]])
    const rateLimit = checkRateLimit('report', 60)

    if (!required.ok || !rateLimit.ok) {
      setError(required.message || rateLimit.message || 'Signalement bloque.')
      return
    }

    const id = makeId('SIG')
    addStoreItem('reports', {
      id,
      location,
      commune,
      problemType,
      description,
      urgency,
      status: 'Signalement re\u00e7u',
      photo,
      createdAt: new Date().toISOString(),
    })
    setError('')
    setSentId(id)
    setPhoto('')
    event.currentTarget.reset()
  }

  return (
    <main className="mock-page">
      <HeroSlider pageKey="report" className="report-hero">
        <Megaphone className="hero-panel-icon" />
      </HeroSlider>
      <section className="steps-bar"><span className="active">1 Localiser</span><span>2 D\u00e9crire</span><span>3 Ajouter une photo</span><span>4 Envoyer</span></section>
      <section className="report-layout">
        <article className="panel">
          <h2>1. Localisation de la zone</h2>
          <input form="report-form" name="location" placeholder="Avenue, quartier ou rep\u00e8re..." required />
          <label className="field-label">Commune<select form="report-form" name="commune" required><option value="">S\u00e9lectionnez</option>{communes.map((commune) => <option key={commune}>{commune}</option>)}</select></label>
          <MapVisual />
          <button className="btn outline" type="button"><MapPin /> Utiliser ma position</button>
        </article>
        <form id="report-form" className="panel" onSubmit={submitReport}>
          <h2>2. Type de probl\u00e8me</h2>
          {error && <p className="form-error" role="alert">{error}</p>}
          <label className="hp-field">Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className="problem-grid">{problems.map((item) => <button className={problemType === item ? 'active' : ''} type="button" onClick={() => setProblemType(item)} key={item}>{item}</button>)}</div>
          <h2>3. Description du probl\u00e8me</h2>
          <textarea name="description" placeholder="D\u00e9crivez la situation, les risques et les rep\u00e8res utiles..." required />
          <h2>Niveau d'urgence</h2>
          <div className="urgency-row">{['Faible', 'Moyenne', '\u00c9lev\u00e9e'].map((level) => <button key={level} type="button" className={urgency === level ? 'active' : level === '\u00c9lev\u00e9e' ? 'danger' : ''} onClick={() => setUrgency(level)}>{level}</button>)}</div>
          <h2>4. Ajouter des photos</h2>
          <label className="upload-box"><Camera /> Cliquez ou glissez-d\u00e9posez vos photos ici<input type="file" accept="image/*" onChange={selectPhoto} hidden /></label>
          {photo && <img className="report-preview" src={photo} alt="Aper\u00e7u du signalement" />}
          <button className="btn primary" type="submit">Envoyer le signalement <Send /></button>
          <small><ShieldCheck /> Vos donn\u00e9es sont s\u00e9curis\u00e9es et utilis\u00e9es uniquement pour am\u00e9liorer la salubrit\u00e9 de Kinshasa.</small>
        </form>
        <aside className="panel thanks-panel">
          <CheckCircle />
          <h2>Merci !</h2>
          <p>{sentId ? 'Votre signalement a \u00e9t\u00e9 enregistr\u00e9 avec succ\u00e8s.' : 'Votre num\u00e9ro appara\u00eetra ici apr\u00e8s envoi.'}</p>
          <b>{sentId || 'SIG-...'}</b>
          <Link className="btn primary" to="/carte">Voir sur la carte</Link>
          <Link className="btn outline" to="/contact">Suivre ce signalement</Link>
          <p><Headphones /> Besoin d'aide ? {brand.phone}</p>
        </aside>
      </section>
      <section className="mock-grid">
        <article className="panel"><h2>Pourquoi signaler ?</h2><ul><li>Action rapide</li><li>R\u00e9sultats visibles</li><li>Transparence</li><li>Impact durable</li></ul></article>
        <article className="panel"><h2>Nos impacts en chiffres</h2><div className="compact-stats"><Stat value="2 540" label="Tonnes de d\u00e9chets collect\u00e9es" /><Stat value="18 750" label="B\u00e9n\u00e9voles mobilis\u00e9s" /><Stat value="156" label="Quartiers assainis" /><Stat value="12 340" label="Arbres plant\u00e9s" /></div></article>
        <article className="panel"><h2>FAQ rapide</h2>{['Qui peut faire un signalement ?', "Est-ce que c'est gratuit ?", 'Puis-je rester anonyme ?', 'Combien de temps avant une intervention ?'].map((q) => <button className="faq-line" key={q}>{q}</button>)}</article>
      </section>
    </main>
  )
}
