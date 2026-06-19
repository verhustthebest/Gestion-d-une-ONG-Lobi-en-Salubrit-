import {
  HomeCta,
  HomeHero,
  HomeMapSection,
  ImpactSection,
  LiveNewsStrip,
  NewsSection,
  PartnersSection,
  ProgrammesSection,
  QuickActions,
} from '../../components/public/HomeSections'

export function HomePage() {
  return (
    <main className="mock-page un-home">
      <HomeHero />
      <LiveNewsStrip />
      <QuickActions />
      <ImpactSection />
      <ProgrammesSection />
      <NewsSection />
      <HomeMapSection />
      <PartnersSection />
      <HomeCta />
    </main>
  )
}
