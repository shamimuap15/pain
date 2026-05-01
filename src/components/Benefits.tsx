import { BENEFITS } from '../data'

export default function Benefits() {
  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Why HerboRelief</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
            Feel the Difference Every Day
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            A formula carefully crafted to give you real relief — not just temporary masking of pain.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {BENEFITS.map(b => (
            <div
              key={b.title}
              className="group p-6 rounded-2xl border border-gray-100 hover:border-brand-200 hover:shadow-lg hover:shadow-brand-100 transition-all duration-300 bg-stone-50 hover:bg-white"
            >
              <div className="w-12 h-12 bg-brand-50 rounded-xl flex items-center justify-center text-2xl mb-4 group-hover:scale-110 transition-transform">
                {b.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-lg mb-2">{b.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{b.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
