import React, { useState } from 'react'
import { Trash2, Filter } from 'lucide-react'

export default function CandidateList({ candidates, onDelete }) {
  const [filterPath, setFilterPath] = useState('ALL')
  const [sortBy, setSortBy] = useState('recent')

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
                </div>

                {/* Delete Button */}
                <button
                  onClick={() => onDelete(candidate.id)}
                  className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition flex-shrink-0"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
