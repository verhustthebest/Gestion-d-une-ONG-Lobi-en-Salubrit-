import { Building2, HandHeart, Lock, ShieldCheck, Trees, Truck, Users } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'

const amounts = ['5', '10', '25', '50', '100']
const paymentMethods = ['M-Pesa', 'Orange Money', 'Airtel Money', 'Carte bancaire', 'Virement bancaire']
const cleanupSlides = [
  ['/photos/tof3.jpg', '/photos/tof4.jpg'],
  ['/photos/tof2.jpg', '/photos/tof5.jpg'],
]

const campaignMedia = [
  { title: 'Nettoyons Limete', image: '/photos/tof3.jpg', goal: '10 000 $', progress: '78%' },
  { title: 'Kinshasa Verte', image: '/photos/tof5.jpg', goal: '8 000 $', progress: '65%' },
  { title: 'Sensibilisation Jeunesse', image: '/photos/tof2.jpg', goal: '5 000 $', progress: '40%' },
]

export function DonatePage() {
  const [amount, setAmount] = useState('25')

  return (
    <main className="mock-page donation-page">
      <HeroSlider pageKey="donate" className="don-hero">
        <div className="before-after before-after-slider hero-before-after" aria-label={'Avant et apr\u00e8s les op\u00e9rations de nettoyage'}>
          {cleanupSlides.map((pair, index) => (
            <div className="cleanup-slide" key={pair.join('-')} style={{ animationDelay: `${index * 10}s` }}>
              <figure><img src={pair[0]} alt="Lieu avant l'intervention de nettoyage" /><figcaption>AVANT</figcaption></figure>
              <figure><img src={pair[1]} alt={'Lieu apr\u00e8s l\'intervention de nettoyage'} /><figcaption>{'APR\u00c8S'}</figcaption></figure>
            </div>
          ))}
        </div>
      </HeroSlider>
      <section className="donation-layout mock-donation">
        <div>
          <h2>L'impact de votre don</h2>
          <section className="impact-options">
            <article><HandHeart /><b>5 $</b><span>Permet l'achat de sacs de collecte.</span></article>
            <article><Users /><b>10 $</b><span>{'Finance une \u00e9quipe pendant une demi-journ\u00e9e.'}</span></article>
            <article><Building2 /><b>25 $</b><span>{'Permet de sensibiliser une \u00e9cole enti\u00e8re.'}</span></article>
            <article><Trees /><b>50 $</b><span>Permet la plantation de 20 arbres.</span></article>
            <article><Truck /><b>100 $</b><span>{'Finance une mini-op\u00e9ration dans un quartier.'}</span></article>
          </section>
          <section className="campaign-cards compact">
            {campaignMedia.map((campaign) => (
              <article key={campaign.title}>
                <div className="photo-band campaign-photo-real"><img src={campaign.image} alt={`Site de la campagne ${campaign.title}`} /></div>
                <h3>{campaign.title}</h3>
                <p>Objectif : {campaign.goal}</p>
                <div className="progress"><i style={{ width: campaign.progress }} /></div>
                <Link className="btn outline" to="/contact">Contacter l'{'\u00e9'}quipe</Link>
              </article>
            ))}
          </section>
          <section className="mock-grid two-cols">
            <article className="panel"><h2>{'Transparence financi\u00e8re'}</h2><div className="donut" /><ul><li>65% Terrain</li><li>20% Sensibilisation</li><li>10% Logistique</li><li>5% Administration</li></ul></article>
            <article className="panel"><h2>{'Nos r\u00e9sultats gr\u00e2ce \u00e0 vous'}</h2><div className="compact-stats"><b>{'135 250 $ collect\u00e9s depuis 2024'}</b><b>{'95 campagnes financ\u00e9es'}</b><b>{'18 750 donateurs engag\u00e9s'}</b><b>{'156 quartiers impact\u00e9s'}</b></div></article>
          </section>
        </div>
        <aside className="donation-card">
          <h2>Faire un don</h2>
          <b>1. Choisissez un montant</b>
          <div className="amounts">{amounts.map((value) => <button className={amount === value ? 'active' : ''} onClick={() => setAmount(value)} key={value}>${value}</button>)}</div>
          <b>{'2. Fr\u00e9quence'}</b>
          <div className="urgency-row"><button className="active">Don unique</button><button>Don mensuel</button><button>Don trimestriel</button></div>
          <b>3. Mode de paiement</b>
          {paymentMethods.map((method) => <label className="payment-line" key={method}><input type="radio" name="payment" defaultChecked={method === 'M-Pesa'} /> {method}</label>)}
          <div className="don-summary"><span>Montant</span><b>{amount} $</b><span>Campagne</span><b>Nettoyons Limete</b><span>{'Fr\u00e9quence'}</span><b>Don unique</b><span>Mode de paiement</span><b>M-Pesa</b></div>
          <button className="btn primary"><Lock /> Confirmer mon don</button>
          <small><ShieldCheck /> {'Paiement 100% s\u00e9curis\u00e9'}</small>
        </aside>
      </section>
      <section className="mock-cta"><h2>{'Ensemble, finan\u00e7ons une Kinshasa plus propre.'}</h2><p>{'Chaque don, petit ou grand, cr\u00e9e un impact durable dans nos quartiers.'}</p><Link className="btn light" to="/don">Faire un don maintenant</Link></section>
    </main>
  )
}
