import type { Order, OrderStatus } from '../types'

const ORDERS_KEY = 'herborelief_orders'
const ADMIN_KEY = 'herborelief_admin'

export function getOrders(): Order[] {
  try {
    return JSON.parse(localStorage.getItem(ORDERS_KEY) || '[]')
  } catch {
    return []
  }
}

export function saveOrder(order: Order): void {
  const orders = getOrders()
  localStorage.setItem(ORDERS_KEY, JSON.stringify([order, ...orders]))
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  const orders = getOrders().map(o => o.id === orderId ? { ...o, status } : o)
  localStorage.setItem(ORDERS_KEY, JSON.stringify(orders))
}

export function generateOrderNumber(): string {
  const count = getOrders().length + 1
  return `ORD-${String(count).padStart(4, '0')}`
}

export function isAdminLoggedIn(): boolean {
  return localStorage.getItem(ADMIN_KEY) === 'true'
}

export function adminLogin(password: string): boolean {
  if (password === 'admin123') {
    localStorage.setItem(ADMIN_KEY, 'true')
    return true
  }
  return false
}

export function adminLogout(): void {
  localStorage.removeItem(ADMIN_KEY)
}
