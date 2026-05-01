import { useMemo, useState } from 'react'
import { Search, ShoppingBag } from 'lucide-react'
import { getOrders } from '../../lib/storage'
import type { Order } from '../../types'

interface Customer {
  phone: string
  name: string
  district: string
  orders: Order[]
  totalSpent: number
  lastOrderAt: string
}

export default function Customers() {
  const [search, setSearch] = useState('')

  const customers = useMemo<Customer[]>(() => {
    const orders = getOrders()
    const map = new Map<string, Customer>()
    for (const order of orders) {
      const key = order.customer.phone
      if (!map.has(key)) {
        map.set(key, { phone: key, name: order.customer.name, district: order.customer.district, orders: [], totalSpent: 0, lastOrderAt: order.createdAt })
      }
      const c = map.get(key)!
      c.orders.push(order)
      if (order.status !== 'cancelled') c.totalSpent += order.total
      if (order.createdAt > c.lastOrderAt) c.lastOrderAt = order.createdAt
    }
    return Array.from(map.values()).sort((a, b) => b.lastOrderAt.localeCompare(a.lastOrderAt))
  }, [])

  const filtered = useMemo(() => {
    const q = search.toLowerCase()
    if (!q) return customers
    return customers.filter(c =>
      c.name.toLowerCase().includes(q) || c.phone.includes(q) || c.district.toLowerCase().includes(q)
    )
  }, [customers, search])

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Customers</h1>
        <p className="text-gray-500 text-sm mt-1">{customers.length} unique customers</p>
      </div>

      <div className="relative mb-5 max-w-sm">
        <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search by name, phone, district..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-500 bg-white"
        />
      </div>

      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <ShoppingBag size={32} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No customers yet</p>
            <p className="text-sm mt-1">Customers will appear here after their first order</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-stone-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Customer</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Phone</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">District</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Orders</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Total Spent</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Last Order</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(c => (
                  <tr key={c.phone} className="hover:bg-stone-50 transition-colors">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-brand-100 rounded-full flex items-center justify-center font-bold text-brand-700 text-xs flex-shrink-0">
                          {c.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
                        </div>
                        <p className="font-semibold text-gray-900">{c.name}</p>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-600">{c.phone}</td>
                    <td className="px-5 py-4 text-gray-600">{c.district}</td>
                    <td className="px-5 py-4">
                      <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2.5 py-1 rounded-full">
                        {c.orders.length}
                      </span>
                    </td>
                    <td className="px-5 py-4 font-bold text-gray-900">৳{c.totalSpent.toLocaleString()}</td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(c.lastOrderAt).toLocaleDateString('en-BD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
