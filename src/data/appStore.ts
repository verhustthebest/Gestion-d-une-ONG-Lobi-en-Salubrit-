export type ContactMessage = {
  id: string
  name: string
  email: string
  phone: string
  subject: string
  message: string
  createdAt: string
}

export type VolunteerApplication = {
  id: string
  name: string
  phone: string
  email: string
  commune: string
  domain: string
  status: string
  createdAt: string
}

export type CitizenReport = {
  id: string
  location: string
  commune: string
  problemType: string
  description: string
  urgency: string
  status: string
  photo?: string
  createdAt: string
}

export type Intervention = {
  id: string
  title: string
  commune: string
  status: string
  team: string
  dueDate: string
  linkedReportId?: string
}

export type MediaItem = {
  id: string
  name: string
  type: string
  size: string
  dataUrl: string
  createdAt: string
}

export type NewsletterSubscriber = {
  id: string
  email: string
  createdAt: string
}

export type DonationIntent = {
  id: string
  amount: string
  frequency: string
  method: string
  name: string
  phone: string
  createdAt: string
}

const seedReports: CitizenReport[] = [
  {
    id: 'SIG-1248',
    location: 'Limete, 10e Rue',
    commune: 'Limete',
    problemType: 'D\u00e9p\u00f4t sauvage',
    description: 'D\u00e9p\u00f4t sauvage pr\u00e8s du march\u00e9 central.',
    urgency: 'Haute',
    status: 'En cours',
    createdAt: '2026-06-10T08:00:00.000Z',
  },
  {
    id: 'SIG-1247',
    location: 'Avenue Kasa-Vubu',
    commune: 'Gombe',
    problemType: 'Voirie',
    description: 'Nid-de-poule sur avenue Kasa-Vubu.',
    urgency: 'Moyenne',
    status: 'En attente',
    createdAt: '2026-06-09T10:00:00.000Z',
  },
]

const seedInterventions: Intervention[] = [
  { id: 'INT-087', title: 'Nettoyage march\u00e9 Limete', commune: 'Limete', status: 'En cours', team: '\u00c9quipe Limete 2', dueDate: '2026-06-16', linkedReportId: 'SIG-1248' },
  { id: 'INT-086', title: 'Curage caniveau', commune: 'Ngaliema', status: 'Planifi\u00e9e', team: 'Hydro Team', dueDate: '2026-06-18' },
  { id: 'INT-085', title: 'Reboisement \u00e9cole', commune: 'Matete', status: 'Termin\u00e9e', team: 'Volontaires', dueDate: '2026-06-08' },
]

const seeds = {
  contacts: [] as ContactMessage[],
  volunteers: [] as VolunteerApplication[],
  reports: seedReports,
  interventions: seedInterventions,
  medias: [] as MediaItem[],
  newsletter: [] as NewsletterSubscriber[],
  donations: [] as DonationIntent[],
}

export type StoreKey = keyof typeof seeds
type StoreValue<K extends StoreKey> = (typeof seeds)[K]

function storageKey(key: StoreKey) {
  return `onglobi.${key}`
}

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

export function readStore<K extends StoreKey>(key: K): StoreValue<K> {
  if (!canUseStorage()) return seeds[key]
  const raw = window.localStorage.getItem(storageKey(key))
  if (!raw) return seeds[key]
  try {
    return JSON.parse(raw) as StoreValue<K>
  } catch {
    return seeds[key]
  }
}

export function writeStore<K extends StoreKey>(key: K, value: StoreValue<K>) {
  if (!canUseStorage()) return
  window.localStorage.setItem(storageKey(key), JSON.stringify(value))
  window.dispatchEvent(new CustomEvent('onglobi-store', { detail: key }))
}

export function addStoreItem<K extends StoreKey>(key: K, item: StoreValue<K>[number]) {
  const next = [item, ...readStore(key)] as StoreValue<K>
  writeStore(key, next)
  return next
}

export function makeId(prefix: string) {
  return `${prefix}-${Date.now().toString(36).toUpperCase()}`
}

export function fileToDataUrl(file: File) {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(String(reader.result))
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}
