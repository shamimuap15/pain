const steps = [
  {
    step: '01',
    title: 'Apply 4–6 Drops',
    desc: 'Pour 4–6 drops of HerboRelief directly onto the painful area — back, knee, shoulder, or joints.',
    icon: '💧',
  },
  {
    step: '02',
    title: 'Massage Gently',
    desc: 'Using your fingertips, massage in firm circular motions for 2–3 minutes until fully absorbed.',
    icon: '🤲',
  },
  {
    step: '03',
    title: 'Feel the Relief',
    desc: 'Within 5–15 minutes you\'ll feel a warming sensation followed by deep, lasting pain relief.',
    icon: '✨',
  },
]

export default function HowToUse() {
  return (
    <section id="how-to-use" className="py-20 bg-stone-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">Application Guide</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">
            3 Simple Steps to Relief
          </h2>
          <p className="text-gray-500 mt-3 max-w-xl mx-auto">
            No complicated routines. Just apply, massage, and feel the difference.
          </p>
        </div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden md:block absolute top-16 left-1/4 right-1/4 h-0.5 bg-brand-200 z-0" />

          <div className="grid md:grid-cols-3 gap-8 relative z-10">
            {steps.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-brand-700 rounded-full flex items-center justify-center text-3xl shadow-lg shadow-brand-700/30">
                    {s.icon}
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 bg-gold-500 text-white text-xs font-black rounded-full flex items-center justify-center">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-bold text-xl text-gray-900 mb-3">{s.title}</h3>
                <p className="text-gray-500 leading-relaxed max-w-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-12 p-6 bg-brand-50 border border-brand-200 rounded-2xl text-center max-w-2xl mx-auto">
          <p className="text-brand-800 font-medium">
            💡 <strong>Pro Tip:</strong> For best results, use twice daily — morning and night. Warm the area with a hot water bag before application to enhance absorption.
          </p>
        </div>
      </div>
    </section>
  )
}
