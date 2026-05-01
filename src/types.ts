export interface ProductVariant {
  id: string
  size: string
  price: number
  originalPrice: number
  savings: number
}

export interface CartItem {
  variant: ProductVariant
  quantity: number
}

export interface OrderForm {
  name: string
  phone: string
  address: string
  thana: string
  district: string
  payment: 'cod' | 'bkash'
}

export type OrderStatus = 'pending' | 'confirmed' | 'processing' | 'shipped' | 'delivered' | 'cancelled'

export interface Order {
  id: string
  orderNumber: string
  createdAt: string
  customer: {
    name: string
    phone: string
    address: string
    thana: string
    district: string
  }
  items: CartItem[]
  subtotal: number
  delivery: number
  total: number
  payment: 'cod' | 'bkash'
  status: OrderStatus
}
