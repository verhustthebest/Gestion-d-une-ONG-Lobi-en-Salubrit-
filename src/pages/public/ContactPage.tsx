import { Clock, Mail, MapPin, Phone, Send, Upload, Users } from 'lucide-react'
import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'
import { MapVisual } from '../../components/common/MapVisual'
import { addStoreItem, makeId } from '../../data/appStore'
import { brand } from '../../data/brand'
import { checkHoneypot, checkRateLimit, isValidEmail, sanitizeText, validateRequired } from '../../utils/formSecurity'

const contactCards = [
  [MapPin, 'Adresse', brand.address],
  [Phone, 'T\u00e9l\u00e9phone', `${brand.phone} / ${brand.altPhone}`],
  [Mail, 'Email', `${brand.contactEmail} / ${brand.email}`],
  [Clock, 'Horaires', 'Lundi - Vendredi 08h00 - 17h00, Samedi 08h00 - 13h00'],
  [Users, 'WhatsApp', `${brand.phone}, r\u00e9ponse rapide`],
] as const

export function ContactPage() {
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const [mailto, setMailto] = useState('')

  function submitContact(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = new FormData(event.currentTarget)
    if (!checkHoneypot(form)) return
    const name = sanitizeText(form.get('name'), 120)
    const email = sanitizeText(form.get('email'), 160)
    const phone = sanitizeText(form.get('phone'), 60)
    const subject = sanitizeText(form.get('subject'), 120)
    const text = sanitizeText(form.get('message'), 1600)
    const required = validateRequired([['Nom complet', name], ['Email', email], ['Message', text]])
    const rateLimit = checkRateLimit('contact')

    if (!required.ok || !isValidEmail(email) || !rateLimit.ok) {
      setError(required.message || (!isValidEmail(email) ? 'Veuillez entrer une adresse email valide.' : rateLimit.message || 'Envoi bloque.'))
      setSent(false)
      return
    }

    const message = {
      id: makeId('MSG'),
      name,
      email,
      phone,
      subject,
      message: text,
      createdAt: new Date().toISOString(),
    }
    addStoreItem('contacts', message)
    setMailto(`mailto:${brand.contactEmail}?subject=${encodeURIComponent(message.subject)}&body=${encodeURIComponent(`${message.message}\n\n${message.name}\n${message.phone}\n${message.email}`)}`)
    setError('')
    setSent(true)
    event.currentTarget.reset()
  }

  return (
    <main className="mock-page">
      <HeroSlider pageKey="contact" className="contact-hero" />
      <section className="contact-cards">{contactCards.map(([Icon, title, text]) => <article key={title}><Icon /><b>{title}</b><span>{text}</span></article>)}</section>
      <section className="contact-main">
        <form className="panel" onSubmit={submitContact}>
          <h2>Envoyez-nous un message</h2>
          {error && <p className="form-error" role="alert">{error}</p>}
          {sent && <p className="success">Message enregistr\u00e9. <a href={mailto}>Ouvrir votre email</a></p>}
          <label className="hp-field">Site web<input name="website" tabIndex={-1} autoComplete="off" /></label>
          <div className="form-two"><label>Nom complet<input name="name" placeholder="Votre nom complet" required /></label><label>Email<input name="email" type="email" placeholder="votre@email.com" required /></label></div>
          <label>T\u00e9l\u00e9phone<input name="phone" placeholder={brand.phone} /></label>
          <label>Sujet<select name="subject" defaultValue="Partenariat"><option>Partenariat</option><option>B\u00e9n\u00e9volat</option><option>Don & financement</option><option>Signalement</option></select></label>
          <label>Message<textarea name="message" placeholder="D\u00e9crivez votre demande, votre question ou votre proposition..." required /></label>
          <div className="upload-box"><Upload /> Les pi\u00e8ces jointes seront activ\u00e9es avec le backend.</div>
          <button className="btn primary">Envoyer le message <Send /></button>
        </form>
        <article className="panel map-contact"><MapVisual /></article>
      </section>
      <section className="mock-grid two-cols">
        <article className="panel"><h2>Contacts sp\u00e9cialis\u00e9s</h2><div className="special-contact">{['Partenariats', 'Dons & Financements', 'Presse & M\u00e9dias', 'B\u00e9n\u00e9volat'].map((item) => <section key={item}><b>{item}</b><span>Nous \u00e9crire</span></section>)}</div></article>
        <article className="panel"><h2>FAQ rapide</h2>{['Combien de temps pour une r\u00e9ponse ?', 'Puis-je devenir partenaire ?', 'Puis-je organiser une action ?', 'Comment suivre mon signalement ?'].map((q) => <button className="faq-line" key={q}>{q}</button>)}</article>
      </section>
      <section className="mock-cta"><h2>Agissons ensemble pour une Kinshasa plus propre.</h2><div className="actions"><Link className="btn light" to="/don">Faire un don</Link><Link className="btn light" to="/benevolat">Devenir b\u00e9n\u00e9vole</Link><Link className="btn light" to="/signaler">Signaler une zone</Link></div></section>
    </main>
  )
}
