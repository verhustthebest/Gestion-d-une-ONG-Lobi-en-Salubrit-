import { MapPin, Users } from 'lucide-react'
import { Link } from 'react-router-dom'
import { campaigns } from '../../data/siteData'

export function CampaignGrid() {
  return (
    <section className="campaign-grid">
      {campaigns.map((campaign) => (
        <article className="campaign" key={campaign.title}>
          <div className="campaign-photo" style={{ background: `linear-gradient(145deg, ${campaign.color}, #c3d879)` }}>
            <span>{campaign.type}</span>
            <Users />
          </div>
          <div className="campaign-body">
            <small><MapPin /> {campaign.commune} - Juin 2026</small>
            <h3>{campaign.title}</h3>
            <p>{campaign.people} benevoles mobilises</p>
            <div className="progress"><i style={{ width: `${campaign.progress}%` }} /></div>
            <div>
              <b>{campaign.progress}% atteint</b>
              <Link to="/don">Soutenir</Link>
            </div>
          </div>
        </article>
      ))}
    </section>
  )
}
