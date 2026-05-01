import { useState, useEffect } from 'react'
import { ShoppingCart, Menu, X, Leaf } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const { itemCount, setIsOpen } = useCart()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  const links = [
    { label: 'Benefits', href: '#benefits' },
    { label: 'Ingredients', href: '#ingredients' },
    { label: 'How it Works', href: '#how-to-use' },
    { label: 'Reviews', href: '#testimonials' },
    { label: 'Order', href: '#product' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-sm shadow-md' : 'bg-transparent'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 bg-brand-700 rounded-full flex items-center justify-center">
              <Leaf size={16} className="text-white" />
            </div>
            <span className={`font-bold text-xl transition-colors ${scrolled ? 'text-brand-900' : 'text-white'}`}>
              HerboRelief
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-6">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className={`text-sm font-medium transition-colors hover:text-brand-500 ${scrolled ? 'text-gray-700' : 'text-white/90'}`}
              >
                {l.label}
              </a>
            ))}
          </div>

          {/* Cart + Mobile Menu */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsOpen(true)}
              className="relative p-2 rounded-full bg-brand-700 text-white hover:bg-brand-600 transition-colors"
            >
              <ShoppingCart size={18} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-gold-500 text-white text-xs font-bold rounded-full flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2 rounded-md transition-colors ${scrolled ? 'text-gray-700' : 'text-white'}`}
            >
              {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg">
          <div className="px-4 py-3 flex flex-col gap-3">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="text-gray-700 font-medium py-2 border-b border-gray-100 last:border-0"
              >
                {l.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </nav>
  )
}
