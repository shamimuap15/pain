import { INGREDIENTS } from '../data'

export default function Ingredients() {
  return (
    <section id="ingredients" className="py-20 bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-gold-400 font-semibold text-sm uppercase tracking-wider">What's Inside</span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-2">
            Pure Nature, Zero Chemicals
          </h2>
          <p className="text-brand-300 mt-3 max-w-xl mx-auto">
            Every ingredient is handpicked for its proven therapeutic properties. No fillers, no shortcuts.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {INGREDIENTS.map(ing => (
            <div
              key={ing.name}
              className="flex gap-4 p-5 rounded-2xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all"
            >
              <div className="text-4xl flex-shrink-0">{ing.emoji}</div>
              <div>
                <h3 className="font-bold text-white text-base">{ing.name}</h3>
                <span className="text-xs text-gold-400 font-semibold uppercase tracking-wide">{ing.benefit}</span>
                <p className="text-brand-300 text-sm mt-1 leading-relaxed">{ing.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
