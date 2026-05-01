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
