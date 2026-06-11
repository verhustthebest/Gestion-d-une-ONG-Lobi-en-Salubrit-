import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { AdminLayout } from './components/layout/AdminLayout'
import { PublicLayout } from './components/layout/PublicLayout'
import { Seo } from './components/common/Seo'
import { AboutPage } from './pages/public/AboutPage'
import { ActionsPage } from './pages/public/ActionsPage'
import { ContactPage } from './pages/public/ContactPage'
import { DonatePage } from './pages/public/DonatePage'
import { ImpactPage } from './pages/public/ImpactPage'
import { LegalPage } from './pages/public/LegalPage'
import { PrivacyPage } from './pages/public/PrivacyPage'
import { HomePage } from './pages/public/HomePage'
import { MapPage } from './pages/public/MapPage'
import { NewsPage } from './pages/public/NewsPage'
import { ReportPage } from './pages/public/ReportPage'
import { VolunteerPage } from './pages/public/VolunteerPage'
import { AdminDashboard } from './pages/admin/AdminDashboard'
import { AdminModulePage } from './pages/admin/AdminModulePage'
import { InterventionsAdmin } from './pages/admin/InterventionsAdmin'
import { PagesAdmin } from './pages/admin/PagesAdmin'
import { ReportsAdmin } from './pages/admin/ReportsAdmin'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <Seo />
      <Routes>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="a-propos" element={<AboutPage />} />
          <Route path="actions" element={<ActionsPage />} />
          <Route path="carte" element={<MapPage />} />
          <Route path="actualites" element={<NewsPage />} />
          <Route path="benevolat" element={<VolunteerPage />} />
          <Route path="signaler" element={<ReportPage />} />
          <Route path="don" element={<DonatePage />} />
          <Route path="contact" element={<ContactPage />} />
          <Route path="resultats-impact" element={<ImpactPage />} />
          <Route path="mentions-legales" element={<LegalPage />} />
          <Route path="confidentialite" element={<PrivacyPage />} />
        </Route>

        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="pages" element={<PagesAdmin />} />
          <Route path="signalements" element={<ReportsAdmin />} />
          <Route path="interventions" element={<InterventionsAdmin />} />
          <Route path="articles" element={<AdminModulePage />} />
          <Route path="menus" element={<AdminModulePage />} />
          <Route path="medias" element={<AdminModulePage />} />
          <Route path="videos" element={<AdminModulePage />} />
          <Route path="temoignages" element={<AdminModulePage />} />
          <Route path="partenaires" element={<AdminModulePage />} />
          <Route path="faq" element={<AdminModulePage />} />
          <Route path="seo" element={<AdminModulePage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
