import { moduleMeta, moduleRows } from './siteData'
import type { ModuleKey } from '../types'

export type CmsCollectionItem = {
  id: string
  cells: string[]
  updatedAt: string
}

type CmsCollections = Record<ModuleKey, CmsCollectionItem[]>

const collectionStorageKey = 'onglobi.cms.collections'

function canUseStorage() {
  return typeof window !== 'undefined' && Boolean(window.localStorage)
}

function createDefaultCollections(): CmsCollections {
  return Object.keys(moduleMeta).reduce((acc, key) => {
    const moduleKey = key as ModuleKey
    acc[moduleKey] = moduleRows[moduleKey].map((cells, index) => ({
      id: `${moduleKey}-${index + 1}`,
      cells,
      updatedAt: '2026-06-10',
    }))
    return acc
  }, {} as CmsCollections)
}

export const defaultCmsCollections = createDefaultCollections()

export function readCmsCollections() {
  if (!canUseStorage()) return defaultCmsCollections
  const raw = window.localStorage.getItem(collectionStorageKey)
  if (!raw) return defaultCmsCollections
  try {
    return { ...defaultCmsCollections, ...JSON.parse(raw) } as CmsCollections
  } catch {
    return defaultCmsCollections
  }
}

export function writeCmsCollection(moduleKey: ModuleKey, items: CmsCollectionItem[]) {
  if (!canUseStorage()) return
  const next = { ...readCmsCollections(), [moduleKey]: items }
  window.localStorage.setItem(collectionStorageKey, JSON.stringify(next))
  window.dispatchEvent(new CustomEvent('onglobi-cms-collection', { detail: moduleKey }))
}

export function makeCollectionId(moduleKey: ModuleKey) {
  return `${moduleKey}-${Date.now().toString(36).toUpperCase()}`
}
