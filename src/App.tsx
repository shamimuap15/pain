import { CartProvider } from './context/CartContext'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Stats from './components/Stats'
import Benefits from './components/Benefits'
import Ingredients from './components/Ingredients'
import HowToUse from './components/HowToUse'
import Testimonials from './components/Testimonials'
import ProductSection from './components/ProductSection'
import FAQ from './components/FAQ'
import Footer from './components/Footer'
import CartSidebar from './components/CartSidebar'

export default function App() {
  return (
    <CartProvider>
      <Navbar />
      <main>
        <Hero />
        <Stats />
        <Benefits />
        <Ingredients />
        <HowToUse />
        <Testimonials />
        <ProductSection />
        <FAQ />
        <Footer />
      </main>
      <CartSidebar />
    </CartProvider>
  )
}
