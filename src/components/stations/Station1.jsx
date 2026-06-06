import React from 'react'

export default function Station1({ formData, onChange }) {
  // Enhanced scoring logic based on power questions
  const calculateScore = () => {
    let hotScore = 0

    // Q1: Current situation (C = serious)
    if (formData.q1_situation === 'C') hotScore += 2
    else if (formData.q1_situation === 'B') hotScore += 1

    // Q2: Income pressure (C = under pressure)
    if (formData.q2_income === 'C') hotScore += 2
    else if (formData.q2_income === 'B') hotScore += 1

    // Q3: Effort readiness (B = performance-based)
    if (formData.q3_environment === 'B') hotScore += 2
    else if (formData.q3_environment === 'C') hotScore += 1

    // Q4: Social comfort (A = natural at talking/connections)
    if (formData.q4_social === 'A') hotScore += 1
    else if (formData.q4_social === 'C') hotScore += 0.5

    // Q5: Decision speed (A = today/this week = fast)
    if (formData.q5_speed === 'A') hotScore += 2
    else if (formData.q5_speed === 'B') hotScore += 1

    if (hotScore >= 7) return { path: 'HOT', message: '🔴 HOT → Interview immediately' }
    if (hotScore >= 4) return { path: 'WARM', message: '🟡 WARM → WhatsApp + event invite' }
    return { path: 'COLD', message: '⚪ COLD → Referral ask' }
  }

  const scoring = formData.q1_situation && formData.q2_income && formData.q3_environment && formData.q4_social && formData.q5_speed
    ? calculateScore()
    : null

  // Auto-set path based on scoring
  React.useEffect(() => {
    if (scoring) {
      onChange({ path: scoring.path })
    }
  }, [scoring])

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
        <p className="text-sm font-bold text-blue-900">⏱️ TARGET: 60 seconds</p>
        <p className="text-xs text-blue-800 mt-1">⚡ 5 POWER QUESTIONS (Improved) — Forces honesty, measures urgency, predicts conversion</p>
      </div>

      {/* RECRUITER INFO SECTION */}
      <div className="p-4 bg-gradient-to-r from-slate-100 to-slate-50 border-2 border-slate-400 rounded-lg">
        <h3 className="text-sm font-bold text-slate-900 mb-3">👔 RECRUITER INFORMATION</h3>
        <input
          type="text"
          placeholder="Your name (e.g., Arun, Priya, Rajesh)"
          value={formData.recruiterName}
          onChange={(e) => onChange({ recruiterName: e.target.value })}
          className="input-field"
        />
        <p className="text-xs text-slate-600 mt-2 italic">💡 Your name will be recorded with this candidate for tracking & accountability</p>
      </div>

      {/* PERSONAL DETAILS SECTION */}
      <div className="p-4 bg-gradient-to-r from-indigo-50 to-blue-50 border-2 border-indigo-300 rounded-lg">
        <h3 className="text-sm font-bold text-indigo-900 mb-4">👤 PERSONAL DETAILS</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Name */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Full Name *</label>
            <input
              type="text"
              placeholder="e.g., Arun Kumar"
              value={formData.name}
              onChange={(e) => onChange({ name: e.target.value })}
              className="input-field"
              required
            />
          </div>

          {/* NRIC */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">NRIC / ID Number *</label>
            <input
              type="text"
              placeholder="e.g., 123456-07-1234"
              value={formData.nric || ''}
              onChange={(e) => onChange({ nric: e.target.value })}
              className="input-field"
              required
            />
          </div>

          {/* Contact Number */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Contact Number *</label>
            <input
              type="tel"
              placeholder="e.g., +60123456789"
              value={formData.phone}
              onChange={(e) => onChange({ phone: e.target.value })}
              className="input-field"
              required
            />
          </div>

          {/* Hometown */}
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-2">Hometown / Location</label>
            <input
              type="text"
              placeholder="e.g., Kuala Lumpur"
              value={formData.hometown || ''}
              onChange={(e) => onChange({ hometown: e.target.value })}
              className="input-field"
            />
          </div>
        </div>

        <p className="text-xs text-indigo-700 mt-3 italic">💡 These details help us follow up and understand your location for deployment</p>
      </div>

      <hr className="border-gray-200" />

      {/* Q1: CURRENT SITUATION (Strong Filter) */}
      <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          1️⃣ CURRENT SITUATION (Forces honesty)
        </label>
        <p className="text-xs text-gray-600 mb-3 italic">"Which situation best describes you right now?"</p>
        <div className="space-y-2">
          {[
            { value: 'A', label: 'A) Just graduated / still studying' },
            { value: 'B', label: 'B) Working but not satisfied' },
            { value: 'C', label: 'C) Actively looking for higher income opportunity 🔥' },
            { value: 'D', label: 'D) Just exploring' }
          ].map(option => (
            <label key={option.value} className={`flex items-center p-2 border rounded-lg hover:bg-yellow-100 cursor-pointer transition ${formData.q1_situation === option.value ? 'bg-yellow-100 border-yellow-400' : 'border-yellow-200'}`}>
              <input
                type="radio"
                name="q1_situation"
                value={option.value}
                checked={formData.q1_situation === option.value}
                onChange={(e) => onChange({ q1_situation: e.target.value })}
                className="w-4 h-4 text-yellow-600"
              />
              <span className="ml-3 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Q2: INCOME PRESSURE (Reality Check) */}
      <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          2️⃣ INCOME PRESSURE (Reality check)
        </label>
        <p className="text-xs text-gray-600 mb-3 italic">"If nothing changes in 6 months, your income will still be:"</p>
        <div className="space-y-2">
          {[
            { value: 'A', label: 'A) Same as now (okay with it)' },
            { value: 'B', label: 'B) Slight increase only' },
            { value: 'C', label: 'C) Not acceptable, I need change 🔥' },
            { value: 'D', label: 'D) Not sure / no income pressure' }
          ].map(option => (
            <label key={option.value} className={`flex items-center p-2 border rounded-lg hover:bg-green-100 cursor-pointer transition ${formData.q2_income === option.value ? 'bg-green-100 border-green-400' : 'border-green-200'}`}>
              <input
                type="radio"
                name="q2_income"
                value={option.value}
                checked={formData.q2_income === option.value}
                onChange={(e) => onChange({ q2_income: e.target.value })}
                className="w-4 h-4 text-green-600"
              />
              <span className="ml-3 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Q3: EFFORT READINESS (Mindset Filter) */}
      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          3️⃣ EFFORT READINESS (Mindset filter)
        </label>
        <p className="text-xs text-gray-600 mb-3 italic">"Which environment suits you better?"</p>
        <div className="space-y-2">
          {[
            { value: 'A', label: 'A) Fixed salary, stable routine' },
            { value: 'B', label: 'B) Performance-based (work more = earn more) 🔥' },
            { value: 'C', label: 'C) Still unsure, depends' },
            { value: 'D', label: 'D) I want high income but stable job' }
          ].map(option => (
            <label key={option.value} className={`flex items-center p-2 border rounded-lg hover:bg-blue-100 cursor-pointer transition ${formData.q3_environment === option.value ? 'bg-blue-100 border-blue-400' : 'border-blue-200'}`}>
              <input
                type="radio"
                name="q3_environment"
                value={option.value}
                checked={formData.q3_environment === option.value}
                onChange={(e) => onChange({ q3_environment: e.target.value })}
                className="w-4 h-4 text-blue-600"
              />
              <span className="ml-3 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Q4: SOCIAL COMFORT (Soft DISC Filter) */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          4️⃣ SOCIAL COMFORT (Soft DISC detection)
        </label>
        <p className="text-xs text-gray-600 mb-3 italic">"Which sounds more natural to you?"</p>
        <div className="space-y-2">
          {[
            { value: 'A', label: 'A) Talking to people and building connections 🔥' },
            { value: 'B', label: 'B) Working behind the scenes' },
            { value: 'C', label: 'C) A mix of both' },
            { value: 'D', label: 'D) Not sure yet' }
          ].map(option => (
            <label key={option.value} className={`flex items-center p-2 border rounded-lg hover:bg-purple-100 cursor-pointer transition ${formData.q4_social === option.value ? 'bg-purple-100 border-purple-400' : 'border-purple-200'}`}>
              <input
                type="radio"
                name="q4_social"
                value={option.value}
                checked={formData.q4_social === option.value}
                onChange={(e) => onChange({ q4_social: e.target.value })}
                className="w-4 h-4 text-purple-600"
              />
              <span className="ml-3 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-200" />

      {/* Q5: DECISION SPEED (Closing Predictor) */}
      <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
        <label className="block text-sm font-bold text-gray-900 mb-3">
          5️⃣ DECISION SPEED (Closing predictor)
        </label>
        <p className="text-xs text-gray-600 mb-3 italic">"If this opportunity fits you, how fast can you decide?"</p>
        <div className="space-y-2">
          {[
            { value: 'A', label: 'A) Today / within this week 🔥' },
            { value: 'B', label: 'B) 1–2 weeks' },
            { value: 'C', label: 'C) Need more time to think' },
            { value: 'D', label: 'D) Just collecting information' }
          ].map(option => (
            <label key={option.value} className={`flex items-center p-2 border rounded-lg hover:bg-red-100 cursor-pointer transition ${formData.q5_speed === option.value ? 'bg-red-100 border-red-400' : 'border-red-200'}`}>
              <input
                type="radio"
                name="q5_speed"
                value={option.value}
                checked={formData.q5_speed === option.value}
                onChange={(e) => onChange({ q5_speed: e.target.value })}
                className="w-4 h-4 text-red-600"
              />
              <span className="ml-3 text-sm text-gray-700">{option.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Auto Scoring */}
      {scoring && (
        <div className="p-4 bg-gradient-to-r from-green-50 to-blue-50 border-2 border-green-400 rounded-lg">
          <p className="text-sm font-bold text-gray-900 mb-2">🎯 INSTANT PATH SCORING:</p>
          <p className="text-lg font-bold text-gray-900">{scoring.message}</p>
          <p className="text-xs text-gray-600 mt-2">
            Score: {Math.round((calculateScore().path === 'HOT' ? 8 : calculateScore().path === 'WARM' ? 5 : 2))} points
          </p>
        </div>
      )}

      {/* Key Insights */}
      <div className="p-3 bg-gray-50 border border-gray-200 rounded-lg text-xs text-gray-700 space-y-1">
        <p><strong>💡 Why these questions work:</strong></p>
        <p>✓ Forces real answers (not wishes)</p>
        <p>✓ Measures emotional pressure</p>
        <p>✓ Filters mindset early (reduces bad fits)</p>
        <p>✓ Soft DISC detection (I types = talkers)</p>
        <p>✓ Predicts closing speed directly</p>
      </div>
    </div>
  )
}
