import { Leaf } from 'lucide-react'

export function Stat({ value, label, trend }: { value: string; label: string; trend?: string }) {
  return (
    <article className="stat">
      <span><Leaf /></span>
      <div>
        <strong>{value}</strong>
        <small>{label}</small>
        {trend && <em>{trend}</em>}
      </div>
    </article>
  )
}
