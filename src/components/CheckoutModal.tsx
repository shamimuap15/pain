import { useState } from 'react'
import { X, CheckCircle, ChevronDown } from 'lucide-react'
import { useCart } from '../context/CartContext'
import type { OrderForm } from '../types'
import { saveOrder, generateOrderNumber } from '../lib/storage'

interface Props {
  open: boolean
  onClose: () => void
}

const DISTRICTS = ['Dhaka', 'Chittagong', 'Sylhet', 'Rajshahi', 'Khulna', 'Barisal', 'Rangpur', 'Mymensingh', 'Comilla', 'Narsingdi', 'Gazipur', 'Other']

export default function CheckoutModal({ open, onClose }: Props) {
  const { items, total, clearCart } = useCart()
  const [form, setForm] = useState<OrderForm>({
    name: '', phone: '', address: '', thana: '', district: 'Dhaka', payment: 'cod',
  })
  const [errors, setErrors] = useState<Partial<OrderForm>>({})
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const delivery = total >= 500 ? 0 : 60
  const grandTotal = total + delivery

  const validate = () => {
    const e: Partial<OrderForm> = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.phone.match(/^01[3-9]\d{8}$/)) e.phone = 'Enter valid BD phone number'
    if (!form.address.trim()) e.address = 'Address is required'
    if (!form.thana.trim()) e.thana = 'Thana/Upazila is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validate()) return
    setLoading(true)
    await new Promise(r => setTimeout(r, 1500))
    saveOrder({
      id: crypto.randomUUID(),
      orderNumber: generateOrderNumber(),
      createdAt: new Date().toISOString(),
      customer: { name: form.name, phone: form.phone, address: form.address, thana: form.thana, district: form.district },
      items,
      subtotal: total,
      delivery,
      total: grandTotal,
      payment: form.payment,
      status: 'pending',
    })
    setLoading(false)
    setSubmitted(true)
    clearCart()
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setSubmitted(false); setForm({ name: '', phone: '', address: '', thana: '', district: 'Dhaka', payment: 'cod' }) }, 300)
  }

  const set = (field: keyof OrderForm) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm(prev => ({ ...prev, [field]: e.target.value }))

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto py-6 px-4">
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={handleClose} />

      <div className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl my-auto">
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="font-black text-xl text-gray-900">
            {submitted ? 'Order Confirmed! 🎉' : 'Complete Your Order'}
          </h2>
          <button onClick={handleClose} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {submitted ? (
          /* Success State */
          <div className="p-10 flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle size={40} className="text-green-600" />
            </div>
            <h3 className="text-2xl font-black text-gray-900">Thank You, {form.name}!</h3>
            <p className="text-gray-500 max-w-sm">
              Your order has been placed successfully. Our team will call you at <strong>{form.phone}</strong> to confirm within 2 hours.
            </p>
            <div className="w-full bg-stone-50 rounded-2xl p-4 text-left">
              <p className="text-sm font-semibold text-gray-700 mb-1">Delivery to:</p>
              <p className="text-gray-600 text-sm">{form.address}, {form.thana}, {form.district}</p>
              <p className="text-sm font-semibold text-gray-700 mt-2 mb-1">Payment:</p>
              <p className="text-gray-600 text-sm capitalize">{form.payment === 'cod' ? 'Cash on Delivery' : 'bKash'}</p>
            </div>
            <button onClick={handleClose} className="mt-2 bg-brand-700 text-white font-bold px-8 py-3 rounded-xl hover:bg-brand-600 transition-colors">
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Left — Form */}
              <div className="flex flex-col gap-4">
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-widest">Delivery Information</h3>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name *</label>
                  <input
                    type="text" value={form.name} onChange={set('name')}
                    placeholder="Your full name"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.name ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-brand-500 text-sm`}
                  />
                  {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Phone Number *</label>
                  <input
                    type="tel" value={form.phone} onChange={set('phone')}
                    placeholder="01XXXXXXXXX"
                    className={`w-full px-4 py-3 rounded-xl border ${errors.phone ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-brand-500 text-sm`}
                  />
                  {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1">Full Address *</label>
                  <textarea
                    value={form.address} onChange={set('address')}
                    placeholder="House no, road no, area..."
                    rows={2}
                    className={`w-full px-4 py-3 rounded-xl border ${errors.address ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-brand-500 text-sm resize-none`}
                  />
                  {errors.address && <p className="text-red-500 text-xs mt-1">{errors.address}</p>}
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">Thana/Upazila *</label>
                    <input
                      type="text" value={form.thana} onChange={set('thana')}
                      placeholder="e.g. Mirpur"
                      className={`w-full px-4 py-3 rounded-xl border ${errors.thana ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-brand-500 text-sm`}
                    />
                    {errors.thana && <p className="text-red-500 text-xs mt-1">{errors.thana}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">District *</label>
                    <div className="relative">
                      <select
                        value={form.district} onChange={set('district')}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-500 text-sm appearance-none"
                      >
                        {DISTRICTS.map(d => <option key={d}>{d}</option>)}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Payment */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Payment Method *</label>
                  <div className="flex gap-3">
                    {([['cod', '💵 Cash on Delivery'], ['bkash', '📱 bKash']] as const).map(([val, label]) => (
                      <label
                        key={val}
                        className={`flex-1 flex items-center justify-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all text-sm font-semibold ${
                          form.payment === val ? 'border-brand-600 bg-brand-50 text-brand-700' : 'border-gray-200 text-gray-600'
                        }`}
                      >
                        <input
                          type="radio" name="payment" value={val}
                          checked={form.payment === val}
                          onChange={set('payment')}
                          className="sr-only"
                        />
                        {label}
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              {/* Right — Order Summary */}
              <div>
                <h3 className="font-bold text-gray-700 text-sm uppercase tracking-widest mb-4">Order Summary</h3>
                <div className="bg-stone-50 rounded-2xl p-4 flex flex-col gap-3">
                  {items.map(item => (
                    <div key={item.variant.id} className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-brand-700 rounded-lg flex items-center justify-center text-lg flex-shrink-0">🌿</div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-gray-900">HerboRelief Oil</p>
                        <p className="text-xs text-gray-500">{item.variant.size} × {item.quantity}</p>
                      </div>
                      <p className="text-sm font-bold text-brand-700">৳{item.variant.price * item.quantity}</p>
                    </div>
                  ))}
                  <div className="border-t border-gray-200 pt-3 flex flex-col gap-1">
                    <div className="flex justify-between text-sm text-gray-500">
                      <span>Subtotal</span><span>৳{total}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Delivery</span>
                      <span className={delivery === 0 ? 'text-green-600 font-semibold' : 'text-gray-700'}>
                        {delivery === 0 ? 'FREE' : `৳${delivery}`}
                      </span>
                    </div>
                    <div className="flex justify-between font-black text-base pt-1 border-t border-gray-200 mt-1">
                      <span>Total</span>
                      <span className="text-brand-700">৳{grandTotal}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-xl text-xs text-green-700">
                  ✅ 7-day return guarantee · No questions asked
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full bg-gold-500 hover:bg-gold-400 disabled:bg-gray-300 text-white font-black py-4 rounded-xl transition-all text-lg"
            >
              {loading ? 'Placing Order...' : `Confirm Order — ৳${grandTotal}`}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
