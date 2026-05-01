import { Star } from 'lucide-react'
import { TESTIMONIALS } from '../data'

export default function Testimonials() {
  return (
    <section id="testimonials" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Real Reviews</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
            50,000+ People Trust HerboRelief
          </h2>
          <div className="flex items-center justify-center gap-1 mt-3">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} className="fill-gold-500 text-gold-500" />
            ))}
            <span className="ml-2 text-gray-600 font-medium">4.9 / 5 average rating</span>
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {TESTIMONIALS.map(t => (
            <div key={t.name} className="p-6 rounded-2xl border border-gray-100 bg-stone-50 hover:shadow-lg transition-shadow">
              {/* Stars */}
              <div className="flex gap-0.5 mb-4">
                {Array.from({ length: t.rating }).map((_, i) => (
                  <Star key={i} size={14} className="fill-gold-500 text-gold-500" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-gray-700 leading-relaxed mb-3 text-sm">"{t.text}"</p>
              {t.translation && (
                <p className="text-gray-400 text-xs italic mb-4">({t.translation})</p>
              )}

              {/* Customer */}
              <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
                <div className="w-10 h-10 bg-brand-700 rounded-full flex items-center justify-center text-white font-bold text-sm">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-gray-900 text-sm">{t.name}</p>
                  <p className="text-gray-400 text-xs">📍 {t.location}</p>
                </div>
                <span className="ml-auto text-xs bg-brand-50 text-brand-700 font-semibold px-2 py-0.5 rounded-full">
                  Verified
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
