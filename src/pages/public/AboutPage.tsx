import { Download, Eye, Heart, Lightbulb, ShieldCheck, Target, UserRoundCheck } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'
import { MapVisual } from '../../components/common/MapVisual'
import { Stat } from '../../components/common/Stat'
import { brand } from '../../data/brand'

const values = [
  [ShieldCheck, 'Transparence', 'Nous agissons avec honn\u00eatet\u00e9 et partageons nos r\u00e9sultats.'],
  [Heart, 'Engagement', "Nous investissons pleinement pour l'impact collectif."],
  [Lightbulb, 'Innovation', 'Nous adoptons des id\u00e9es nouvelles pour des solutions durables.'],
  [UserRoundCheck, 'Solidarit\u00e9', "Nous croyons en la force du collectif et de l'entraide communautaire."],
] as const

export function AboutPage() {
  return (
    <main className="mock-page">
      <HeroSlider
        pageKey="about"
        className="slim-hero"
        actions={[
          { label: 'Faire un don', to: '/don', icon: <Heart /> },
          { label: 'Devenir partenaire', to: '/contact', variant: 'light' },
          { label: 'Telecharger notre rapport', to: '/resultats-impact', variant: 'outline', icon: <Download /> },
        ]}
      />
      <section className="about-layout">
        <article className="panel"><Target /><h2>Notre mission</h2><p>{'Mobiliser les citoyens, les organisations et les partenaires pour am\u00e9liorer durablement la salubrit\u00e9 urbaine \u00e0 Kinshasa \u00e0 travers des actions concr\u00e8tes et inclusives.'}</p></article>
        <article className="panel"><Eye /><h2>Notre vision</h2><p>{'Faire de Kinshasa une r\u00e9f\u00e9rence africaine en mati\u00e8re de participation citoyenne, d\'innovation et de durabilit\u00e9 environnementale.'}</p></article>
        <article className="panel values-panel"><h2>Nos valeurs</h2><div>{values.map(([Icon, title, text]) => <section key={title}><Icon /><b>{title}</b><span>{text}</span></section>)}</div></article>
      </section>
      <section className="mock-grid two-cols">
        <article className="panel"><h2>Notre approche</h2><div className="process-row">{['Sensibiliser', 'Mobiliser', 'Intervenir', 'Mesurer'].map((step, index) => <section key={step}><b>{index + 1}</b><h3>{step}</h3><p>{'Des actions suivies, coordonn\u00e9es et mesur\u00e9es.'}</p></section>)}</div></article>
        <article className="panel"><h2>Notre impact en chiffres</h2><div className="compact-stats"><Stat value="2 540" label={'tonnes de d\u00e9chets collect\u00e9es'} /><Stat value="18 750" label={'b\u00e9n\u00e9voles mobilis\u00e9s'} /><Stat value="156" label="quartiers assainis" /><Stat value="12 340" label={'arbres plant\u00e9s'} /></div></article>
      </section>
      <section className="mock-grid two-cols">
        <article className="panel president-profile">
          <h2>{'Notre Pr\u00e9sident'}</h2>
          <div className="president-card">
            <img src="/photos/tof1.jpg" alt={`Portrait terrain de ${brand.president}`} />
            <div>
              <span className="badge publie">{'PR\u00c9SIDENT'}</span>
              <h3>{brand.president}</h3>
              <p>{`Pr\u00e9sident de ${brand.organization}`}</p>
              <small>{'Visionnaire et engag\u00e9, il guide la mission pour une Kinshasa plus propre, plus saine et plus durable.'}</small>
            </div>
          </div>
        </article>
        <article className="panel"><h2>Gouvernance & organisation</h2><div className="org-chart"><b>{'Assembl\u00e9e g\u00e9n\u00e9rale'}</b><b>Conseil d'administration</b><b>{'Direction ex\u00e9cutive'}</b><span>{'Op\u00e9rations terrain'}</span><span>Communication</span><span>Finances</span><span>Partenariats</span></div></article>
      </section>
      <section className="mock-grid">
        <article className="panel"><h2>Rapports & documents</h2><div className="doc-row">{['Rapport annuel 2024', 'Rapport financier 2024', "Rapport d'impact 2024", 'Plan strat\u00e9gique 2024-2027'].map((doc) => <button key={doc}><Download /> {doc}</button>)}</div></article>
        <article className="panel map-panel-wide"><h2>Carte de nos zones d'impact</h2><MapVisual /></article>
        <article className="panel"><h2>Nos objectifs 2030</h2><ul className="big-targets"><li>100 quartiers assainis</li><li>{'50 000 b\u00e9n\u00e9voles mobilis\u00e9s'}</li><li>{'1 000 000 citoyens sensibilis\u00e9s'}</li><li>{'50 000 arbres plant\u00e9s'}</li></ul></article>
      </section>
      <section className="mock-cta"><h2>Rejoignez le mouvement pour une Kinshasa plus propre, plus saine et plus durable.</h2><div className="actions"><Link className="btn light" to="/benevolat">Devenir b{'\u00e9'}n{'\u00e9'}vole</Link><Link className="btn light" to="/don">Faire un don</Link><Link className="btn light" to="/contact">Devenir partenaire</Link></div></section>
    </main>
  )
}
