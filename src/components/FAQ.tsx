import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { FAQS } from '../data'

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className="py-20 bg-stone-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-14">
          <span className="text-brand-600 font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl sm:text-4xl font-black text-gray-900 mt-2">Frequently Asked Questions</h2>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left hover:bg-stone-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.q}</span>
                <ChevronDown
                  size={18}
                  className={`flex-shrink-0 text-brand-600 transition-transform duration-200 ${open === i ? 'rotate-180' : ''}`}
                />
              </button>
              {open === i && (
                <div className="px-5 pb-5">
                  <p className="text-gray-500 leading-relaxed">{faq.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
