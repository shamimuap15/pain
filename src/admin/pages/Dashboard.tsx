import { useState, useEffect, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { ShoppingBag, Users, TrendingUp, Clock } from 'lucide-react'
import { subscribeOrders } from '../../lib/storage'
import type { Order, OrderStatus } from '../../types'

const STATUS_COLORS: Record<OrderStatus, string> = {
  pending: 'bg-yellow-100 text-yellow-700',
  confirmed: 'bg-blue-100 text-blue-700',
  processing: 'bg-purple-100 text-purple-700',
  shipped: 'bg-indigo-100 text-indigo-700',
  delivered: 'bg-green-100 text-green-700',
  cancelled: 'bg-red-100 text-red-700',
}

export default function Dashboard() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsub = subscribeOrders(data => {
      setOrders(data)
      setLoading(false)
    })
    return unsub
  }, [])

  const stats = useMemo(() => {
    const totalRevenue = orders.filter(o => o.status !== 'cancelled').reduce((sum, o) => sum + o.total, 0)
    const uniqueCustomers = new Set(orders.map(o => o.customer.phone)).size
    const pending = orders.filter(o => o.status === 'pending').length
    return { totalOrders: orders.length, totalRevenue, uniqueCustomers, pending }
  }, [orders])

  const recentOrders = orders.slice(0, 5)

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-black text-gray-900">Dashboard</h1>
        <p className="text-gray-500 text-sm mt-1">Overview of your store</p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
        {[
          { label: 'Total Orders', value: loading ? '—' : stats.totalOrders, icon: ShoppingBag, color: 'bg-blue-50 text-blue-600' },
          { label: 'Total Revenue', value: loading ? '—' : `৳${stats.totalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-green-50 text-green-600' },
          { label: 'Customers', value: loading ? '—' : stats.uniqueCustomers, icon: Users, color: 'bg-purple-50 text-purple-600' },
          { label: 'Pending Orders', value: loading ? '—' : stats.pending, icon: Clock, color: 'bg-yellow-50 text-yellow-600' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-white rounded-2xl p-5 border border-gray-100 flex items-center gap-4">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0 ${color}`}>
              <Icon size={22} />
            </div>
            <div>
              <p className="text-2xl font-black text-gray-900">{value}</p>
              <p className="text-xs text-gray-500 font-medium">{label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Orders */}
      <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="font-bold text-gray-900">Recent Orders</h2>
          <Link to="/admin/orders" className="text-sm text-brand-600 font-semibold hover:text-brand-700 transition-colors">
            View all →
          </Link>
        </div>

        {loading ? (
          <div className="py-12 text-center text-gray-400 text-sm">Loading orders...</div>
        ) : recentOrders.length === 0 ? (
          <div className="py-16 text-center text-gray-400">
            <ShoppingBag size={32} className="mx-auto mb-3 opacity-40" />
            <p className="font-medium">No orders yet</p>
            <p className="text-sm mt-1">Orders will appear here once customers place them</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {recentOrders.map(order => (
              <div key={order.id} className="px-6 py-4 flex items-center gap-4">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900 text-sm">{order.orderNumber}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-semibold capitalize ${STATUS_COLORS[order.status]}`}>
                      {order.status}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-0.5">{order.customer.name} · {order.customer.phone}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900 text-sm">৳{order.total}</p>
                  <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleDateString('en-BD')}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
