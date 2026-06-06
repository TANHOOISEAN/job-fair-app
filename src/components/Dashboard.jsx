import React from 'react'
import { TrendingUp, Users, Target, CheckCircle } from 'lucide-react'

export default function Dashboard({ candidates, eventDate }) {
  const stats = {
    total: candidates.length,
    hot: candidates.filter(c => c.path === 'HOT').length,
    warm: candidates.filter(c => c.path === 'WARM').length,
    cold: candidates.filter(c => c.path === 'COLD').length,
    interviewed: candidates.filter(c => c.interviewBooked).length,
    whatsappSent: candidates.filter(c => c.whatsappSent).length,
    eventConfirmed: candidates.filter(c => c.eventConfirmed).length,
  }

  const conversionRate = stats.total > 0 ? Math.round(((stats.hot + stats.warm) / stats.total) * 100) : 0

  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="card border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Total Candidates</p>
              <p className="text-3xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <Users className="w-10 h-10 text-blue-500 opacity-20" />
          </div>
        </div>

        <div className="card border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">HOT Leads</p>
              <p className="text-3xl font-bold text-red-600">{stats.hot}</p>
            </div>
            <Target className="w-10 h-10 text-red-500 opacity-20" />
          </div>
        </div>

        <div className="card border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">WARM Leads</p>
              <p className="text-3xl font-bold text-amber-600">{stats.warm}</p>
            </div>
            <TrendingUp className="w-10 h-10 text-amber-500 opacity-20" />
          </div>
        </div>

        <div className="card border-l-4 border-gray-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm font-medium">Conversion Rate</p>
              <p className="text-3xl font-bold text-gray-900">{conversionRate}%</p>
              <p className="text-xs text-gray-400 mt-1">Target: 60-70%</p>
            </div>
            <CheckCircle className="w-10 h-10 text-gray-500 opacity-20" />
          </div>
        </div>
      </div>

      {/* Follow-up Status */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Follow-up Status</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-gray-600 text-sm">Interviews Booked</p>
            <p className="text-2xl font-bold text-blue-600">{stats.interviewed} <span className="text-sm text-gray-500">({stats.total > 0 ? Math.round((stats.interviewed/stats.total)*100) : 0}%)</span></p>
          </div>
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <p className="text-gray-600 text-sm">WhatsApp Sent</p>
            <p className="text-2xl font-bold text-green-600">{stats.whatsappSent} <span className="text-sm text-gray-500">({stats.total > 0 ? Math.round((stats.whatsappSent/stats.total)*100) : 0}%)</span></p>
          </div>
          <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
            <p className="text-gray-600 text-sm">Event Confirmed</p>
            <p className="text-2xl font-bold text-purple-600">{stats.eventConfirmed} <span className="text-sm text-gray-500">({stats.total > 0 ? Math.round((stats.eventConfirmed/stats.total)*100) : 0}%)</span></p>
          </div>
        </div>
      </div>

      {/* Path Distribution */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">Candidate Distribution (by Path)</h2>
        <div className="space-y-3">
          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">HOT (Interview Now)</span>
              <span className="text-sm font-bold text-red-600">{stats.hot}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-red-600 h-2 rounded-full transition-all"
                style={{ width: stats.total > 0 ? `${(stats.hot / stats.total) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">WARM (WhatsApp + Event)</span>
              <span className="text-sm font-bold text-amber-600">{stats.warm}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-amber-500 h-2 rounded-full transition-all"
                style={{ width: stats.total > 0 ? `${(stats.warm / stats.total) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">COLD (Referral)</span>
              <span className="text-sm font-bold text-gray-600">{stats.cold}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-gray-500 h-2 rounded-full transition-all"
                style={{ width: stats.total > 0 ? `${(stats.cold / stats.total) * 100}%` : '0%' }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      {eventDate && (
        <div className="card bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500">
          <h3 className="font-bold text-gray-900 mb-2">📅 Event Scheduled</h3>
          <p className="text-sm text-gray-700">Follow-up event: <span className="font-bold">{new Date(eventDate).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span></p>
          <p className="text-xs text-gray-500 mt-2">Target: {stats.warm} WARM candidates attending</p>
        </div>
      )}

      {/* TARGETS */}
      <div className="card border border-green-300 bg-green-50">
        <h3 className="font-bold text-green-900 mb-3">🎯 3-Hour Event Targets</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-sm">
          <div>
            <p className="text-green-700 font-medium">Total to Process</p>
            <p className="text-lg font-bold text-green-900">90–100 <span className="text-xs font-normal text-green-600">current: {stats.total}</span></p>
          </div>
          <div>
            <p className="text-green-700 font-medium">Hot Interview Goals</p>
            <p className="text-lg font-bold text-green-900">12–15 <span className="text-xs font-normal text-green-600">current: {stats.interviewed}</span></p>
          </div>
          <div>
            <p className="text-green-700 font-medium">Qualified Leads</p>
            <p className="text-lg font-bold text-green-900">62–85 <span className="text-xs font-normal text-green-600">current: {stats.hot + stats.warm}</span></p>
          </div>
        </div>
      </div>
    </div>
  )
}
