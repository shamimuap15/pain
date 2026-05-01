import { useState } from 'react'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { useCart } from '../context/CartContext'
import CheckoutModal from './CheckoutModal'

export default function CartSidebar() {
  const { items, removeItem, updateQuantity, total, itemCount, isOpen, setIsOpen } = useCart()
  const [checkoutOpen, setCheckoutOpen] = useState(false)

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 shadow-2xl flex flex-col transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        {/* Header */}
        <div className="flex items-center justify-between p-5 border-b border-gray-100">
          <div className="flex items-center gap-2">
            <ShoppingBag size={20} className="text-brand-700" />
            <h2 className="font-bold text-gray-900 text-lg">Your Cart</h2>
            {itemCount > 0 && (
              <span className="bg-brand-700 text-white text-xs font-bold px-2 py-0.5 rounded-full">{itemCount}</span>
            )}
          </div>
          <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
            <X size={18} className="text-gray-500" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center gap-4">
              <div className="text-6xl">🛒</div>
              <p className="text-gray-500 font-medium">Your cart is empty</p>
              <button
                onClick={() => setIsOpen(false)}
                className="text-brand-600 font-semibold hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              {items.map(item => (
                <div key={item.variant.id} className="flex gap-4 p-4 bg-stone-50 rounded-xl">
                  {/* Mini bottle icon */}
                  <div className="w-14 h-14 bg-brand-700 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">
                    🌿
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-gray-900 text-sm">HerboRelief Oil</p>
                    <p className="text-gray-500 text-xs">{item.variant.size}</p>
                    <p className="text-brand-700 font-bold mt-1">৳{item.variant.price}</p>
                  </div>
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => removeItem(item.variant.id)}
                      className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <Trash2 size={14} />
                    </button>
                    <div className="flex items-center border border-gray-200 rounded-lg overflow-hidden">
                      <button
                        onClick={() => updateQuantity(item.variant.id, item.quantity - 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                      >−</button>
                      <span className="px-2 py-1 text-sm font-bold text-gray-900 min-w-[28px] text-center">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.variant.id, item.quantity + 1)}
                        className="px-2 py-1 text-gray-600 hover:bg-gray-100 text-sm font-bold"
                      >+</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-5 border-t border-gray-100 bg-white">
            <div className="flex justify-between items-center mb-1">
              <span className="text-gray-500">Subtotal</span>
              <span className="font-bold text-gray-900">৳{total}</span>
            </div>
            <div className="flex justify-between items-center mb-4">
              <span className="text-gray-500 text-sm">Delivery</span>
              <span className="text-green-600 text-sm font-semibold">{total >= 500 ? 'FREE' : '৳60'}</span>
            </div>
            <div className="flex justify-between items-center text-lg font-black mb-4">
              <span>Total</span>
              <span className="text-brand-700">৳{total >= 500 ? total : total + 60}</span>
            </div>
            <button
              onClick={() => { setCheckoutOpen(true); setIsOpen(false) }}
              className="w-full bg-gold-500 hover:bg-gold-400 text-white font-bold py-4 rounded-xl transition-all hover:shadow-lg"
            >
              Proceed to Checkout →
            </button>
            <p className="text-center text-xs text-gray-400 mt-2">Cash on Delivery · bKash available</p>
          </div>
        )}
      </div>

      <CheckoutModal open={checkoutOpen} onClose={() => setCheckoutOpen(false)} />
    </>
  )
}
