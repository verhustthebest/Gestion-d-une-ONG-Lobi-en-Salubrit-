import type { ModuleKey, PageItem } from '../types'

export const campaigns = [
  { title: 'Nettoyons Limete', commune: 'Limete', type: 'Nettoyage', progress: 78, people: 120, color: '#176b43' },
  { title: 'Kinshasa Verte', commune: 'Ngaliema', type: 'Reboisement', progress: 65, people: 95, color: '#527c3b' },
  { title: 'Écoles propres', commune: 'Matete', type: 'Sensibilisation', progress: 60, people: 80, color: '#8a6a31' },
]

export const initialPages: PageItem[] = [
  { title: 'Accueil', slug: '/', type: "Page d'accueil", status: 'Publié', date: '10 juin 2026', owner: 'CMS' },
  { title: 'À propos', slug: '/a-propos', type: 'Page statique', status: 'Publié', date: '10 juin 2026', owner: 'Communication' },
  { title: 'Nos actions', slug: '/actions', type: 'Page liste', status: 'Publié', date: '8 juin 2026', owner: 'Programmes' },
  { title: 'Carte citoyenne', slug: '/carte', type: 'Page dynamique', status: 'Publié', date: '7 juin 2026', owner: 'Terrain' },
  { title: 'Signalement', slug: '/signaler', type: 'Formulaire', status: 'Publié', date: '6 juin 2026', owner: 'Terrain' },
  { title: 'Faire un don', slug: '/don', type: 'Page statique', status: 'Publié', date: '6 juin 2026', owner: 'Partenariats' },
  { title: 'Contact', slug: '/contact', type: 'Page statique', status: 'Publié', date: '4 juin 2026', owner: 'Accueil' },
]

export const reports = [
  ['SIG-1248', 'Dépôt sauvage près du marché', 'Limete', 'Haute', 'En cours'],
  ['SIG-1247', 'Nid-de-poule sur avenue Kasa-Vubu', 'Gombe', 'Moyenne', 'En attente'],
  ['SIG-1246', 'Canal bouché et eaux stagnantes', 'Ngaliema', 'Haute', 'En cours'],
  ['SIG-1245', 'Lampadaire hors service', 'Kinshasa', 'Basse', 'Résolu'],
  ['SIG-1244', "Tas d'ordures à l'arrêt de bus", 'Matete', 'Moyenne', 'En cours'],
]

export const moduleRows: Record<ModuleKey, string[][]> = {
  articles: [
    ['Tri des déchets à la maison', 'Conseil pratique', 'Publié', '10 juin 2026'],
    ['Bilan de la campagne Limete', 'Actualité', 'Publié', '9 juin 2026'],
    ['Comment rejoindre une équipe', 'Guide bénévole', 'Brouillon', '9 juin 2026'],
  ],
  menus: [
    ['Menu principal', '7 liens', 'Publié', 'Header public'],
    ['Pied de page', '9 liens', 'Publié', 'Footer public'],
    ['Accès rapides', '4 liens', 'Publié', 'Accueil'],
  ],
  medias: [
    ['operation-limete.jpg', 'Photo terrain', 'Publié', '1,8 Mo'],
    ['atelier-ecole.jpg', 'Sensibilisation', 'Publié', '1,2 Mo'],
    ['carte-zones.png', 'Cartographie', 'Publié', '860 Ko'],
  ],
  videos: [
    ['Message du coordinateur', 'Accueil', 'Publié', '02:14'],
    ['Avant / après Limete', 'Actions', 'Publié', '01:38'],
    ['Guide signalement citoyen', 'Signaler', 'Brouillon', '03:20'],
  ],
  temoignages: [
    ['Mado Kalala', 'Habitante de Limete', 'Publié', 'Accueil'],
    ['Jean Mbala', 'Bénévole terrain', 'Publié', 'Actions'],
    ['Sarah Ilunga', "Directrice d'école", 'Brouillon', 'À propos'],
  ],
  partenaires: [
    ['Commune de Limete', 'Institution', 'Publié', 'Convention active'],
    ['Clean Congo SARL', 'Entreprise', 'Publié', 'Matériel'],
    ['École Mwinda', 'Éducation', 'Publié', 'Sensibilisation'],
  ],
  faq: [
    ['Comment signaler une zone ?', 'Signalement', 'Publié', 'Priorité haute'],
    ['Comment devenir bénévole ?', 'Engagement', 'Publié', 'Priorité moyenne'],
    ['Quels moyens de paiement ?', 'Don', 'Publié', 'Priorité moyenne'],
  ],
  seo: [
    ['Accueil', 'Titre + description', 'Valide', '92/100'],
    ['Nos actions', 'Open Graph', 'Valide', '88/100'],
    ['Contact', 'Balises locales', 'À revoir', '72/100'],
  ],
}

export const moduleMeta: Record<ModuleKey, { title: string; subtitle: string; action: string; headers: string[] }> = {
  articles: {
    title: 'Articles / Blog',
    subtitle: 'Préparez les actualités et conseils publiés sur le site public',
    action: 'Nouvel article',
    headers: ['Titre', 'Catégorie', 'Statut', 'Modification'],
  },
  menus: {
    title: 'Menus et navigation',
    subtitle: 'Pilotez les liens visibles sur le site web',
    action: 'Nouveau menu',
    headers: ['Menu', 'Contenu', 'Statut', 'Emplacement'],
  },
  medias: {
    title: 'Bibliothèque média',
    subtitle: 'Organisez les images utilisées dans les pages publiques',
    action: 'Téléverser',
    headers: ['Fichier', 'Type', 'Statut', 'Taille'],
  },
  videos: {
    title: 'Gestion des vidéos',
    subtitle: 'Gérez les vidéos de présentation et de sensibilisation',
    action: 'Ajouter une vidéo',
    headers: ['Vidéo', 'Page', 'Statut', 'Durée'],
  },
  temoignages: {
    title: 'Témoignages',
    subtitle: 'Valorisez les retours citoyens et bénévoles',
    action: 'Nouveau témoignage',
    headers: ['Nom', 'Profil', 'Statut', 'Page'],
  },
  partenaires: {
    title: 'Partenaires',
    subtitle: 'Suivez les organisations associées aux campagnes',
    action: 'Nouveau partenaire',
    headers: ['Nom', 'Type', 'Statut', 'Contribution'],
  },
  faq: {
    title: 'FAQ',
    subtitle: 'Maintenez les questions fréquentes du site public',
    action: 'Nouvelle question',
    headers: ['Question', 'Rubrique', 'Statut', 'Priorité'],
  },
  seo: {
    title: 'Paramètres SEO',
    subtitle: 'Contrôlez les métadonnées des pages principales',
    action: 'Audit SEO',
    headers: ['Page', 'Élément', 'Statut', 'Score'],
  },
}
