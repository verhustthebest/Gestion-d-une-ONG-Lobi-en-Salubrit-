import { ArrowRight, CalendarDays, Play } from 'lucide-react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { HeroSlider } from '../../components/common/HeroSlider'
import { homeVideos } from '../../data/publicContent'

const news = [
  {
    title: 'Grande op\u00e9ration de nettoyage \u00e0 Limete',
    date: '24 mai 2026',
    image: '/photos/tof3.jpg',
    text: 'Une mobilisation communautaire pour assainir les avenues, les caniveaux et les abords du march\u00e9.',
  },
  {
    title: 'Plantation de 1000 arbres \u00e0 Mont Ngafula',
    date: '20 mai 2026',
    image: '/photos/tof5.jpg',
    text: 'Des citoyens et partenaires r\u00e9unis pour reverdir les quartiers et renforcer les espaces publics.',
  },
  {
    title: 'Sensibilisation dans 5 \u00e9coles de Kinshasa',
    date: '18 mai 2026',
    image: '/photos/tof2.jpg',
    text: 'Former les jeunes aux bons gestes de salubrit\u00e9, de tri et de protection de leur environnement.',
  },
  {
    title: 'Nouveau centre de tri des d\u00e9chets \u00e0 Gombe',
    date: '17 mai 2026',
    image: '/photos/tof4.jpg',
    text: 'Un point de collecte pour renforcer la gestion locale des d\u00e9chets et orienter les mati\u00e8res recyclables.',
  },
]

export function NewsPage() {
  const [selectedVideo, setSelectedVideo] = useState(homeVideos[0])
  const [selectedArticle, setSelectedArticle] = useState(news[0])

  return (
    <main className="mock-page">
      <HeroSlider pageKey="news" className="news-hero-slider">
        <div className="hero-news-stack">
          {news.slice(0, 3).map((item) => (
            <button type="button" key={item.title} onClick={() => setSelectedArticle(item)}>
              <small>{item.date}</small>
              <b>{item.title}</b>
            </button>
          ))}
        </div>
      </HeroSlider>

      <section className="news-video-section">
        <article className="panel featured-video-detail">
          <div className="video-thumb large-video">
            <iframe
              src={`https://www.youtube.com/embed/${selectedVideo[2]}`}
              title={selectedVideo[0]}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
            <span>{selectedVideo[3]}</span>
          </div>
          <div>
            <span className="kicker green">{'VID\u00c9O S\u00c9LECTIONN\u00c9E'}</span>
            <h2>{selectedVideo[0]}</h2>
            <p>{'Regardez les images de terrain, puis consultez les informations associ\u00e9es pour comprendre le contexte, la zone concern\u00e9e et les prochaines actions.'}</p>
            <small>{selectedVideo[1]}</small>
          </div>
        </article>
        <div className="news-video-list">
          {homeVideos.map((video) => (
            <button className={selectedVideo[2] === video[2] ? 'active-video-card' : ''} type="button" key={video[2]} onClick={() => setSelectedVideo(video)}>
              <span><Play /></span>
              <b>{video[0]}</b>
              <small>{video[1]} - {video[3]}</small>
            </button>
          ))}
        </div>
      </section>

      <section className="news-article-section">
        <article className="panel article-detail">
          <img src={selectedArticle.image} alt={selectedArticle.title} />
          <div>
            <span>{selectedArticle.date}</span>
            <h2>{selectedArticle.title}</h2>
            <p>{selectedArticle.text}</p>
            <Link to="/contact">{'Demander les d\u00e9tails'} <ArrowRight /></Link>
          </div>
        </article>
        <div className="article-grid">
          {news.map((item) => (
            <button className={selectedArticle.title === item.title ? 'active-article-card' : ''} type="button" key={item.title} onClick={() => setSelectedArticle(item)}>
              <img src={item.image} alt="" />
              <span><CalendarDays /> {item.date}</span>
              <b>{item.title}</b>
            </button>
          ))}
        </div>
      </section>

      <section className="mock-cta"><h2>{'Restez inform\u00e9 de nos derni\u00e8res actions.'}</h2><p>{'Abonnez-vous \u00e0 notre newsletter pour recevoir nos actualit\u00e9s et rapports.'}</p><div className="newsletter-inline"><input placeholder="Votre email" /><button className="btn light">S'abonner</button></div></section>
    </main>
  )
}
