import { HomeCta, HomeHero, HomeMapFunding, LeaderPanel, LiveNewsStrip, QuickActions, VolunteerAndNews } from '../../components/public/HomeSections'

export function HomePage() {
  return (
    <main className="mock-page">
      <HomeHero />
      <LiveNewsStrip />
      <QuickActions />
      <LeaderPanel />
      <HomeMapFunding />
      <VolunteerAndNews />
      <HomeCta />
    </main>
  )
}
