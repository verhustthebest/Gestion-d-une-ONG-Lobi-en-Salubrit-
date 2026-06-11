import { Link } from 'react-router-dom'
import { brand } from '../../data/brand'

export function Logo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className={`logo image-logo ${inverse ? 'inverse' : ''}`} aria-label={brand.siteName}>
      <img src="/photos/logo_LB.jpeg" alt="Logo LOBI ASBL" />
      <div>
        <b>LOBI</b>
        <strong>ASBL</strong>
        <small>{brand.tagline.toUpperCase()}</small>
      </div>
    </Link>
  )
}
