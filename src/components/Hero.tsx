import { ShoppingCart, ChevronDown, Shield, Leaf, Zap } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { VARIANTS } from '../data'

export default function Hero() {
  const { addItem } = useCart()

  return (
    <section className="relative min-h-screen bg-gradient-to-br from-brand-950 via-brand-900 to-brand-800 overflow-hidden flex items-center">
      {/* Background organic shapes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-brand-700/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 -left-32 w-80 h-80 bg-gold-600/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-brand-800/20 rounded-full blur-3xl" />
        {/* Leaf pattern */}
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute opacity-10 text-brand-300"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 360}deg)`,
              fontSize: `${12 + Math.random() * 24}px`,
            }}
          >
            🌿
          </div>
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 grid lg:grid-cols-2 gap-12 items-center w-full">
        {/* Left Content */}
        <div className="text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-gold-500/20 border border-gold-500/40 text-gold-400 text-sm font-semibold px-4 py-1.5 rounded-full mb-6">
            <Zap size={14} />
            #1 Natural Pain Relief in Bangladesh
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
            Say Goodbye to
            <span className="text-gold-400 block">Pain — Naturally</span>
          </h1>

          <p className="text-brand-200 text-lg leading-relaxed mb-8 max-w-xl">
            HerboRelief is a 100% natural herbal oil that penetrates deep into muscles and joints for <strong className="text-white">fast, long-lasting relief</strong> — without chemicals or side effects.
          </p>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center lg:justify-start gap-4 mb-8">
            {[
              { icon: <Leaf size={14} />, text: '100% Natural' },
              { icon: <Shield size={14} />, text: 'No Side Effects' },
              { icon: <Zap size={14} />, text: 'Fast Acting' },
            ].map(b => (
              <div key={b.text} className="flex items-center gap-1.5 bg-white/10 text-white/90 text-sm px-3 py-1.5 rounded-full">
                {b.icon} {b.text}
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <button
              onClick={() => addItem(VARIANTS[1])}
              className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold px-8 py-4 rounded-full text-lg transition-all hover:scale-105 shadow-xl shadow-gold-500/30"
            >
              <ShoppingCart size={20} />
              Order Now — ৳549
            </button>
            <a
              href="#benefits"
              className="flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold px-8 py-4 rounded-full text-lg transition-all border border-white/20"
            >
              Learn More
            </a>
          </div>

          <p className="mt-4 text-brand-300 text-sm">
            🚚 Free home delivery · 💸 Cash on Delivery available
          </p>
        </div>

        {/* Right — Bottle Illustration */}
        <div className="flex justify-center lg:justify-end">
          <div className="relative">
            {/* Glow */}
            <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-3xl scale-150" />

            {/* Bottle SVG */}
            <div className="relative animate-float">
              <BottleIllustration />
            </div>

            {/* Floating badges */}
            <div className="absolute -left-4 top-1/4 bg-white rounded-2xl shadow-xl p-3 animate-float-delay">
              <p className="text-xs text-gray-500">Happy customers</p>
              <p className="text-xl font-black text-brand-700">50,000+</p>
            </div>
            <div className="absolute -right-4 bottom-1/4 bg-white rounded-2xl shadow-xl p-3 animate-float">
              <p className="text-xs text-gray-500">Natural ingredients</p>
              <p className="text-xl font-black text-brand-700">12</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a href="#stats" className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50 hover:text-white transition-colors animate-bounce">
        <ChevronDown size={28} />
      </a>
    </section>
  )
}

function BottleIllustration() {
  return (
    <svg width="220" height="360" viewBox="0 0 220 360" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Cap */}
      <rect x="82" y="20" width="56" height="30" rx="8" fill="#d97706" />
      <rect x="88" y="14" width="44" height="12" rx="4" fill="#b45309" />

      {/* Neck */}
      <rect x="88" y="48" width="44" height="28" fill="#15803d" />

      {/* Shoulder curve */}
      <path d="M88 76 C70 80 54 100 50 120 L50 300 C50 320 60 330 110 330 C160 330 170 320 170 300 L170 120 C166 100 150 80 132 76 Z" fill="url(#bottleGrad)" />

      {/* Label background */}
      <rect x="60" y="140" width="100" height="130" rx="8" fill="white" opacity="0.15" />
      <rect x="64" y="144" width="92" height="122" rx="6" fill="white" opacity="0.1" />

      {/* Label text */}
      <text x="110" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">HERBO</text>
      <text x="110" y="190" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="900" fontFamily="sans-serif">RELIEF</text>
      <text x="110" y="208" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">PAIN RELIEF OIL</text>

      {/* Leaf icon on label */}
      <text x="110" y="240" textAnchor="middle" fontSize="22">🌿</text>

      {/* 100% Natural badge */}
      <text x="110" y="260" textAnchor="middle" fill="#86efac" fontSize="7" fontFamily="sans-serif">100% NATURAL HERBAL</text>

      {/* Bottom highlight */}
      <ellipse cx="110" cy="325" rx="52" ry="8" fill="#166534" opacity="0.5" />

      {/* Oil shine */}
      <path d="M75 110 C80 108 88 110 90 115 C88 118 80 116 75 110Z" fill="white" opacity="0.3" />

      {/* Oil drops */}
      <ellipse cx="48" cy="190" rx="5" ry="7" fill="#fbbf24" opacity="0.7" />
      <ellipse cx="172" cy="220" rx="4" ry="6" fill="#fbbf24" opacity="0.6" />
      <ellipse cx="44" cy="240" rx="3" ry="5" fill="#86efac" opacity="0.6" />

      <defs>
        <linearGradient id="bottleGrad" x1="50" y1="76" x2="170" y2="330" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#16a34a" />
          <stop offset="50%" stopColor="#15803d" />
          <stop offset="100%" stopColor="#14532d" />
        </linearGradient>
      </defs>
    </svg>
  )
}
