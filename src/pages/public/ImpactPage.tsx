import { Download, HandHeart, Heart, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'
import { MapVisual } from '../../components/common/MapVisual'
import { Stat } from '../../components/common/Stat'

export function ImpactPage() {
  return (
    <main className="mock-page">
      <HeroSlider
        pageKey="impact"
        className="impact-hero"
        actions={[
          { label: 'Faire un don', to: '/don', icon: <Heart /> },
          { label: 'Devenir benevole', to: '/benevolat', variant: 'outline', icon: <Users /> },
        ]}
      />
      <section className="stat-strip mock-stat-strip">
        <Stat value="2 540" label="tonnes de dechets collectees" />
        <Stat value="18 750" label="benevoles mobilises" />
        <Stat value="156" label="quartiers assainis" />
        <Stat value="12 340" label="arbres plantes" />
        <Stat value="135 250 $" label="collectes depuis 2024" />
        <Stat value="1 000 000" label="citoyens sensibilises" />
      </section>
      <section className="mock-grid two-cols">
        <article className="panel"><h2>Evolution de notre impact</h2><div className="bar-chart"><i style={{ height: '35%' }} /><i style={{ height: '56%' }} /><i style={{ height: '72%' }} /><i style={{ height: '88%' }} /></div></article>
        <article className="panel"><h2>Carte d'impact</h2><MapVisual /></article>
      </section>
      <section className="mock-grid two-cols">
        <article className="panel"><h2>Transparence financiere</h2><div className="donut" /><ul><li>65% Terrain</li><li>20% Sensibilisation</li><li>10% Logistique</li><li>5% Administration</li></ul></article>
        <article className="panel"><h2>Avant / Apres : des changements visibles</h2><div className="before-row"><span>Caniveaux - Limete</span><span>Marche - Matete</span><span>Decharge sauvage - N'djili</span></div></article>
      </section>
      <section className="panel docs-wide">
        <h2>Rapports telechargeables</h2>
        {['Rapport annuel 2024', "Rapport d'impact 2024", 'Rapport financier 2024', 'Audit externe 2024', 'Plan strategique 2024-2030'].map((doc) => <button key={doc}><Download /> {doc}</button>)}
      </section>
      <section className="mock-cta">
        <h2>Votre soutien permet d'amplifier cet impact.</h2>
        <div className="actions">
          <Link className="btn light" to="/don"><Heart /> Faire un don</Link>
          <Link className="btn light" to="/contact"><HandHeart /> Devenir partenaire</Link>
          <Link className="btn light" to="/resultats-impact"><Download /> Telecharger le rapport</Link>
        </div>
      </section>
    </main>
  )
}
