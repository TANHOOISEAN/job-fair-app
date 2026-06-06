import React, { useState, useEffect } from 'react'
import { BarChart3, Settings, Download, Trash2, PlayCircle, Briefcase, Calculator } from 'lucide-react'
import Dashboard from './components/Dashboard'
import StationFlow from './components/StationFlow'
import CandidateList from './components/CandidateList'
import ExportData from './components/ExportData'
import CareerPresentation from './components/CareerPresentation'
import IncomeProjector from './components/IncomeProjector'

export default function App() {
  const [candidates, setCandidates] = useState([])
  const [currentView, setCurrentView] = useState('dashboard')
  const [eventDate, setEventDate] = useState('')
  const [showSettings, setShowSettings] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jobFairCandidates')
    const savedDate = localStorage.getItem('eventDate')
    if (saved) setCandidates(JSON.parse(saved))
    if (savedDate) setEventDate(savedDate)
  }, [])

  // Save to localStorage whenever candidates change
  useEffect(() => {
    localStorage.setItem('jobFairCandidates', JSON.stringify(candidates))
  }, [candidates])

  useEffect(() => {
    if (eventDate) {
      localStorage.setItem('eventDate', eventDate)
    }
  }, [eventDate])

  const addCandidate = (candidate) => {
    setCandidates([...candidates, { ...candidate, id: Date.now(), createdAt: new Date().toLocaleString() }])
    setCurrentView('dashboard')
  }

  const deleteCandidate = (id) => {
    if (confirm('Remove this candidate?')) {
      setCandidates(candidates.filter(c => c.id !== id))
    }
  }

  const clearAll = () => {
    if (confirm('This will DELETE all candidate data. Are you sure?')) {
      setCandidates([])
      localStorage.removeItem('jobFairCandidates')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-10 shadow">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <img src="/together-logo.png" alt="Together Logo" className="h-12 w-auto" />
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Job Fair Conversion System</h1>
                <p className="text-sm text-gray-500">Real-time candidate tracking & conversion management</p>
              </div>
            </div>
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 hover:bg-gray-100 rounded-lg transition"
              title="Settings"
            >
              <Settings className="w-6 h-6 text-gray-600" />
            </button>
          </div>

          {/* Event Date Settings */}
          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div className="flex items-center gap-3">
                <label className="text-sm font-medium text-gray-700">Event Date:</label>
                <input
                  type="date"
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm"
                />
                {eventDate && <span className="text-sm text-gray-600">Set for {new Date(eventDate).toLocaleDateString()}</span>}
                <button
                  onClick={clearAll}
                  className="ml-auto px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition flex items-center gap-2"
                >
                  <Trash2 className="w-4 h-4" />
                  Clear All Data
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Navigation Tabs */}
        <div className="flex gap-2 mb-6 border-b border-gray-300 flex-wrap">
          <button
            onClick={() => setCurrentView('dashboard')}
            className={`px-4 py-2 font-medium transition ${
              currentView === 'dashboard'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <BarChart3 className="w-4 h-4 inline mr-2" />
            Dashboard
          </button>
          <button
            onClick={() => setCurrentView('stations')}
            className={`px-4 py-2 font-medium transition ${
              currentView === 'stations'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <PlayCircle className="w-4 h-4 inline mr-2" />
            Start New Candidate
          </button>
          <button
            onClick={() => setCurrentView('projector')}
            className={`px-4 py-2 font-medium transition ${
              currentView === 'projector'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Calculator className="w-4 h-4 inline mr-2" />
            Income Calculator
          </button>
          <button
            onClick={() => setCurrentView('career')}
            className={`px-4 py-2 font-medium transition ${
              currentView === 'career'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Briefcase className="w-4 h-4 inline mr-2" />
            Career Structure
          </button>
          <button
            onClick={() => setCurrentView('list')}
            className={`px-4 py-2 font-medium transition ${
              currentView === 'list'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            📋 All Candidates ({candidates.length})
          </button>
          <button
            onClick={() => setCurrentView('export')}
            className={`px-4 py-2 font-medium transition ${
              currentView === 'export'
                ? 'text-blue-600 border-b-2 border-blue-600'
                : 'text-gray-600 hover:text-gray-900'
            }`}
          >
            <Download className="w-4 h-4 inline mr-2" />
            Export
          </button>
        </div>

        {/* Content */}
        {currentView === 'dashboard' && <Dashboard candidates={candidates} eventDate={eventDate} />}
        {currentView === 'projector' && <IncomeProjector />}
        {currentView === 'career' && <CareerPresentation />}
        {currentView === 'stations' && <StationFlow onComplete={addCandidate} />}
        {currentView === 'list' && (
          <CandidateList
            candidates={candidates}
            onDelete={deleteCandidate}
          />
        )}
        {currentView === 'export' && <ExportData candidates={candidates} />}
      </div>
    </div>
  )
}
