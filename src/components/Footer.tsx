import { Leaf, Phone, Mail, MapPin } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-brand-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-brand-700 rounded-full flex items-center justify-center">
                <Leaf size={18} className="text-white" />
              </div>
              <span className="font-black text-xl">HerboRelief</span>
            </div>
            <p className="text-brand-300 leading-relaxed max-w-sm text-sm">
              Bangladesh's most trusted natural pain relief oil. Made with pure herbal extracts, trusted by 50,000+ customers across the country.
            </p>
            <div className="flex flex-col gap-3 mt-6">
              <div className="flex items-center gap-2 text-brand-300 text-sm">
                <Phone size={14} className="text-gold-400" />
                <span>01700-000000</span>
              </div>
              <div className="flex items-center gap-2 text-brand-300 text-sm">
                <Mail size={14} className="text-gold-400" />
                <span>support@herborelief.com.bd</span>
              </div>
              <div className="flex items-center gap-2 text-brand-300 text-sm">
                <MapPin size={14} className="text-gold-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Quick Links</h4>
            <ul className="flex flex-col gap-2">
              {[
                ['Benefits', '#benefits'],
                ['Ingredients', '#ingredients'],
                ['How to Use', '#how-to-use'],
                ['Reviews', '#testimonials'],
                ['Order Now', '#product'],
              ].map(([label, href]) => (
                <li key={label}>
                  <a href={href} className="text-brand-300 hover:text-white text-sm transition-colors">{label}</a>
                </li>
              ))}
            </ul>
          </div>

          {/* Policies */}
          <div>
            <h4 className="font-bold text-white mb-4 text-sm uppercase tracking-widest">Policies</h4>
            <ul className="flex flex-col gap-2">
              {['Return Policy', 'Privacy Policy', 'Shipping Policy', 'Terms of Use'].map(label => (
                <li key={label}>
                  <span className="text-brand-300 text-sm cursor-pointer hover:text-white transition-colors">{label}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-brand-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-brand-400 text-xs">
          <p>© 2024 HerboRelief. All rights reserved.</p>
          <p>Made with ❤️ in Bangladesh · 100% Natural · Proudly Bangladeshi</p>
        </div>
      </div>
    </footer>
  )
}
