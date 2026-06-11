import {
  CalendarDays,
  Heart,
  Info,
  Landmark,
  Map,
  Megaphone,
  Send,
  ShieldCheck,
  UserRoundCheck,
  Users,
  Wallet,
} from 'lucide-react'

export const homeLiveNews = [
  ['Grande op\u00e9ration de nettoyage \u00e0 Limete ce samedi', '24 mai 2026'],
  ['Plantation de 1000 arbres \u00e0 Mont Ngafula', '20 mai 2026'],
  ['Sensibilisation dans 5 \u00e9coles de Kinshasa', '18 mai 2026'],
  ['Nouveau centre de tri des d\u00e9chets \u00e0 Gombe', '17 mai 2026'],
  ['Collecte sp\u00e9ciale plastiques \u00e0 Bandalungwa', '15 mai 2026'],
]

export const homeQuickLinks = [
  [Megaphone, 'Signaler', 'Signalez une zone insalubre en quelques clics.', '/signaler'],
  [Map, 'Suivre', 'Suivez les interventions en temps r\u00e9el sur la carte.', '/carte'],
  [UserRoundCheck, "S'engager", 'Devenez b\u00e9n\u00e9vole et participez aux actions terrain.', '/benevolat'],
  [Wallet, 'Financer', 'Soutenez nos campagnes et contribuez au changement.', '/don'],
  [Landmark, 'D\u00e9couvrir', 'Consultez nos activit\u00e9s, r\u00e9sultats et rapports.', '/resultats-impact'],
  [Info, 'Informer', 'Restez inform\u00e9 de notre actualit\u00e9 et de nos \u00e9v\u00e9nements.', '/actualites'],
] as const

export const homeLeaders = [
  ['Mr TAMUKIUR WANGATA Serge', "Pr\u00e9sident de l'ONG LOBI", 'PR\u00c9SIDENT'],
  ['Marie Tshibola', 'Vice-pr\u00e9sidente', 'VICE-PR\u00c9SIDENTE'],
  ['Patrick Ngoy', 'Secr\u00e9taire g\u00e9n\u00e9ral', 'SECR\u00c9TAIRE G\u00c9N\u00c9RAL'],
]

export const homeOtherLeaders = [
  ['Grace Kalonji', 'Tr\u00e9sori\u00e8re'],
  ['Richard Kabuya', 'Directeur des op\u00e9rations'],
  ['Esther Mbuyi', 'Directrice des Finances'],
  ['Dieudonn\u00e9 Moke', 'Responsable Partenariats'],
  ['Lydie Mwamba', 'Responsable Communication'],
]

export const homeVideos = [
  ['Grande op\u00e9ration de nettoyage \u00e0 Limete', '24 mai 2026', 'C5lLGuifafs', '01:36'],
  ['Plantation de 1000 arbres \u00e0 Mont Ngafula', '20 mai 2026', '3Guq-rZaxq8', '01:20'],
  ['Nouveau centre de tri des d\u00e9chets \u00e0 Gombe', '17 mai 2026', 'ewpSQzm3T8k', '01:46'],
]

export const heroSlides = ['/photos/tof1.jpg', '/photos/tof2.jpg', '/photos/tof3.jpg', '/photos/tof4.jpg', '/photos/tof5.jpg']

export const homeCtaLinks = [
  [Heart, 'Faire un don', '/don'],
  [Users, 'Devenir b\u00e9n\u00e9vole', '/benevolat'],
  [Send, 'Signaler une zone', '/signaler'],
] as const

export const volunteerChecklist = [
  [ShieldCheck, 'Actions de nettoyage'],
  [ShieldCheck, 'Sensibilisation'],
  [ShieldCheck, "Plantation d'arbres"],
  [ShieldCheck, '\u00c9v\u00e9nements communautaires'],
] as const

export { CalendarDays, Megaphone }
