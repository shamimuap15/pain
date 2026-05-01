import { createContext, useContext, useState, ReactNode } from 'react'
import type { CartItem, ProductVariant } from '../types'

interface CartContextType {
  items: CartItem[]
  addItem: (variant: ProductVariant) => void
  removeItem: (variantId: string) => void
  updateQuantity: (variantId: string, quantity: number) => void
  clearCart: () => void
  total: number
  itemCount: number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  const addItem = (variant: ProductVariant) => {
    setItems(prev => {
      const existing = prev.find(i => i.variant.id === variant.id)
      if (existing) {
        return prev.map(i =>
          i.variant.id === variant.id ? { ...i, quantity: i.quantity + 1 } : i
        )
      }
      return [...prev, { variant, quantity: 1 }]
    })
    setIsOpen(true)
  }

  const removeItem = (variantId: string) => {
    setItems(prev => prev.filter(i => i.variant.id !== variantId))
  }

  const updateQuantity = (variantId: string, quantity: number) => {
    if (quantity <= 0) { removeItem(variantId); return }
    setItems(prev => prev.map(i => i.variant.id === variantId ? { ...i, quantity } : i))
  }

  const clearCart = () => setItems([])
  const total = items.reduce((sum, i) => sum + i.variant.price * i.quantity, 0)
  const itemCount = items.reduce((sum, i) => sum + i.quantity, 0)

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, total, itemCount, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
