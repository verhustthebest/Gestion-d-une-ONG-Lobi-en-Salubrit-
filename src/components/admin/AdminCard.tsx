import type { ReactNode } from 'react'

export function AdminCard({ title, children, wide = false }: { title: string; children: ReactNode; wide?: boolean }) {
  return (
    <section className={`admin-card ${wide ? 'wide' : ''}`}>
      <div className="admin-card-head">
        <h2>{title}</h2>
        <button>Voir tout</button>
      </div>
      {children}
    </section>
  )
}
