import { useState } from 'react'
import { ShoppingCart, Zap, Shield, Truck } from 'lucide-react'
import { useCart } from '../context/CartContext'
import { VARIANTS } from '../data'
import type { ProductVariant } from '../types'

export default function ProductSection() {
  const [selected, setSelected] = useState<ProductVariant>(VARIANTS[1])
  const [qty, setQty] = useState(1)
  const { addItem } = useCart()

  const handleAdd = () => {
    for (let i = 0; i < qty; i++) addItem(selected)
    setQty(1)
  }

  return (
    <section id="product" className="py-20 bg-gradient-to-br from-brand-950 to-brand-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">Order Now</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
            Choose Your Size
          </h2>
          <p className="text-brand-300 mt-3">Special launch price — limited time offer</p>
        </div>

        <div className="max-w-4xl mx-auto bg-white rounded-3xl overflow-hidden shadow-2xl">
          <div className="grid md:grid-cols-2">
            {/* Left — visual */}
            <div className="bg-gradient-to-br from-brand-800 to-brand-950 p-12 flex flex-col items-center justify-center relative">
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-4 right-4 text-6xl opacity-10">🌿</div>
                <div className="absolute bottom-4 left-4 text-4xl opacity-10">🌿</div>
              </div>
              <div className="relative animate-float">
                <div className="absolute inset-0 bg-gold-400/20 rounded-full blur-2xl" />
                <svg width="150" height="240" viewBox="0 0 220 360" fill="none" xmlns="http://www.w3.org/2000/svg" className="relative drop-shadow-2xl">
                  <rect x="82" y="20" width="56" height="30" rx="8" fill="#d97706" />
                  <rect x="88" y="14" width="44" height="12" rx="4" fill="#b45309" />
                  <rect x="88" y="48" width="44" height="28" fill="#15803d" />
                  <path d="M88 76 C70 80 54 100 50 120 L50 300 C50 320 60 330 110 330 C160 330 170 320 170 300 L170 120 C166 100 150 80 132 76 Z" fill="url(#pGrad)" />
                  <rect x="60" y="140" width="100" height="130" rx="8" fill="white" opacity="0.15" />
                  <text x="110" y="175" textAnchor="middle" fill="white" fontSize="10" fontWeight="bold" fontFamily="sans-serif">HERBO</text>
                  <text x="110" y="190" textAnchor="middle" fill="#fbbf24" fontSize="14" fontWeight="900" fontFamily="sans-serif">RELIEF</text>
                  <text x="110" y="208" textAnchor="middle" fill="white" fontSize="8" fontFamily="sans-serif">PAIN RELIEF OIL</text>
                  <text x="110" y="240" textAnchor="middle" fontSize="22">🌿</text>
                  <text x="110" y="260" textAnchor="middle" fill="#86efac" fontSize="7" fontFamily="sans-serif">100% NATURAL HERBAL</text>
                  <ellipse cx="110" cy="325" rx="52" ry="8" fill="#166534" opacity="0.5" />
                  <defs>
                    <linearGradient id="pGrad" x1="50" y1="76" x2="170" y2="330" gradientUnits="userSpaceOnUse">
                      <stop offset="0%" stopColor="#16a34a" />
                      <stop offset="100%" stopColor="#14532d" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <div className="mt-6 flex gap-2 text-xs text-brand-300">
                <span className="bg-white/10 px-3 py-1 rounded-full">Herbal</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">Fast Relief</span>
                <span className="bg-white/10 px-3 py-1 rounded-full">Safe</span>
              </div>
            </div>

            {/* Right — order panel */}
            <div className="p-8 flex flex-col justify-center">
              <h3 className="text-2xl font-black text-gray-900 mb-1">HerboRelief Pain Oil</h3>
              <p className="text-gray-500 text-sm mb-6">100% natural herbal formula for fast, deep pain relief</p>

              {/* Variant Selector */}
              <p className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-3">Select Size</p>
              <div className="flex gap-3 mb-6">
                {VARIANTS.map(v => (
                  <button
                    key={v.id}
                    onClick={() => setSelected(v)}
                    className={`flex-1 p-3 rounded-xl border-2 text-center transition-all ${
                      selected.id === v.id
                        ? 'border-brand-600 bg-brand-50'
                        : 'border-gray-200 hover:border-brand-300'
                    }`}
                  >
                    <p className={`font-bold text-sm ${selected.id === v.id ? 'text-brand-700' : 'text-gray-700'}`}>{v.size}</p>
                    <p className={`text-lg font-black ${selected.id === v.id ? 'text-brand-700' : 'text-gray-900'}`}>৳{v.price}</p>
                    <p className="text-xs text-green-600 font-semibold">Save ৳{v.savings}</p>
                  </button>
                ))}
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-4xl font-black text-brand-700">৳{selected.price}</span>
                <span className="text-lg text-gray-400 line-through">৳{selected.originalPrice}</span>
                <span className="bg-red-100 text-red-600 text-sm font-bold px-2 py-0.5 rounded-full">
                  {Math.round((selected.savings / selected.originalPrice) * 100)}% OFF
                </span>
              </div>

              {/* Quantity */}
              <div className="flex items-center gap-4 mb-6">
                <p className="text-xs font-bold text-gray-500 uppercase tracking-widest">Quantity</p>
                <div className="flex items-center border border-gray-200 rounded-xl overflow-hidden">
                  <button
                    onClick={() => setQty(q => Math.max(1, q - 1))}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                  >−</button>
                  <span className="px-4 py-2 font-bold text-gray-900 min-w-[40px] text-center">{qty}</span>
                  <button
                    onClick={() => setQty(q => q + 1)}
                    className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-bold transition-colors"
                  >+</button>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col gap-3">
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 bg-brand-700 hover:bg-brand-600 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg"
                >
                  <ShoppingCart size={18} />
                  Add to Cart
                </button>
                <button
                  onClick={handleAdd}
                  className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg"
                >
                  <Zap size={18} />
                  Buy Now — ৳{selected.price * qty}
                </button>
              </div>

              {/* Guarantees */}
              <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col gap-2">
                {[
                  { icon: <Truck size={14} />, text: 'Free delivery on orders over ৳500' },
                  { icon: <Shield size={14} />, text: '7-day return guarantee' },
                  { icon: '💸', text: 'Cash on Delivery available' },
                ].map((g, i) => (
                  <div key={i} className="flex items-center gap-2 text-xs text-gray-500">
                    <span className="text-brand-600">{g.icon}</span>
                    {g.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
