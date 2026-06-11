import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { brand } from '../../data/brand'

const seoByPath: Record<string, { title: string; description: string }> = {
  '/': {
    title: `${brand.siteName} | Accueil`,
    description: brand.description,
  },
  '/a-propos': {
    title: `À propos | ${brand.siteName}`,
    description: `Découvrez la mission, la vision et la gouvernance de ${brand.organization}.`,
  },
  '/actions': {
    title: `Nos actions | ${brand.siteName}`,
    description: 'Campagnes de nettoyage, reboisement, sensibilisation et mobilisation citoyenne à Kinshasa.',
  },
  '/carte': {
    title: `Carte citoyenne | ${brand.siteName}`,
    description: 'Suivez les signalements et interventions de salubrité urbaine à Kinshasa.',
  },
  '/actualites': {
    title: `Actualités | ${brand.siteName}`,
    description: `Nouvelles, événements et résultats terrain de ${brand.shortName}.`,
  },
  '/benevolat': {
    title: `Bénévolat | ${brand.siteName}`,
    description: `Rejoignez les équipes bénévoles de ${brand.organization} pour agir sur le terrain.`,
  },
  '/signaler': {
    title: `Signaler une zone | ${brand.siteName}`,
    description: 'Signalez une zone insalubre et aidez les équipes à prioriser les interventions.',
  },
  '/don': {
    title: `Faire un don | ${brand.siteName}`,
    description: `Soutenez les campagnes de ${brand.shortName} avec un don transparent et utile.`,
  },
  '/contact': {
    title: `Contact | ${brand.siteName}`,
    description: `Contactez ${brand.organization} pour une question, un partenariat ou une proposition.`,
  },
  '/resultats-impact': {
    title: `Résultats et impact | ${brand.siteName}`,
    description: 'Consultez les indicateurs, rapports et résultats des actions citoyennes.',
  },
  '/mentions-legales': {
    title: `Mentions légales | ${brand.siteName}`,
    description: `Informations légales de ${brand.siteName}.`,
  },
  '/confidentialite': {
    title: `Confidentialité | ${brand.siteName}`,
    description: `Politique de confidentialité de ${brand.siteName}.`,
  },
}

function setMeta(name: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[name="${name}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.name = name
    document.head.appendChild(tag)
  }
  tag.content = content
}

function setProperty(property: string, content: string) {
  let tag = document.querySelector<HTMLMetaElement>(`meta[property="${property}"]`)
  if (!tag) {
    tag = document.createElement('meta')
    tag.setAttribute('property', property)
    document.head.appendChild(tag)
  }
  tag.content = content
}

export function Seo() {
  const { pathname } = useLocation()

  useEffect(() => {
    const seo = seoByPath[pathname] ?? {
      title: brand.siteName,
      description: brand.description,
    }

    document.documentElement.lang = 'fr'
    document.title = seo.title
    setMeta('description', seo.description)
    setMeta('robots', 'index, follow')
    setProperty('og:title', seo.title)
    setProperty('og:description', seo.description)
    setProperty('og:type', 'website')
    setProperty('og:site_name', brand.siteName)
  }, [pathname])

  return null
}
