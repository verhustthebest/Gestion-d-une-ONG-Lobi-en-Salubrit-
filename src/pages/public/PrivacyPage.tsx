import { brand } from '../../data/brand'

export function PrivacyPage() {
  return (
    <main className="mock-page legal-page">
      <section className="mock-hero slim-hero">
        <div>
          <small>Accueil &gt; Confidentialité</small>
          <h1>Politique de <span>confidentialité</span></h1>
          <p>Cette page explique comment {brand.organization} protège les informations transmises via le site.</p>
        </div>
      </section>
      <section className="legal-content panel">
        <h2>Données collectées</h2>
        <p>Les formulaires peuvent collecter le nom, le téléphone, l'email, la commune, le message, les informations de signalement et les fichiers transmis volontairement.</p>
        <h2>Utilisation</h2>
        <p>Ces informations servent uniquement à répondre aux demandes, organiser les actions citoyennes, traiter les signalements et améliorer la salubrité urbaine.</p>
        <h2>Conservation</h2>
        <p>Les données sont conservées pendant la durée nécessaire au traitement de la demande ou du signalement, puis archivées ou supprimées selon les besoins opérationnels.</p>
        <h2>Contact</h2>
        <p>Pour toute demande relative à vos données, écrivez à {brand.email} ou appelez {brand.phone}.</p>
      </section>
    </main>
  )
}
