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
  const [appReady, setAppReady] = useState(false)

  // Initialize app with robust error handling
  useEffect(() => {
    try {
      // Clear corrupted localStorage on startup
      if (typeof window !== 'undefined') {
        const keys = ['jobFairCandidates', 'talentEvents', 'currentEvent']
        for (const key of keys) {
          try {
            const data = localStorage.getItem(key)
            if (data) JSON.parse(data)
          } catch (e) {
            localStorage.removeItem(key)
            console.log(`Cleared corrupted ${key}`)
          }
        }
      }

      // Load clean data
      const saved = localStorage.getItem('jobFairCandidates')
      const savedEvents = localStorage.getItem('talentEvents')
      const savedCurrentEvent = localStorage.getItem('currentEvent')

      if (saved) {
        try {
          setCandidates(JSON.parse(saved))
        } catch (e) {
          console.error('Error parsing candidates')
        }
      }

      if (savedEvents) {
        try {
          setEvents(JSON.parse(savedEvents))
        } catch (e) {
          console.error('Error parsing events')
        }
      }

      if (savedCurrentEvent) {
        try {
          setCurrentEvent(JSON.parse(savedCurrentEvent))
        } catch (e) {
          console.error('Error parsing current event')
        }
      }

      setAppReady(true)
    } catch (error) {
      console.error('App initialization error:', error)
      setAppReady(true)
    }
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

  if (!appReady) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Together Talent Search Program...</p>
        </div>
      </div>
    )
  }

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
  }

  const deleteCandidate = (id) => {
    setCandidates(candidates.filter(c => c.id !== id))
  }

  const updateCandidate = (id, updates) => {
    setCandidates(candidates.map(c => c.id === id ? { ...c, ...updates } : c))
  }

  const addEvent = (event) => {
    const newEvent = {
      ...event,
      id: Date.now()
    }
    setEvents([...events, newEvent])
    setCurrentEvent(newEvent)
    setShowEventForm(false)
  }

  const switchEvent = (eventId) => {
    const event = events.find(e => e.id === eventId)
    if (event) setCurrentEvent(event)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-200">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-white shadow-lg border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold text-gray-900">Together Talent Search Program</h1>
          <button
            onClick={() => setShowSettings(!showSettings)}
            className="p-2 hover:bg-gray-100 rounded-lg transition"
          >
            <Settings className="w-6 h-6" />
          </button>
        </div>

        {/* View Tabs */}
        <div className="border-t border-gray-200 bg-white">
          <div className="max-w-7xl mx-auto px-4 flex gap-2 overflow-x-auto">
            {[
              { id: 'dashboard', icon: BarChart3, label: 'Dashboard' },
              { id: 'entry', icon: PlayCircle, label: 'Entry' },
              { id: 'candidates', icon: Briefcase, label: 'Candidates' },
              { id: 'projector', icon: Calculator, label: 'Income Calculator' },
              { id: 'export', icon: Download, label: 'Export' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setCurrentView(tab.id)}
                className={`flex items-center gap-2 px-4 py-3 font-medium transition ${
                  currentView === tab.id
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-blue-600'
                }`}
              >
                <tab.icon className="w-4 h-4" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        {/* Event Selector and Settings */}
        <div className="mb-6 flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-2">Current Event</label>
            <select
              value={currentEvent?.id || ''}
              onChange={(e) => switchEvent(Number(e.target.value))}
              className="w-full input-field"
            >
              <option value="">Select an event</option>
              {events.map(event => (
                <option key={event.id} value={event.id}>
                  {event.name} ({event.date})
                </option>
              ))}
            </select>
          </div>
          <button
            onClick={() => setShowEventForm(!showEventForm)}
            className="btn-primary self-end"
          >
            + New Event
          </button>
        </div>

        {/* Add Event Form */}
        {showEventForm && (
          <div className="card mb-6 border-2 border-blue-400">
            <h3 className="text-lg font-bold mb-4">Create New Event</h3>
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
              className="space-y-4"
            >
              <input
                type="date"
                name="date"
                required
                className="w-full input-field"
              />
              <input
                type="text"
                name="name"
                placeholder="Programme Name"
                required
                className="w-full input-field"
              />
              <input
                type="text"
                name="venue"
                placeholder="Venue"
                required
                className="w-full input-field"
              />
              <button type="submit" className="btn-primary w-full">
                Create Event
              </button>
            </form>
          </div>
        )}

        {/* View Content */}
        {currentView === 'dashboard' && <Dashboard candidates={candidates} />}
        {currentView === 'entry' && currentEvent && (
          <StationFlow candidate={{}} onComplete={addCandidate} />
        )}
        {currentView === 'candidates' && (
          <CandidateList
            candidates={candidates}
            onDelete={deleteCandidate}
            onUpdate={updateCandidate}
          />
        )}
        {currentView === 'projector' && <IncomeProjector />}
        {currentView === 'export' && <ExportData candidates={candidates} events={events} />}
      </div>
    </div>
  )
}
