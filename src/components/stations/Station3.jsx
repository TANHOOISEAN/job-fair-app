import React from 'react'

export default function Station3({ formData, onChange }) {
  const getClosingScript = (path) => {
    const scripts = {
      HOT: {
        title: 'CAREER DISCOVERY SESSION (Consultative Close)',
        script: '"Based on your answers, I believe you have strong potential for this opportunity. I recommend attending a 30-minute Career Discovery Session where we\'ll show you: • Career path • Training system • Income structure • Real success stories. Which timing works better for you?"'
      },
      WARM: {
        title: 'WHATSAPP FOLLOW-UP (Value-First Approach)',
        script: '"You\'re still exploring opportunities, which is completely normal. I\'ll send you information about: • Career opportunities • Internship program • Success stories • Upcoming events. What\'s the best WhatsApp number for us to share the details?"'
      },
      COLD: {
        title: 'REFERRAL ASK (Help Others)',
        script: '"Thank you for visiting our booth. Before you go, do you know anyone who might be: • Looking for an internship • Exploring career opportunities • Interested in entrepreneurship? If yes, we\'d love an introduction."'
      }
    }
    return scripts[path]
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
        <p className="text-sm font-bold text-blue-900">⏱️ TARGET: 1–2 minutes</p>
        <p className="text-xs text-blue-800 mt-1">Decision point: Interview, WhatsApp invite, or referral ask</p>
      </div>

      {/* Path Selection */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-4">
          Based on Stations 1 & 2, which closing path?
        </label>

        <div className="space-y-3">
          {[
            {
              value: 'HOT',
              emoji: '🔴',
              title: 'HOT - Interview NOW',
              desc: 'Career interest 4–5, open to commission',
              color: 'border-red-300 bg-red-50'
            },
            {
              value: 'WARM',
              emoji: '🟡',
              title: 'WARM - WhatsApp + Event',
              desc: 'Career interest 3–4, hesitant or wants to think',
              color: 'border-amber-300 bg-amber-50'
            },
            {
              value: 'COLD',
              emoji: '⚪',
              title: 'COLD - Referral Ask',
              desc: 'Low interest (1–2), no urgency, prefer fixed salary',
              color: 'border-gray-300 bg-gray-50'
            }
          ].map(option => (
            <button
              key={option.value}
              onClick={() => onChange({ path: option.value })}
              className={`w-full p-4 rounded-lg border-2 text-left transition ${
                formData.path === option.value
                  ? `${option.color} border-2`
                  : `${option.color} border-2 opacity-60 hover:opacity-100`
              }`}
            >
              <div className="font-bold text-lg text-gray-900">
                {option.emoji} {option.title}
              </div>
              <div className="text-xs text-gray-700 mt-1">{option.desc}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Closing Script */}
      {formData.path && getClosingScript(formData.path) && (
        <div className="p-4 bg-purple-50 border border-purple-300 rounded-lg">
          <h4 className="font-bold text-purple-900 mb-2 text-sm">📢 {getClosingScript(formData.path).title}</h4>
          <div className="text-sm text-purple-900 bg-white p-3 rounded border border-purple-200 italic">
            {getClosingScript(formData.path).script}
          </div>
        </div>
      )}

      <hr className="border-gray-200" />

      {/* Path-Specific Follow-ups */}
      {formData.path === 'HOT' && (
        <div className="space-y-4">
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-bold text-red-900 mb-3">🔴 HOT: Career Discovery Session Booking</h4>

            <div className="space-y-3">
              {/* Timing Preference */}
              <div>
                <label className="block text-sm font-bold text-gray-900 mb-3">Which timing works better for you?</label>
                <div className="space-y-2">
                  {[
                    { value: 'weekday-evening', label: 'A. Weekday evening' },
                    { value: 'weekend', label: 'B. Weekend' },
                    { value: 'alternative', label: 'C. Need alternative timing' }
                  ].map(option => (
                    <label key={option.value} className="flex items-center p-3 border border-red-200 rounded-lg hover:bg-red-100 cursor-pointer transition">
                      <input
                        type="radio"
                        name="sessionTiming"
                        value={option.value}
                        checked={formData.sessionTiming === option.value}
                        onChange={(e) => onChange({ sessionTiming: e.target.value })}
                        className="w-4 h-4 text-red-600"
                      />
                      <span className="ml-3 text-sm font-medium text-gray-700">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Contact Number */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Contact Number (for session confirmation)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="input-field opacity-75"
                  placeholder="From personal details above"
                />
                <p className="text-xs text-gray-500 mt-1">✓ Already collected from personal details</p>
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email (for session details)</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => onChange({ email: e.target.value })}
                  placeholder="email@example.com"
                  className="input-field"
                />
              </div>

              {/* Session Confirmed */}
              <div>
                <label className="flex items-center gap-2 p-3 bg-white border border-red-200 rounded-lg cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.interviewBooked}
                    onChange={(e) => onChange({ interviewBooked: e.target.checked })}
                    className="w-4 h-4 text-red-600"
                  />
                  <span className="text-sm font-medium text-gray-700">Career Discovery Session Confirmed</span>
                </label>
              </div>
            </div>

            <div className="mt-3 p-3 bg-red-100 text-red-900 text-xs rounded italic">
              ✓ Show them what they'll learn (career path, training, income, success stories)
              ✓ Get their preferred timing (weekday/weekend/alternative)
              ✓ Confirm contact number and email
              ✓ Tag as HOT LEAD
              ✓ Send session details via email within 1 hour
            </div>
          </div>
        </div>
      )}

      {formData.path === 'WARM' && (
        <div className="space-y-4">
          <div className="p-4 bg-amber-50 border border-amber-200 rounded-lg">
            <h4 className="font-bold text-amber-900 mb-3">🟡 WARM: WhatsApp Follow-up (Value-First)</h4>

            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">WhatsApp Number (for sending career info)</label>
                <input
                  type="tel"
                  value={formData.phone}
                  disabled
                  className="input-field opacity-75"
                  placeholder="From personal details above"
                />
                <p className="text-xs text-gray-500 mt-1">✓ Already collected from personal details</p>
              </div>

              <label className="flex items-center gap-2 p-3 bg-white border border-amber-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.whatsappSent}
                  onChange={(e) => onChange({ whatsappSent: e.target.checked })}
                  className="w-4 h-4 text-amber-600"
                />
                <span className="text-sm font-medium text-gray-700">Career Info Sent (WhatsApp)</span>
              </label>
            </div>

            <div className="mt-3 p-3 bg-amber-100 text-amber-900 text-xs rounded italic">
              <strong>WHAT YOU'RE SENDING:</strong>
              <p className="mt-2">
                ✓ Career opportunities overview
                ✓ Internship program details
                ✓ Success stories (real testimonials)
                ✓ Upcoming Career Discovery Session dates
              </p>
            </div>

            <div className="mt-3 p-3 bg-amber-100 text-amber-900 text-xs rounded italic">
              <strong>WHATSAPP MESSAGE TEMPLATE:</strong>
              <p className="mt-2">
                "Hey [Name]! 👋 Great meeting you at the job fair. As promised, here's information about our career opportunities: [LINK]. Check out the success stories and upcoming events. If you have any questions, just reply! 💼"
              </p>
            </div>

            <div className="mt-3 p-3 bg-amber-100 text-amber-900 text-xs rounded italic">
              <strong>NEXT STEP GOAL:</strong>
              <p className="mt-2">
                Turn into HOT by inviting them to a Career Discovery Session after they engage with the resources.
              </p>
            </div>
          </div>
        </div>
      )}

      {formData.path === 'COLD' && (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <h4 className="font-bold text-gray-900 mb-3">⚪ COLD: Referral Ask (Help Others)</h4>

            <div className="space-y-3">
              <label className="flex items-center gap-2 p-3 bg-white border border-gray-200 rounded-lg cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.referralCollected}
                  onChange={(e) => onChange({ referralCollected: e.target.checked })}
                  className="w-4 h-4 text-gray-600"
                />
                <span className="text-sm font-medium text-gray-700">Referral(s) Collected</span>
              </label>

              {formData.referralCollected && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Referral Details (Names & Contact if available)</label>
                  <textarea
                    value={formData.referralDetails || ''}
                    onChange={(e) => onChange({ referralDetails: e.target.value })}
                    placeholder="e.g., John (+60123456789), Sarah (Facebook), etc."
                    className="input-field resize-none h-20"
                  />
                </div>
              )}
            </div>

            <div className="mt-3 p-3 bg-gray-100 text-gray-800 text-xs rounded italic">
              <strong>WHAT YOU'RE ASKING FOR:</strong>
              <p className="mt-2">
                ✓ Know anyone looking for an internship?
                ✓ Know anyone exploring career opportunities?
                ✓ Know anyone interested in entrepreneurship?
              </p>
            </div>

            <div className="mt-3 p-3 bg-gray-100 text-gray-800 text-xs rounded italic">
              <strong>REFERRAL MESSAGE TEMPLATE:</strong>
              <p className="mt-2">
                "Hey [Name]! Before you go—do you know anyone who might be interested in: • Internship opportunities • Career growth • Entrepreneurship? We'd love an introduction! 🤝"
              </p>
            </div>

            <div className="mt-3 p-3 bg-gray-100 text-gray-800 text-xs rounded italic">
              <strong>KEY POINT:</strong> Even if they're not interested, they might know someone perfect. Keep the door open and make it easy to refer.
            </div>
          </div>
        </div>
      )}

      <hr className="border-gray-200" />

      {/* Final Notes */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Final Notes (for follow-up)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="Update or add any final notes here..."
          className="input-field resize-none h-20"
        />
      </div>

      {/* Completion Summary */}
      <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
        <p className="text-sm font-bold text-green-900 mb-2">✅ READY TO SAVE?</p>
        <ul className="text-xs text-green-800 space-y-1">
          <li>✓ Name & Phone: {formData.name && formData.phone ? '✅' : '❌'}</li>
          <li>✓ Path selected: {formData.path ? '✅' : '❌'}</li>
          <li>✓ Follow-up action noted: {formData.path === 'HOT' ? (formData.interviewBooked ? '✅' : '⚠️') : formData.path === 'WARM' ? (formData.whatsappSent ? '✅' : '⚠️') : '✅'}</li>
        </ul>
      </div>
    </div>
  )
}
