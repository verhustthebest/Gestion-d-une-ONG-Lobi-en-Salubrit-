import { CircleHelp, FileText, Handshake, Image, MessageSquareQuote, Newspaper, Video } from 'lucide-react'

export const cmsMetrics = [
  [FileText, '12', 'Pages publiees', '+8% vs mois dernier'],
  [Newspaper, '28', 'Articles', '+12% vs mois dernier'],
  [Image, '156', 'Photos', '+18% vs mois dernier'],
  [Video, '24', 'Videos', '+5% vs mois dernier'],
  [FileText, '9', 'Rapports', 'Stable'],
  [CircleHelp, '15', 'FAQ', '+7% vs mois dernier'],
  [MessageSquareQuote, '18', 'Temoignages', '+6% vs mois dernier'],
  [Handshake, '26', 'Partenaires', '+10% vs mois dernier'],
] as const

export const recentActivities = [
  ['Nouvel article publie', 'Nettoyage a Limete : une reussite collective', 'Il y a 2 heures'],
  ['Photo ajoutee', "Album Reboisement a Ngalema", 'Il y a 3 heures'],
  ['Page A propos mise a jour', 'Contenu institutionnel enrichi', 'Il y a 1 jour'],
  ['Nouveau rapport televerse', "Rapport d'impact 2024", 'Il y a 2 jours'],
  ["Chiffres d'impact mis a jour", 'Tableau public synchronise', 'Il y a 3 jours'],
]

export const recentContents = [
  ['Nettoyage a Limete : Une reussite collective', 'Article', 'Publie', '12 Juin 2026 10:30'],
  ['Reboisement a Ngalema', 'Galerie', 'Publie', '12 Juin 2026 09:15'],
  ['Video de la campagne Proprete 2026', 'Video', 'Publie', '11 Juin 2026 16:45'],
  ["Rapport d'impact 2024", 'Rapport', 'Publie', '10 Juin 2026 11:20'],
  ['Page Accueil', 'Page', 'Publie', '09 Juin 2026 14:00'],
]
