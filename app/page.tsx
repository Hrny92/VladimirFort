import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Calculator from '@/components/Calculator'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import PageLoader from '@/components/PageLoader'

export default function Home() {
  return (
    <main>
      <PageLoader />
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Calculator />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}
