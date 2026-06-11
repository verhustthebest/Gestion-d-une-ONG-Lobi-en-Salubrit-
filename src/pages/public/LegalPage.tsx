import { brand } from '../../data/brand'

export function LegalPage() {
  return (
    <main className="mock-page legal-page">
      <section className="mock-hero slim-hero">
        <div>
          <small>Accueil &gt; Mentions légales</small>
          <h1>Mentions <span>légales</span></h1>
          <p>Informations relatives à l'édition, au contact et à l'utilisation du site {brand.siteName}.</p>
        </div>
      </section>
      <section className="legal-content panel">
        <h2>Éditeur du site</h2>
        <p>{brand.siteName} est édité par {brand.organization}, initiative citoyenne engagée pour la salubrité urbaine à Kinshasa.</p>
        <h2>Coordonnées</h2>
        <p>{brand.address}</p>
        <p>Téléphone : {brand.phone}</p>
        <p>Email : {brand.email}</p>
        <h2>Responsabilité</h2>
        <p>Les informations publiées sont fournies à titre informatif. {brand.organization} veille à leur mise à jour régulière et peut les modifier selon l'évolution des actions terrain.</p>
        <h2>Propriété intellectuelle</h2>
        <p>Les textes, visuels, logos et contenus du site appartiennent à {brand.organization} ou à ses partenaires autorisés. Toute réutilisation doit faire l'objet d'une autorisation préalable.</p>
      </section>
    </main>
  )
}
