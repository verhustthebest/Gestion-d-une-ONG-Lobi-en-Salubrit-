import { MapPin } from 'lucide-react'

export function MapVisual() {
  return (
    <div className="map-visual real-map">
      <iframe
        title="Carte OpenStreetMap de Kinshasa"
        src="https://www.openstreetmap.org/export/embed.html?bbox=15.218%2C-4.48%2C15.43%2C-4.27&layer=mapnik&marker=-4.385%2C15.309"
        loading="lazy"
      />
      <div className="osm-map-label">
        <MapPin />
        <b>Kinshasa</b>
      </div>
    </div>
  )
}
