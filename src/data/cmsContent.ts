import { useEffect, useState } from 'react'

export type CmsPageKey = 'home' | 'about' | 'actions' | 'map' | 'news' | 'volunteer' | 'report' | 'donate' | 'contact' | 'impact'

export type CmsPageContent = {
  key: CmsPageKey
  title: string
  eyebrow: string
  text: string
  infoTitle: string
  infoText: string
  slides: string[]
  status: 'Publie' | 'Brouillon'
  updatedAt: string
}

export const defaultCmsPages: Record<CmsPageKey, CmsPageContent> = {
  home: {
    key: 'home',
    eyebrow: 'ONG LOBI',
    title: 'Ensemble pour une Kinshasa propre, saine et durable.',
    text: 'Signalez, agissez, soutenez. Chaque geste compte pour une ville plus propre et un avenir meilleur.',
    infoTitle: 'Impact reel',
    infoText: '+18 750 citoyens engages dans les actions terrain.',
    slides: ['/photos/tof1.jpg', '/photos/tof2.jpg', '/photos/tof3.jpg', '/photos/tof4.jpg', '/photos/tof5.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  about: {
    key: 'about',
    eyebrow: 'Accueil > A propos',
    title: 'A propos de Kinshasa Propre',
    text: "La plateforme citoyenne de l'ONG LOBI mobilise les communautes pour lutter contre l'insalubrite urbaine.",
    infoTitle: 'Mission',
    infoText: 'Mobiliser, intervenir, mesurer et publier les resultats.',
    slides: ['/photos/tof1.jpg', '/photos/tof5.jpg', '/photos/tof2.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  actions: {
    key: 'actions',
    eyebrow: 'Campagnes terrain',
    title: 'Nos actions pour une Kinshasa plus propre.',
    text: 'Decouvrez les campagnes, operations et projets qui transforment durablement les quartiers de Kinshasa.',
    infoTitle: 'Campagne prioritaire',
    infoText: 'Nettoyons Limete mobilise les equipes, benevoles et partenaires cette semaine.',
    slides: ['/photos/tof3.jpg', '/photos/tof5.jpg', '/photos/tof2.jpg', '/photos/tof4.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  map: {
    key: 'map',
    eyebrow: 'Carte citoyenne',
    title: 'Carte citoyenne des interventions',
    text: 'Consultez les signalements, filtrez les operations et suivez les resultats dans votre commune.',
    infoTitle: 'Suivi public',
    infoText: 'Les signalements citoyens deviennent des interventions suivies.',
    slides: ['/photos/tof4.jpg', '/photos/tof3.jpg', '/photos/tof2.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  news: {
    key: 'news',
    eyebrow: 'Actualites & evenements',
    title: 'Actualites et evenements terrain',
    text: 'Suivez les videos, les nouvelles campagnes, les resultats terrain et les rendez-vous communautaires.',
    infoTitle: 'A la une',
    infoText: 'Grande operation de nettoyage a Limete ce samedi avec les equipes locales.',
    slides: ['/photos/tof3.jpg', '/photos/tof5.jpg', '/photos/tof2.jpg', '/photos/tof4.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  volunteer: {
    key: 'volunteer',
    eyebrow: 'Engagement citoyen',
    title: 'Devenez benevole et transformez votre quartier.',
    text: 'Rejoignez une communaute de citoyens engages pour une Kinshasa plus propre, plus saine et plus durable.',
    infoTitle: 'Besoin terrain',
    infoText: 'Nettoyage, sensibilisation, reboisement, communication et logistique.',
    slides: ['/photos/tof2.jpg', '/photos/tof3.jpg', '/photos/tof5.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  report: {
    key: 'report',
    eyebrow: 'Signalement citoyen',
    title: 'Signaler une zone insalubre',
    text: 'Aidez-nous a identifier rapidement les problemes de salubrite dans votre commune.',
    infoTitle: 'Action rapide',
    infoText: 'Chaque signalement alimente la file de traitement de l equipe terrain.',
    slides: ['/photos/tof4.jpg', '/photos/tof3.jpg', '/photos/tof2.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  donate: {
    key: 'donate',
    eyebrow: 'Soutien',
    title: 'Votre don peut transformer un quartier entier.',
    text: 'Chaque contribution aide a financer des operations de nettoyage, de sensibilisation et de reboisement.',
    infoTitle: 'Transparence',
    infoText: 'Les dons financent les campagnes, le materiel, la logistique et la sensibilisation.',
    slides: ['/photos/tof3.jpg', '/photos/tof4.jpg', '/photos/tof5.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  contact: {
    key: 'contact',
    eyebrow: 'Contact',
    title: 'Contactez-nous',
    text: "Une question, un partenariat, une proposition ou un besoin d'information ? Notre equipe est a votre ecoute.",
    infoTitle: 'Reponse rapide',
    infoText: 'Partenariats, dons, presse, benevolat et coordination terrain.',
    slides: ['/photos/tof1.jpg', '/photos/tof2.jpg', '/photos/tof5.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
  impact: {
    key: 'impact',
    eyebrow: 'Resultats & impact',
    title: 'Des resultats mesurables pour une Kinshasa plus propre.',
    text: "Decouvrez les resultats de nos actions grace a l'engagement des citoyens, benevoles, partenaires et donateurs.",
    infoTitle: 'Impact publie',
    infoText: 'Dechets collectes, quartiers assainis, arbres plantes et citoyens sensibilises.',
    slides: ['/photos/tof5.jpg', '/photos/tof3.jpg', '/photos/tof4.jpg'],
    status: 'Publie',
    updatedAt: '2026-06-10',
  },
}

const cmsStorageKey = 'onglobi.cms.pages'

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function readCmsPages() {
  if (!canUseStorage()) return defaultCmsPages
  const raw = window.localStorage.getItem(cmsStorageKey)
  if (!raw) return defaultCmsPages
  try {
    return { ...defaultCmsPages, ...JSON.parse(raw) } as Record<CmsPageKey, CmsPageContent>
  } catch {
    return defaultCmsPages
  }
}

export function writeCmsPage(page: CmsPageContent) {
  if (!canUseStorage()) return
  const next = { ...readCmsPages(), [page.key]: page }
  window.localStorage.setItem(cmsStorageKey, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('onglobi-cms', { detail: page.key }))
}

export function useCmsPage(key: CmsPageKey) {
  const [page, setPage] = useState(() => readCmsPages()[key])

  useEffect(() => {
    function sync() {
      setPage(readCmsPages()[key])
    }

    window.addEventListener('onglobi-cms', sync)
    window.addEventListener('storage', sync)
    return () => {
      window.removeEventListener('onglobi-cms', sync)
      window.removeEventListener('storage', sync)
    }
  }, [key])

  return page
}
