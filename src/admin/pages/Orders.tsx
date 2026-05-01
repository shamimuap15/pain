import { useState, useMemo } from 'react'
import { Search, ChevronDown, X } from 'lucide-react'
import { getOrders, updateOrderStatus } from '../../lib/storage'
import type { Order, OrderStatus } from '../../types'

const ALL_STATUSES: OrderStatus[] = ['pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled']

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function Orders() {
  const [orders, setOrders] = useState<Order[]>(() => getOrders())
  const [search, setSearch] = useState('')
  const [filterStatus, setFilterStatus] = useState<OrderStatus | 'all'>('all')
  const [selected, setSelected] = useState<Order | null>(null)

  const filtered = useMemo(() => {
    return orders.filter(o => {
      const matchesStatus = filterStatus === 'all' || o.status === filterStatus
      const q = search.toLowerCase()
      const matchesSearch = !q || o.orderNumber.toLowerCase().includes(q) ||
        o.customer.name.toLowerCase().includes(q) || o.customer.phone.includes(q)
      return matchesStatus && matchesSearch
    })
  }, [orders, search, filterStatus])

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status)
    setOrders(getOrders())
    if (selected?.id === orderId) setSelected(prev => prev ? { ...prev, status } : null)
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-900">Orders</h1>
        <p className="text-gray-500 text-sm mt-1">{orders.length} total orders</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-5">
        <div className="relative flex-1 min-w-48">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search by name, phone, order #..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-500 bg-white"
          />
        </div>
        <div className="relative">
          <select
            value={filterStatus}
            onChange={e => setFilterStatus(e.target.value as OrderStatus | 'all')}
            className="pl-4 pr-8 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-none focus:border-brand-500 bg-white appearance-none font-medium text-gray-700"
          >
            <option value="all">All Status</option>
            {ALL_STATUSES.map(s => <option key={s} value={s} className="capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
          </select>
          <ChevronDown size={13} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        {filtered.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <p className="font-medium">No orders found</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 bg-stone-50">
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Order</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Customer</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Items</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Total</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Payment</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Status</th>
                  <th className="text-left px-5 py-3 font-semibold text-gray-500 text-xs uppercase tracking-wide">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {filtered.map(order => (
                  <tr
                    key={order.id}
                    className="hover:bg-stone-50 cursor-pointer transition-colors"
                    onClick={() => setSelected(order)}
                  >
                    <td className="px-5 py-4 font-semibold text-brand-700">{order.orderNumber}</td>
                    <td className="px-5 py-4">
                      <p className="font-semibold text-gray-900">{order.customer.name}</p>
                      <p className="text-gray-400 text-xs">{order.customer.phone}</p>
                    </td>
                    <td className="px-5 py-4 text-gray-600">
                      {order.items.map(i => `${i.variant.size} ×${i.quantity}`).join(', ')}
                    </td>
                    <td className="px-5 py-4 font-bold text-gray-900">৳{order.total}</td>
                    <td className="px-5 py-4 text-gray-600 capitalize">{order.payment === 'cod' ? 'COD' : 'bKash'}</td>
                    <td className="px-5 py-4">
                      <div className="relative" onClick={e => e.stopPropagation()}>
                        <select
                          value={order.status}
                          onChange={e => handleStatusChange(order.id, e.target.value as OrderStatus)}
                          className={`text-xs font-semibold px-3 py-1.5 rounded-full border-0 appearance-none cursor-pointer pr-6 ${STATUS_COLORS[order.status]}`}
                        >
                          {ALL_STATUSES.map(s => (
                            <option key={s} value={s} className="bg-white text-gray-800 capitalize">{s.charAt(0).toUpperCase() + s.slice(1)}</option>
                          ))}
                        </select>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-gray-400 text-xs">
                      {new Date(order.createdAt).toLocaleDateString('en-BD')}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Order Detail Drawer */}
      {selected && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="fixed inset-0 bg-black/40" onClick={() => setSelected(null)} />
          <div className="relative bg-white w-full max-w-md h-full overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h2 className="font-black text-gray-900">{selected.orderNumber}</h2>
                <p className="text-xs text-gray-400 mt-0.5">{new Date(selected.createdAt).toLocaleString('en-BD')}</p>
              </div>
              <button onClick={() => setSelected(null)} className="p-2 hover:bg-gray-100 rounded-full transition-colors">
                <X size={18} className="text-gray-500" />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-6">
              {/* Status */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">Update Status</p>
                <div className="flex flex-wrap gap-2">
                  {ALL_STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => handleStatusChange(selected.id, s)}
                      className={`text-xs px-3 py-1.5 rounded-full font-semibold transition-all capitalize border ${
                        selected.status === s ? STATUS_COLORS[s] + ' border-transparent' : 'border-gray-200 text-gray-500 hover:border-gray-300'
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer */}
              <div className="bg-stone-50 rounded-2xl p-4">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Customer</p>
                <p className="font-bold text-gray-900">{selected.customer.name}</p>
                <p className="text-sm text-gray-600 mt-0.5">{selected.customer.phone}</p>
                <p className="text-sm text-gray-600 mt-1">{selected.customer.address}, {selected.customer.thana}, {selected.customer.district}</p>
              </div>

              {/* Items */}
              <div>
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-3">Order Items</p>
                <div className="flex flex-col gap-3">
                  {selected.items.map(item => (
                    <div key={item.variant.id} className="flex items-center gap-3 bg-stone-50 rounded-xl p-3">
                      <div className="w-10 h-10 bg-brand-700 rounded-lg flex items-center justify-center text-lg flex-shrink-0">🌿</div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-gray-900">HerboRelief Oil — {item.variant.size}</p>
                        <p className="text-xs text-gray-500">Qty: {item.quantity} × ৳{item.variant.price}</p>
                      </div>
                      <p className="font-bold text-gray-900 text-sm">৳{item.variant.price * item.quantity}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Totals */}
              <div className="border-t border-gray-100 pt-4 flex flex-col gap-1.5">
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Subtotal</span><span>৳{selected.subtotal}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>Delivery</span>
                  <span className={selected.delivery === 0 ? 'text-green-600 font-semibold' : ''}>{selected.delivery === 0 ? 'FREE' : `৳${selected.delivery}`}</span>
                </div>
                <div className="flex justify-between font-black text-base pt-1 border-t border-gray-100 mt-1">
                  <span>Total</span><span className="text-brand-700">৳{selected.total}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 mt-1">
                  <span>Payment</span><span className="capitalize font-semibold">{selected.payment === 'cod' ? 'Cash on Delivery' : 'bKash'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
