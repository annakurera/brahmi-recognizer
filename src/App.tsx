import Footer from './components/Footer'
import Header from './components/Header'
import MethodologySection from './components/MethodologySection'
import TeamSection from './components/TeamSection'
import UploadSection from './components/UploadSection'

export default function App() {
  return (
    <div className="min-h-screen bg-parchment font-sans text-charcoal">
      <Header />
      <main>
        <UploadSection />
        <MethodologySection />
        <TeamSection />
      </main>
      <Footer />
    </div>
  )
}
