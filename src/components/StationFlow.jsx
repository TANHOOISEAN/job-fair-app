import React, { useState } from 'react'
import { ChevronRight, ChevronLeft, CheckCircle2, Save, RotateCcw } from 'lucide-react'
import Station1 from './stations/Station1'
import Station2 from './stations/Station2'
import Station3 from './stations/Station3'
import DISCReport from './DISCReport'

export default function StationFlow({ onComplete }) {
  const [currentStation, setCurrentStation] = useState(1)
  const [showReport, setShowReport] = useState(false)
  const [formData, setFormData] = useState({
    // Recruiter Info
    recruiterName: '',

    // Personal Details
    name: '',
    nric: '',
    phone: '',
    hometown: '',

    // Station 1 Power Questions
    q1_situation: '',
    q2_income: '',
    q3_environment: '',
    q4_social: '',
    q5_speed: '',

    // Station 2
    disc: '',
    notes: '',

    // Station 3
    path: 'WARM',
    sessionTiming: '',
    interviewBooked: false,
    interviewDate: '',
    whatsappSent: false,
    eventConfirmed: false,
    referralCollected: false,
    referralDetails: '',
    email: ''
  })

  const handleDataChange = (newData) => {
    setFormData(prev => ({ ...prev, ...newData }))
  }

  const handleNext = () => {
    if (currentStation === 2) {
      setShowReport(true)
    } else if (currentStation < 3) {
      setCurrentStation(currentStation + 1)
    }
  }

  const handlePrev = () => {
    if (currentStation > 1) {
      setCurrentStation(currentStation - 1)
    }
  }

  const handleSubmit = () => {
    // Validate required fields
    if (!formData.name || !formData.phone || !formData.nric) {
      alert('Name, NRIC, and Phone are required!')
      return
    }

    // Auto-score if not manually set
    if (!formData.path) {
      const careerScore = {
        '1-2': 1, '3': 3, '4-5': 5
      }[formData.careerInterest] || 3

      const score = (careerScore >= 4 && formData.openToSales === 'Yes' ? 'HOT' :
                     careerScore >= 3 ? 'WARM' : 'COLD')
      formData.path = score
    }

    onComplete(formData)
    handleReset()
  }

  const handleReset = () => {
    setFormData({
      recruiterName: formData.recruiterName, // Keep recruiter name
      name: '',
      nric: '',
      phone: '',
      hometown: '',
      q1_situation: '',
      q2_income: '',
      q3_environment: '',
      q4_social: '',
      q5_speed: '',
      disc: '',
      notes: '',
      path: 'WARM',
      sessionTiming: '',
      interviewBooked: false,
      interviewDate: '',
      whatsappSent: false,
      eventConfirmed: false,
      referralCollected: false,
      referralDetails: '',
      email: ''
    })
    setCurrentStation(1)
  }

  const getStationTitle = () => {
    switch (currentStation) {
      case 1: return '🏪 STATION 1: Fast Survey (60 sec)'
      case 2: return '🧠 STATION 2: Personality & Pitch (2-3 min)'
      case 3: return '✅ STATION 3: Closing & Booking (1-2 min)'
      default: return ''
    }
  }

  const isStation1Valid = formData.name && formData.nric && formData.phone && formData.q1_situation && formData.q2_income && formData.q3_environment && formData.q4_social && formData.q5_speed
  const isStation2Valid = true // Optional DISC assessment
  const isStation3Valid = true // Optional follow-ups

  const getStepProgress = () => {
    if (currentStation === 1) return 33
    if (currentStation === 2) return 66
    return 100
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex gap-2 mb-4">
          <div className={`flex-1 h-3 rounded-full transition-all ${currentStation >= 1 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 h-3 rounded-full transition-all ${currentStation >= 2 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
          <div className={`flex-1 h-3 rounded-full transition-all ${currentStation >= 3 ? 'bg-blue-600' : 'bg-gray-200'}`}></div>
        </div>
        <p className="text-xs text-gray-500 text-center">
          Step {currentStation} of 3 ({getStepProgress()}% complete)
        </p>
      </div>

      {/* Station Title */}
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{getStationTitle()}</h2>

      {/* Station Content or Report */}
      {!showReport ? (
        <div className="card mb-6">
          {currentStation === 1 && (
            <Station1 formData={formData} onChange={handleDataChange} />
          )}
          {currentStation === 2 && (
            <Station2 formData={formData} onChange={handleDataChange} />
          )}
          {currentStation === 3 && (
            <Station3 formData={formData} onChange={handleDataChange} />
          )}
        </div>
      ) : (
        <div className="mb-6">
          <DISCReport
            answers={{
              situation: formData.q1_situation,
              pressure: formData.q2_income,
              environment: formData.q3_environment,
              social: formData.q4_social,
              speed: formData.q5_speed
            }}
            onComplete={() => {
              setCurrentStation(3)
              setShowReport(false)
            }}
          />
        </div>
      )}

      {/* Navigation Buttons */}
      <div className="flex gap-3 justify-between">
        <button
          onClick={handlePrev}
          disabled={currentStation === 1}
          className="flex items-center gap-2 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ChevronLeft className="w-4 h-4" />
          Back
        </button>

        <div className="flex gap-2">
          {currentStation < 3 && (
            <button
              onClick={handleNext}
              disabled={currentStation === 1 && !isStation1Valid}
              className="flex items-center gap-2 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next Station
              <ChevronRight className="w-4 h-4" />
            </button>
          )}

          {currentStation === 3 && (
            <button
              onClick={handleSubmit}
              className="flex items-center gap-2 btn-primary bg-green-600 hover:bg-green-700"
            >
              <CheckCircle2 className="w-4 h-4" />
              Save & Done
            </button>
          )}

          <button
            onClick={handleReset}
            className="flex items-center gap-2 btn-secondary"
            title="Start over"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Validation Message */}
      {currentStation === 1 && !isStation1Valid && (
        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
          <p className="text-sm text-amber-800">
            ⚠️ Fill all fields to continue: Name, Phone, Status, Career Interest, Sales Openness
          </p>
        </div>
      )}

      {/* Quick Tips */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs font-bold text-blue-900 mb-2">💡 STATION {currentStation} TIPS:</p>
        {currentStation === 1 && (
          <ul className="text-xs text-blue-800 space-y-1">
            <li>✓ Keep it under 60 seconds</li>
            <li>✓ Ask questions quickly, listen for key info</li>
            <li>✓ Write down name & phone clearly</li>
            <li>✓ Select the closest income range</li>
          </ul>
        )}
        {currentStation === 2 && (
          <ul className="text-xs text-blue-800 space-y-1">
            <li>✓ Read 4 DISC questions, note their type (D/I/S/C)</li>
            <li>✓ Deliver 30-90 sec pitch matched to their DISC</li>
            <li>✓ Gauge if they're genuinely interested</li>
            <li>✓ Add notes for your closing station</li>
          </ul>
        )}
        {currentStation === 3 && (
          <ul className="text-xs text-blue-800 space-y-1">
            <li>✓ HOT: Book interview immediately</li>
            <li>✓ WARM: Send WhatsApp + event invite</li>
            <li>✓ COLD: Ask for referrals</li>
            <li>✓ Get email if booking interview</li>
          </ul>
        )}
      </div>

      {/* Candidate Summary */}
      {formData.name && (
        <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm font-bold text-green-900 mb-2">📝 Candidate Summary</p>
          <div className="text-sm text-green-800 space-y-1">
            {formData.recruiterName && <p>👔 Recruiter: <strong>{formData.recruiterName}</strong></p>}
            <p>👤 <strong>{formData.name}</strong> | NRIC: {formData.nric}</p>
            <p>📱 {formData.phone} {formData.hometown && `| 📍 ${formData.hometown}`}</p>
            {formData.disc && <p>DISC: <strong>{formData.disc}</strong></p>}
            {formData.path && <p>Path: <strong>{formData.path === 'HOT' ? '🔴 HOT' : formData.path === 'WARM' ? '🟡 WARM' : '⚪ COLD'}</strong></p>}
          </div>
        </div>
      )}
    </div>
  )
}
