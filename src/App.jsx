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
  const [events, setEvents] = useState([])
  const [currentEvent, setCurrentEvent] = useState(null)
  const [showEventForm, setShowEventForm] = useState(false)
  const [showSettings, setShowSettings] = useState(false)

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('jobFairCandidates')
    const savedEvents = localStorage.getItem('talentEvents')
    const savedCurrentEvent = localStorage.getItem('currentEvent')
    if (saved) setCandidates(JSON.parse(saved))
    if (savedEvents) setEvents(JSON.parse(savedEvents))
    if (savedCurrentEvent) setCurrentEvent(JSON.parse(savedCurrentEvent))
  }, [])

  // Save to localStorage whenever candidates change
  useEffect(() => {
    localStorage.setItem('jobFairCandidates', JSON.stringify(candidates))
  }, [candidates])

  // Save events to localStorage
  useEffect(() => {
    localStorage.setItem('talentEvents', JSON.stringify(events))
  }, [events])

  // Save current event to localStorage
  useEffect(() => {
    if (currentEvent) {
      localStorage.setItem('currentEvent', JSON.stringify(currentEvent))
    }
  }, [currentEvent])

  const addCandidate = (candidate) => {
    setCandidates([...candidates, {
      ...candidate,
      id: Date.now(),
      createdAt: new Date().toLocaleString(),
      eventId: currentEvent?.id,
      eventDate: currentEvent?.date,
      eventName: currentEvent?.name,
      eventVenue: currentEvent?.venue
    }])
    setCurrentView('dashboard')
  }

  const addEvent = (eventData) => {
    const newEvent = {
      id: Date.now(),
      date: eventData.date,
      name: eventData.name,
      venue: eventData.venue
    }
    setEvents([...events, newEvent])
    setCurrentEvent(newEvent)
    setShowEventForm(false)
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
                <h1 className="text-2xl font-bold text-gray-900">Together Talent Search Program</h1>
                <p className="text-sm text-gray-500">Real-time candidate tracking & talent management</p>
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

          {/* Event Management */}
          {showSettings && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">📅 Current Event</p>
                  {currentEvent ? (
                    <div className="text-sm text-gray-700">
                      <p><strong>{currentEvent.name}</strong></p>
                      <p>📍 {currentEvent.venue}</p>
                      <p>🗓️ {new Date(currentEvent.date).toLocaleDateString()}</p>
                    </div>
                  ) : (
                    <p className="text-sm text-gray-500 italic">No event selected</p>
                  )}
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => setShowEventForm(!showEventForm)}
                    className="px-3 py-2 bg-blue-50 text-blue-600 text-sm rounded-lg hover:bg-blue-100 transition"
                  >
                    {showEventForm ? '✕ Cancel' : '+ New Event'}
                  </button>
                </div>
              </div>

              {/* Event Form */}
              {showEventForm && (
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    const formData = new FormData(e.target)
                    addEvent({
                      date: formData.get('date'),
                      name: formData.get('name'),
                      venue: formData.get('venue')
                    })
                  }}
                  className="space-y-3 p-3 bg-white rounded border border-blue-200"
                >
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Event Date</label>
                    <input type="date" name="date" className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Programme Name</label>
                    <input type="text" name="name" placeholder="e.g., Talent Search 2026" className="input-field" required />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-gray-700 mb-1">Venue</label>
                    <input type="text" name="venue" placeholder="e.g., Kuala Lumpur Convention Center" className="input-field" required />
                  </div>
                  <button type="submit" className="w-full btn-primary">Save Event</button>
                </form>
              )}

              {/* Event History */}
              {events.length > 0 && (
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">📋 Past Events</p>
                  <div className="space-y-2">
                    {events.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => setCurrentEvent(event)}
                        className={`w-full text-left px-3 py-2 rounded text-sm transition ${
                          currentEvent?.id === event.id
                            ? 'bg-blue-100 text-blue-900 font-bold'
                            : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300'
                        }`}
                      >
                        <strong>{event.name}</strong> • {event.venue} • {new Date(event.date).toLocaleDateString()}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <button
                onClick={clearAll}
                className="w-full px-3 py-2 bg-red-50 text-red-600 text-sm rounded-lg hover:bg-red-100 transition flex items-center justify-center gap-2"
              >
                <Trash2 className="w-4 h-4" />
                Clear All Data
              </button>
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
