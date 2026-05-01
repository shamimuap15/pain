import { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { Lock } from 'lucide-react'
import { adminLogin, isAdminLoggedIn } from '../lib/storage'

export default function AdminLogin() {
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  if (isAdminLoggedIn()) {
    return <Navigate to="/admin/dashboard" replace />
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (adminLogin(password)) {
      navigate('/admin/dashboard', { replace: true })
    } else {
      setError('Incorrect password. Try admin123')
      setPassword('')
    }
  }

  return (
    <div className="min-h-screen bg-stone-100 flex items-center justify-center px-4">
      <div className="bg-white rounded-3xl shadow-xl p-10 w-full max-w-sm">
        <div className="flex flex-col items-center gap-3 mb-8">
          <div className="w-14 h-14 bg-brand-700 rounded-2xl flex items-center justify-center">
            <Lock size={24} className="text-white" />
          </div>
          <h1 className="text-2xl font-black text-gray-900">Admin Panel</h1>
          <p className="text-sm text-gray-500">HerboRelief Dashboard</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => { setPassword(e.target.value); setError('') }}
              placeholder="Enter admin password"
              className={`w-full px-4 py-3 rounded-xl border ${error ? 'border-red-400' : 'border-gray-200'} focus:outline-none focus:border-brand-500 text-sm`}
              autoFocus
            />
            {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
          </div>
          <button
            type="submit"
            className="w-full bg-brand-700 hover:bg-brand-600 text-white font-bold py-3 rounded-xl transition-colors"
          >
            Login
          </button>
        </form>

        <p className="text-center text-xs text-gray-400 mt-6">
          <a href="/" className="hover:text-brand-600 transition-colors">← Back to store</a>
        </p>
      </div>
    </div>
  )
}
