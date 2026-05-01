const stats = [
  { value: '50,000+', label: 'Happy Customers' },
  { value: '12', label: 'Natural Ingredients' },
  { value: '6 hrs', label: 'Lasting Relief' },
  { value: '100%', label: 'Herbal & Safe' },
]

export default function Stats() {
  return (
    <section id="stats" className="bg-brand-800 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(s => (
            <div key={s.label} className="text-center">
              <p className="text-3xl sm:text-4xl font-black text-gold-400">{s.value}</p>
              <p className="text-brand-200 text-sm mt-1 font-medium">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
