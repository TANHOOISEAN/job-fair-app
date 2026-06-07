import React, { useState } from 'react'
import { Trash2, Filter, ChevronDown } from 'lucide-react'

export default function CandidateList({ candidates, onDelete }) {
  const [filterPath, setFilterPath] = useState('ALL')
  const [sortBy, setSortBy] = useState('recent')
  const [expandedId, setExpandedId] = useState(null)

  const filteredCandidates = filterPath === 'ALL'
    ? candidates
    : candidates.filter(c => c.path === filterPath)

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === 'recent') return new Date(b.createdAt) - new Date(a.createdAt)
    if (sortBy === 'name') return a.name.localeCompare(b.name)
    if (sortBy === 'hotfirst') {
      const pathOrder = { HOT: 0, WARM: 1, COLD: 2 }
      return pathOrder[a.path] - pathOrder[b.path]
    }
    return 0
  })

  const getPathColor = (path) => {
    switch (path) {
      case 'HOT': return 'badge-hot'
      case 'WARM': return 'badge-warm'
      case 'COLD': return 'badge-cold'
      default: return ''
    }
  }

  const getPathEmoji = (path) => {
    switch (path) {
      case 'HOT': return '🔴'
      case 'WARM': return '🟡'
      case 'COLD': return '⚪'
      default: return '•'
    }
  }

  return (
    <div className="space-y-4">
      {/* Filters */}
      <div className="card">
        <div className="flex items-center gap-3 flex-wrap">
          <Filter className="w-4 h-4 text-gray-600" />

          <select
            value={filterPath}
            onChange={(e) => setFilterPath(e.target.value)}
            className="input-field flex-1 md:flex-none md:w-40"
          >
            <option value="ALL">All Candidates ({candidates.length})</option>
            <option value="HOT">🔴 HOT ({candidates.filter(c => c.path === 'HOT').length})</option>
            <option value="WARM">🟡 WARM ({candidates.filter(c => c.path === 'WARM').length})</option>
            <option value="COLD">⚪ COLD ({candidates.filter(c => c.path === 'COLD').length})</option>
          </select>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-field flex-1 md:flex-none md:w-40"
          >
            <option value="recent">Most Recent</option>
            <option value="name">Name (A–Z)</option>
            <option value="hotfirst">HOT → WARM → COLD</option>
          </select>
        </div>
      </div>

      {/* Candidate List */}
      {sortedCandidates.length === 0 ? (
        <div className="card text-center py-12">
          <p className="text-gray-500 text-sm">No candidates found</p>
        </div>
      ) : (
        <div className="space-y-2">
          {sortedCandidates.map((candidate) => (
            <div key={candidate.id} className="card">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  {/* Name & Path */}
                  <div className="flex items-center gap-2 mb-2">
                    <span className={`${getPathColor(candidate.path)}`}>
                      {getPathEmoji(candidate.path)} {candidate.path}
                    </span>
                    {candidate.interviewBooked && (
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-semibold rounded">
                        📅 Interview
                      </span>
                    )}
                    {candidate.whatsappSent && (
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                        ✓ WhatsApp
                      </span>
                    )}
                    {candidate.eventConfirmed && (
                      <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs font-semibold rounded">
                        🎉 Event
                      </span>
                    )}
                  </div>

                  {/* Name & Contact */}
                  <h3 className="text-lg font-bold text-gray-900">{candidate.name}</h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-1 flex-wrap">
                    {candidate.recruiterName && <span className="px-2 py-1 bg-slate-200 text-slate-800 rounded text-xs font-semibold">👔 {candidate.recruiterName}</span>}
                    <span>🆔 {candidate.nric}</span>
                    <span>📱 {candidate.phone}</span>
                    {candidate.hometown && <span>📍 {candidate.hometown}</span>}
                  </div>

                  {/* Details */}
                  <div className="flex items-center gap-4 text-sm text-gray-600 mt-2 flex-wrap">
                    {candidate.disc && <span className="px-2 py-1 bg-gray-100 rounded">DISC: <strong>{candidate.disc}</strong></span>}
                    {candidate.incomeExpectation && <span className="px-2 py-1 bg-gray-100 rounded">💰 {candidate.incomeExpectation}</span>}
                    {candidate.interviewDate && <span className="px-2 py-1 bg-gray-100 rounded">📅 {new Date(candidate.interviewDate).toLocaleString()}</span>}
                  </div>

                  {/* Notes */}
                  {candidate.notes && (
                    <div className="mt-3 p-2 bg-yellow-50 border border-yellow-200 rounded text-sm text-gray-700 italic">
                      "{candidate.notes}"
                    </div>
                  )}

                  {/* Timestamp */}
                  <p className="text-xs text-gray-400 mt-2">Added: {candidate.createdAt}</p>

                  {/* Expanded Details */}
                  {expandedId === candidate.id && (
                    <div className="mt-4 pt-4 border-t border-gray-300 space-y-3">
                      <div className="bg-blue-50 p-3 rounded-lg">
                        <p className="font-bold text-blue-900 mb-2">🏪 Station 1: Fast Survey</p>
                        <div className="text-sm text-blue-800 space-y-1">
                          {candidate.q1_situation && <p><strong>Current Status:</strong> {candidate.q1_situation}</p>}
                          {candidate.q2_income && <p><strong>Income:</strong> {candidate.q2_income}</p>}
                          {candidate.q3_environment && <p><strong>Environment:</strong> {candidate.q3_environment}</p>}
                          {candidate.q4_social && <p><strong>Social:</strong> {candidate.q4_social}</p>}
                          {candidate.q5_speed && <p><strong>Career Speed:</strong> {candidate.q5_speed}</p>}
                        </div>
                      </div>

                      <div className="bg-purple-50 p-3 rounded-lg">
                        <p className="font-bold text-purple-900 mb-2">🧠 Station 2: Personality & Pitch</p>
                        <div className="text-sm text-purple-800 space-y-1">
                          {candidate.disc && <p><strong>DISC Type:</strong> {candidate.disc}</p>}
                          {candidate.notes && <p><strong>Notes:</strong> {candidate.notes}</p>}
                        </div>
                      </div>

                      <div className="bg-green-50 p-3 rounded-lg">
                        <p className="font-bold text-green-900 mb-2">✅ Station 3: Closing & Booking</p>
                        <div className="text-sm text-green-800 space-y-1">
                          {candidate.sessionTiming && <p><strong>Session Timing:</strong> {candidate.sessionTiming}</p>}
                          {candidate.referralCollected && <p><strong>Referral Collected:</strong> Yes</p>}
                          {candidate.referralDetails && <p><strong>Referral Details:</strong> {candidate.referralDetails}</p>}
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => setExpandedId(expandedId === candidate.id ? null : candidate.id)}
                    className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"
                    title="View Details"
                  >
                    <ChevronDown className={`w-5 h-5 transition-transform ${expandedId === candidate.id ? 'rotate-180' : ''}`} />
                  </button>
                  <button
                    onClick={() => onDelete(candidate.id)}
                    className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
