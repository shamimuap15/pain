import { Routes, Route } from 'react-router-dom'
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
import AdminLogin from './admin/AdminLogin'
import AdminLayout from './admin/AdminLayout'
import Dashboard from './admin/pages/Dashboard'
import Orders from './admin/pages/Orders'
import Customers from './admin/pages/Customers'

function StoreFront() {
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

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<StoreFront />} />
      <Route path="/admin" element={<AdminLogin />} />
      <Route path="/admin/*" element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="orders" element={<Orders />} />
        <Route path="customers" element={<Customers />} />
      </Route>
    </Routes>
  )
}
