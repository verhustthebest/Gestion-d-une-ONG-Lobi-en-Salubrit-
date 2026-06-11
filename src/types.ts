export type PageItem = {
  title: string
  slug: string
  type: string
  status: string
  date: string
  owner: string
}

export type ModuleKey =
  | 'articles'
  | 'menus'
  | 'medias'
  | 'videos'
  | 'temoignages'
  | 'partenaires'
  | 'faq'
  | 'seo'
