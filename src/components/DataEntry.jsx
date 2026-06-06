import React, { useState, useEffect } from 'react'
import { Save, RotateCcw } from 'lucide-react'

export default function DataEntry({ onAdd, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    disc: '',
    incomeExpectation: '',
    path: 'WARM',
    interviewBooked: false,
    interviewDate: '',
    whatsappSent: false,
    eventConfirmed: false,
    notes: ''
  })

  useEffect(() => {
    if (initialData) {
      setFormData(initialData)
    }
  }, [initialData])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.phone) {
      alert('Name and Phone are required!')
      return
    }
    onAdd(formData)
    setFormData({
      name: '',
      phone: '',
      email: '',
      disc: '',
      incomeExpectation: '',
      path: 'WARM',
      interviewBooked: false,
      interviewDate: '',
      whatsappSent: false,
      eventConfirmed: false,
      notes: ''
    })
  }

  const handleReset = () => {
    if (confirm('Clear form?')) {
      setFormData({
        name: '',
        phone: '',
        email: '',
        disc: '',
        incomeExpectation: '',
        path: 'WARM',
        interviewBooked: false,
        interviewDate: '',
        whatsappSent: false,
        eventConfirmed: false,
        notes: ''
      })
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto">
      <div className="card">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          {initialData ? `Edit: ${initialData.name}` : 'Add New Candidate'}
        </h2>

        {/* Personal Details Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-sm mb-4">👤 Personal Details</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Phone *</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="WhatsApp number"
                className="input-field"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="email@example.com"
                className="input-field"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Income Expectation</label>
              <select
                name="incomeExpectation"
                value={formData.incomeExpectation}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="Below 15K">Below ₹15K/month</option>
                <option value="15-25K">₹15–25K/month</option>
                <option value="25-40K">₹25–40K/month</option>
                <option value="40K+">₹40K+/month</option>
                <option value="Flexible">Flexible/Open</option>
              </select>
            </div>
          </div>
        </div>

        {/* Assessment Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-sm mb-4">🧠 Assessment</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">DISC Type</label>
              <select
                name="disc"
                value={formData.disc}
                onChange={handleChange}
                className="input-field"
              >
                <option value="">Select...</option>
                <option value="D">D - Dominant/Driver (results-focused)</option>
                <option value="I">I - Influence (social, persuasive)</option>
                <option value="S">S - Steadiness (loyal, supportive)</option>
                <option value="C">C - Conscious (analytical, detail-focused)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Conversion Path *</label>
              <select
                name="path"
                value={formData.path}
                onChange={handleChange}
                className="input-field font-medium"
                required
              >
                <option value="HOT">🔴 HOT - Interview Now</option>
                <option value="WARM">🟡 WARM - WhatsApp + Event</option>
                <option value="COLD">⚪ COLD - Referral</option>
              </select>
            </div>
          </div>
        </div>

        {/* Follow-up Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <h3 className="font-bold text-gray-900 text-sm mb-4">📞 Follow-up Status</h3>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="interviewBooked"
                id="interviewBooked"
                checked={formData.interviewBooked}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <label htmlFor="interviewBooked" className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                Interview Booked
              </label>
            </div>

            {formData.interviewBooked && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Interview Date & Time</label>
                <input
                  type="datetime-local"
                  name="interviewDate"
                  value={formData.interviewDate}
                  onChange={handleChange}
                  className="input-field"
                />
              </div>
            )}

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="whatsappSent"
                id="whatsappSent"
                checked={formData.whatsappSent}
                onChange={handleChange}
                className="w-4 h-4 text-green-600 rounded focus:ring-2 focus:ring-green-500"
              />
              <label htmlFor="whatsappSent" className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                WhatsApp Message Sent
              </label>
            </div>

            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
              <input
                type="checkbox"
                name="eventConfirmed"
                id="eventConfirmed"
                checked={formData.eventConfirmed}
                onChange={handleChange}
                className="w-4 h-4 text-purple-600 rounded focus:ring-2 focus:ring-purple-500"
              />
              <label htmlFor="eventConfirmed" className="text-sm font-medium text-gray-700 cursor-pointer flex-1">
                Event Attendance Confirmed
              </label>
            </div>
          </div>
        </div>

        {/* Notes Section */}
        <div className="mb-6 pb-6 border-b border-gray-200">
          <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
          <textarea
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="e.g., 'Strong personality, needs reassurance about commission', 'Knows 3 referrals'"
            className="input-field min-h-24 resize-none"
          />
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            type="submit"
            className="flex-1 btn-primary flex items-center justify-center gap-2"
          >
            <Save className="w-4 h-4" />
            {initialData ? 'Update Candidate' : 'Save Candidate'}
          </button>
          <button
            type="button"
            onClick={handleReset}
            className="btn-secondary flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            Clear
          </button>
        </div>
      </div>

      {/* Quick Tips */}
      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <p className="text-xs font-semibold text-blue-900 mb-2">💡 QUICK INPUT TIPS:</p>
        <ul className="text-xs text-blue-800 space-y-1">
          <li>• <strong>HOT:</strong> Interested (4–5), open to commission, lock interview immediately</li>
          <li>• <strong>WARM:</strong> Interested (3–4), hesitant, send WhatsApp + event invite</li>
          <li>• <strong>COLD:</strong> Low interest (1–2), prefer fixed salary, ask for referrals</li>
        </ul>
      </div>
    </form>
  )
}
