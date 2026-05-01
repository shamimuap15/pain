import {
  collection, addDoc, getDocs, doc, updateDoc,
  query, orderBy, onSnapshot, type Unsubscribe,
} from 'firebase/firestore'
import { db } from './firebase'
import type { Order, OrderStatus } from '../types'

const ADMIN_KEY = 'herborelief_admin'

export async function getOrders(): Promise<Order[]> {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
  const snapshot = await getDocs(q)
  return snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Order))
}

export function subscribeOrders(
  callback: (orders: Order[]) => void,
  onError?: (err: Error) => void,
): Unsubscribe {
  const q = query(collection(db, 'orders'), orderBy('createdAt', 'desc'))
  return onSnapshot(
    q,
    snapshot => callback(snapshot.docs.map(d => ({ ...d.data(), id: d.id } as Order))),
    err => onError?.(err),
  )
}

export async function saveOrder(order: Omit<Order, 'id'>): Promise<void> {
  await addDoc(collection(db, 'orders'), order)
}

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  await updateDoc(doc(db, 'orders', orderId), { status })
}

export function generateOrderNumber(): string {
  return `ORD-${Date.now().toString(36).toUpperCase().slice(-6)}`
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
