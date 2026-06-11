import { MoreHorizontal } from 'lucide-react'
import type { ReactNode } from 'react'
import { toBadgeClass } from '../../utils/badge'

const badgeValues = new Set([
  'publie',
  'brouillon',
  'valide',
  'a-revoir',
  'en-cours',
  'en-attente',
  'resolu',
  'planifiee',
  'terminee',
  'haute',
  'moyenne',
  'basse',
])

function formatCell(cell: ReactNode) {
  if (typeof cell !== 'string') return cell
  const className = toBadgeClass(cell)
  return badgeValues.has(className) ? <span className={`badge ${className}`}>{cell}</span> : cell
}

export function DataTable({ headers, rows, showActions = true }: { headers: string[]; rows: ReactNode[][]; showActions?: boolean }) {
  return (
    <div className="table-scroll">
      <table>
        <thead>
          <tr>
            {headers.map((header) => <th key={header}>{header}</th>)}
            {showActions && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${String(row[0] || 'row')}-${rowIndex}`}>
              {row.map((cell, cellIndex) => <td key={cellIndex}>{formatCell(cell)}</td>)}
              {showActions && <td><button aria-label="Actions"><MoreHorizontal /></button></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
