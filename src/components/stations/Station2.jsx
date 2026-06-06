import React, { useState, useMemo } from 'react'
import { Briefcase } from 'lucide-react'
import CareerPresentation from '../CareerPresentation'

export default function Station2({ formData, onChange }) {
  const [showPitch, setShowPitch] = useState(false)
  const [discAnswers, setDiscAnswers] = useState({})
  const [expandedProfile, setExpandedProfile] = useState(null)
  const [showCareer, setShowCareer] = useState(false)

  // DISC Questions
  const discQuestions = [
    { q: 1, text: 'When choosing food with friends:' },
    { q: 2, text: 'When buying clothes, you:' },
    { q: 3, text: 'Your spending habit:' },
    { q: 4, text: 'Friends describe you as:' },
    { q: 5, text: 'Your strength:' },
    { q: 6, text: 'At work, you focus on:' },
    { q: 7, text: 'When opinions differ, you:' },
    { q: 8, text: 'Ideal environment:' },
    { q: 9, text: 'Communication style:' },
    { q: 10, text: 'In discussions, you are:' },
    { q: 11, text: 'Your work style:' },
    { q: 12, text: 'You enjoy:' },
    { q: 13, text: 'You:' },
    { q: 14, text: 'You are:' },
    { q: 15, text: 'You prefer:' },
    { q: 16, text: 'You want:' },
    { q: 17, text: 'You prefer:' },
    { q: 18, text: 'You:' },
    { q: 19, text: 'You:' },
    { q: 20, text: 'You:' }
  ]

  const discOptions = {
    1: { A: 'Lead and decide', B: 'Create fun atmosphere', C: 'Follow others', D: 'Compare options' },
    2: { A: 'Decide quickly yourself', B: 'Influenced by salesperson', C: 'Buy from familiar shops', D: 'Compare quality vs price' },
    3: { A: 'Buy and leave quickly', B: 'Enjoy browsing', C: 'Consistent spending', D: 'Focus on value' },
    4: { A: 'Independent', B: 'Passionate', C: 'Polite', D: 'Perfectionist' },
    5: { A: 'Brave and decisive', B: 'Expressive and social', C: 'Calm and stable', D: 'Careful and analytical' },
    6: { A: 'Results', B: 'People', C: 'Process', D: 'Quality' },
    7: { A: 'Persuade others', B: 'Seek support', C: 'Compromise', D: 'Analyse deeply' },
    8: { A: 'Leadership & authority', B: 'Friendly & social', C: 'Stable & steady', D: 'Structured & efficient' },
    9: { A: 'Direct', B: 'Expressive', C: 'Calm listener', D: 'Logical' },
    10: { A: 'Debater', B: 'Negotiator', C: 'Supporter', D: 'Analyzer' },
    11: { A: 'Fast results', B: 'People-oriented', C: 'Support role', D: 'Rule-based' },
    12: { A: 'Competition', B: 'Socializing', C: 'Small group stability', D: 'Analysis' },
    13: { A: 'Achievement-focused', B: 'Sensitive to opinions', C: 'Avoid risk', D: 'High standards' },
    14: { A: 'Problem solver', B: 'People lover', C: 'Quiet listener', D: 'Logical thinker' },
    15: { A: 'Competition', B: 'Interaction', C: 'Team harmony', D: 'Accuracy' },
    16: { A: 'Authority', B: 'Emotional expression', C: 'Stability', D: 'Details' },
    17: { A: 'Leading', B: 'Team atmosphere', C: 'Routine', D: 'Facts first' },
    18: { A: 'Speak directly', B: 'Help others', C: 'Prefer stability', D: 'Seek accuracy' },
    19: { A: 'Independent', B: 'Team player', C: 'Quiet worker', D: 'Structured' },
    20: { A: 'Dislike control', B: 'Inspire others', C: 'Prefer privacy', D: 'Observe before acting' }
  }

  // Calculate DISC scores
  const discScore = useMemo(() => {
    let d = 0, i = 0, s = 0, c = 0

    Object.entries(discAnswers).forEach(([q, answer]) => {
      if (answer === 'A') d++
      else if (answer === 'B') i++
      else if (answer === 'C') s++
      else if (answer === 'D') c++
    })

    const scores = [
      { type: 'D', score: d, label: '🎯 Dominance' },
      { type: 'I', score: i, label: '⭐ Influence' },
      { type: 'S', score: s, label: '🤝 Steadiness' },
      { type: 'C', score: c, label: '📊 Compliance' }
    ].sort((a, b) => b.score - a.score)

    return {
      d, i, s, c,
      primary: scores[0],
      secondary: scores[1],
      allScores: scores
    }
  }, [discAnswers])

  const handleDiscAnswer = (questionNum, answer) => {
    setDiscAnswers(prev => ({ ...prev, [questionNum]: answer }))
  }

  const isDiscComplete = Object.keys(discAnswers).length === 20

  // Comprehensive DISC Profile Data
  const discProfiles = {
    D: {
      name: 'DOMINANCE',
      emoji: '🎯',
      subtitle: 'The Driver',
      color: 'red',
      motivation: 'Achievement, control, challenges, winning',
      characteristics: [
        'Confident and decisive',
        'Competitive and ambitious',
        'Focused on goals and results',
        'Enjoys taking charge',
        'Makes decisions quickly',
        'Likes challenges and solving problems'
      ],
      strengths: [
        'Strong leadership ability',
        'Action-oriented',
        'Courageous under pressure',
        'High self-confidence',
        'Results-driven'
      ],
      challenges: [
        'Can be impatient',
        'May appear too direct or aggressive',
        'Sometimes overlooks details',
        'May struggle with slow-paced people'
      ],
      bestEnvironment: [
        'Fast-paced',
        'Performance-driven',
        'Opportunities for leadership',
        'Freedom to make decisions'
      ],
      careers: [
        'Entrepreneur',
        'Sales Manager',
        'Insurance Agency Leader',
        'Business Development',
        'Executive Management'
      ]
    },
    I: {
      name: 'INFLUENCE',
      emoji: '⭐',
      subtitle: 'The Influencer',
      color: 'yellow',
      motivation: 'Recognition, relationships, social interaction, enjoyment',
      characteristics: [
        'Outgoing and enthusiastic',
        'Friendly and optimistic',
        'Loves meeting people',
        'Strong communication skills',
        'Persuasive and expressive',
        'Enjoys teamwork'
      ],
      strengths: [
        'Builds relationships easily',
        'Inspires and motivates others',
        'Excellent networking skills',
        'Positive energy',
        'Strong people skills'
      ],
      challenges: [
        'May lack attention to detail',
        'Can be disorganized',
        'May become distracted easily',
        'Sometimes makes emotional decisions'
      ],
      bestEnvironment: [
        'Social and collaborative',
        'Recognition and appreciation',
        'Opportunities to interact with people',
        'Creative and energetic culture'
      ],
      careers: [
        'Recruiter',
        'Sales Consultant',
        'Marketing Executive',
        'Public Relations',
        'Trainer',
        'Speaker',
        'Influencer'
      ]
    },
    S: {
      name: 'STEADINESS',
      emoji: '🤝',
      subtitle: 'The Supporter',
      color: 'green',
      motivation: 'Stability, harmony, security, cooperation',
      characteristics: [
        'Patient and calm',
        'Reliable and dependable',
        'Loyal team player',
        'Good listener',
        'Supportive and caring',
        'Prefers consistency'
      ],
      strengths: [
        'Trustworthy',
        'Excellent team player',
        'Strong customer service skills',
        'Consistent performance',
        'Good at maintaining relationships'
      ],
      challenges: [
        'Resistant to sudden change',
        'Avoids conflict',
        'May struggle to make quick decisions',
        'Can be overly accommodating'
      ],
      bestEnvironment: [
        'Stable and predictable',
        'Supportive team culture',
        'Clear expectations',
        'Long-term relationships'
      ],
      careers: [
        'Customer Service',
        'Client Relationship Management',
        'Administration',
        'Human Resources',
        'Operations Support',
        'Healthcare'
      ]
    },
    C: {
      name: 'COMPLIANCE',
      emoji: '📊',
      subtitle: 'The Analyzer',
      color: 'blue',
      motivation: 'Accuracy, quality, logic, correctness',
      characteristics: [
        'Analytical and logical',
        'Detail-oriented',
        'Organized and systematic',
        'High standards',
        'Values facts and evidence',
        'Careful decision maker'
      ],
      strengths: [
        'Strong problem-solving ability',
        'Excellent attention to detail',
        'Produces high-quality work',
        'Organized and structured',
        'Objective decision-making'
      ],
      challenges: [
        'Can overthink decisions',
        'May be overly critical',
        'Struggles with uncertainty',
        'Sometimes slow to act'
      ],
      bestEnvironment: [
        'Clear systems and procedures',
        'Quality-focused culture',
        'Access to data and information',
        'Defined expectations'
      ],
      careers: [
        'Finance',
        'Accounting',
        'Compliance',
        'Data Analysis',
        'Engineering',
        'Research',
        'Audit'
      ]
    }
  }

  const combinations = {
    DI: 'Leader, Entrepreneur, Top Sales Performer',
    ID: 'Motivator, Recruiter, Public Speaker',
    DC: 'Strategic Leader, Business Builder',
    CD: 'Technical Leader, Analyst Manager',
    IS: 'Relationship Builder, Customer-Focused Professional',
    SI: 'Team Supporter, Service Specialist',
    SC: 'Reliable Specialist, Operations Professional',
    CS: 'Process Expert, Compliance Professional'
  }

  const getDISCTip = (type) => {
    const tips = {
      D: {
        title: '🎯 Dominance (Driver)',
        talk: 'Money, growth, competition, speed to promotion, autonomy, results',
        avoid: 'Micromanagement, slow growth, vague answers, politics',
        close: '"You\'ll be leading your own unit in 6 months. Want the numbers?"'
      },
      I: {
        title: '⭐ Influence (Influencer)',
        talk: 'Team culture, recognition, relationships, visibility, fun, people development',
        avoid: 'Isolation, boring work, lots of admin, no social aspect',
        close: '"Our top team just took a Bali trip bonus. You\'d vibe with them perfectly."'
      },
      S: {
        title: '🤝 Steadiness (Supporter)',
        talk: 'Security, team belonging, clarity, low stress, support, long-term stability',
        avoid: 'High pressure, constant change, cutthroat competition, unpredictability',
        close: '"We invest in you long-term. Ongoing training, mentorship & a manager who cares."'
      },
      C: {
        title: '📊 Compliance (Analyst)',
        talk: 'Process, metrics, data, proof, step-by-step structure, accuracy, fairness',
        avoid: 'Vague promises, shortcuts, rushing, lack of logic, unfair treatment',
        close: '"Here\'s the exact structure: X leads to Y, which leads to Z. All data-backed."'
      }
    }
    return tips[type]
  }

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 p-4 rounded-lg border border-blue-200 mb-4">
        <p className="text-sm font-bold text-blue-900">⏱️ TARGET: 2–3 minutes</p>
        <p className="text-xs text-blue-800 mt-1">20-Question DISC Assessment + Personalized Pitch</p>
      </div>

      {/* Show Career Presentation */}
      {!showCareer && (
        <button
          onClick={() => setShowCareer(true)}
          className="w-full p-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition flex items-center justify-center gap-2"
        >
          <Briefcase className="w-5 h-5" />
          📊 Show Career & Income Path (Optional)
        </button>
      )}

      {showCareer && (
        <div className="mb-4 border-2 border-green-300 rounded-lg">
          <button
            onClick={() => setShowCareer(false)}
            className="w-full p-2 bg-green-100 text-green-900 text-sm font-bold rounded-t-lg hover:bg-green-200 transition"
          >
            ✕ Hide Career Path
          </button>
          <div className="p-4 bg-green-50">
            <CareerPresentation />
          </div>
        </div>
      )}

      {/* DISC Assessment Instructions */}
      <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
        <p className="text-sm font-bold text-purple-900 mb-2">📋 DISC PERSONALITY TEST (20 Questions)</p>
        <p className="text-xs text-purple-800 italic">Choose ONE answer per question. No right or wrong answers—just honest choices.</p>
      </div>

      {/* DISC Questions Grid */}
      <div className="space-y-4">
        {discQuestions.map((q) => (
          <div key={q.q} className="p-4 border border-gray-300 rounded-lg bg-gray-50">
            <p className="text-sm font-bold text-gray-900 mb-3">
              Q{q.q}: {q.text}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {['A', 'B', 'C', 'D'].map((option) => (
                <button
                  key={option}
                  onClick={() => handleDiscAnswer(q.q, option)}
                  className={`p-2 rounded-lg border-2 text-xs font-medium transition ${
                    discAnswers[q.q] === option
                      ? 'border-blue-600 bg-blue-100 text-blue-900'
                      : 'border-gray-300 bg-white text-gray-700 hover:border-blue-300'
                  }`}
                >
                  <span className="font-bold mr-1">{option}.</span>
                  {discOptions[q.q][option]}
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-500 mt-2">
              {Object.keys(discAnswers).length}/20 answered
            </p>
          </div>
        ))}
      </div>

      {/* DISC Results */}
      {isDiscComplete && (
        <div className="space-y-4">
          {/* Primary & Secondary Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Primary */}
            <div className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-400 rounded-lg">
              <p className="text-xs font-bold text-blue-900 mb-2">🥇 PRIMARY PROFILE</p>
              <p className="text-2xl font-bold text-blue-700 mb-1">{discScore.primary.label}</p>
              <p className="text-sm text-blue-900 font-semibold">{discScore.primary.score} points</p>
            </div>

            {/* Secondary */}
            <div className="p-4 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-400 rounded-lg">
              <p className="text-xs font-bold text-amber-900 mb-2">🥈 SECONDARY PROFILE</p>
              <p className="text-2xl font-bold text-amber-700 mb-1">{discScore.secondary.label}</p>
              <p className="text-sm text-amber-900 font-semibold">{discScore.secondary.score} points</p>
            </div>
          </div>

          {/* All Scores Bar Chart */}
          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
            <p className="text-xs font-bold text-gray-700 mb-3">All DISC Scores:</p>
            <div className="space-y-2">
              {discScore.allScores.map((score) => (
                <div key={score.type}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">{score.label}</span>
                    <span className="text-xs font-bold text-gray-900">{score.score}/20</span>
                  </div>
                  <div className="w-full bg-gray-300 rounded-full h-2">
                    <div
                      className={`h-2 rounded-full transition-all ${
                        score.type === 'D' ? 'bg-red-500' :
                        score.type === 'I' ? 'bg-yellow-500' :
                        score.type === 'S' ? 'bg-green-500' :
                        'bg-blue-500'
                      }`}
                      style={{ width: `${(score.score / 20) * 100}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Primary DISC Tips */}
          <div className="p-4 bg-gradient-to-r from-indigo-50 to-purple-50 border-2 border-indigo-300 rounded-lg">
            <h4 className="font-bold text-indigo-900 mb-3">
              {getDISCTip(discScore.primary.type).title}
            </h4>
            <div className="text-sm text-indigo-900 space-y-2">
              <div>
                <strong>✓ Talk about:</strong> {getDISCTip(discScore.primary.type).talk}
              </div>
              <div>
                <strong>✗ Avoid:</strong> {getDISCTip(discScore.primary.type).avoid}
              </div>
              <div className="p-2 bg-white border border-indigo-300 rounded mt-2 italic font-semibold text-indigo-800">
                <strong>→ Close with:</strong> {getDISCTip(discScore.primary.type).close}
              </div>
            </div>
          </div>

          {/* Secondary DISC Tips */}
          <div className="p-4 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-300 rounded-lg">
            <h4 className="font-bold text-amber-900 mb-3">
              {getDISCTip(discScore.secondary.type).title} (Secondary)
            </h4>
            <div className="text-sm text-amber-900 space-y-2">
              <div>
                <strong>✓ Also values:</strong> {getDISCTip(discScore.secondary.type).talk}
              </div>
              <div>
                <strong>✗ Also dislikes:</strong> {getDISCTip(discScore.secondary.type).avoid}
              </div>
            </div>
          </div>

          {/* Auto-Set DISC */}
          {!formData.disc && (
            <div className="p-3 bg-green-50 border border-green-300 rounded-lg">
              <button
                onClick={() => onChange({ disc: `${discScore.primary.type}/${discScore.secondary.type}` })}
                className="w-full btn-primary bg-green-600 hover:bg-green-700"
              >
                ✓ Accept {discScore.primary.label} + {discScore.secondary.label}
              </button>
            </div>
          )}

          {/* Detailed Profile Information */}
          <div className="space-y-4">
            <p className="text-sm font-bold text-gray-900">📚 DETAILED PROFILE INFORMATION</p>

            {/* Primary Profile Details */}
            <div className="border-2 border-indigo-400 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedProfile(expandedProfile === discScore.primary.type ? null : discScore.primary.type)}
                className="w-full p-4 bg-indigo-100 hover:bg-indigo-200 transition flex items-center justify-between"
              >
                <span className="font-bold text-indigo-900">
                  {discScore.primary.emoji} {discScore.primary.label} (Primary)
                </span>
                <span className="text-xl">{expandedProfile === discScore.primary.type ? '▼' : '▶'}</span>
              </button>

              {expandedProfile === discScore.primary.type && (
                <div className="p-4 space-y-4 bg-white">
                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-1">CORE MOTIVATION</p>
                    <p className="text-sm text-gray-800">{discProfiles[discScore.primary.type].motivation}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">CHARACTERISTICS</p>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {discProfiles[discScore.primary.type].characteristics.map((char, idx) => (
                        <li key={idx}>• {char}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-green-700 mb-2">✓ STRENGTHS</p>
                      <ul className="text-xs text-green-800 space-y-1">
                        {discProfiles[discScore.primary.type].strengths.map((strength, idx) => (
                          <li key={idx}>✓ {strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-red-700 mb-2">⚠️ CHALLENGES</p>
                      <ul className="text-xs text-red-800 space-y-1">
                        {discProfiles[discScore.primary.type].challenges.map((challenge, idx) => (
                          <li key={idx}>• {challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">BEST ENVIRONMENT</p>
                    <div className="flex flex-wrap gap-2">
                      {discProfiles[discScore.primary.type].bestEnvironment.map((env, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {env}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">SUITABLE CAREERS</p>
                    <div className="text-sm text-gray-800 space-y-1">
                      {discProfiles[discScore.primary.type].careers.map((career, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-green-600">→</span>
                          <span>{career}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Secondary Profile Details */}
            <div className="border-2 border-amber-400 rounded-lg overflow-hidden">
              <button
                onClick={() => setExpandedProfile(expandedProfile === discScore.secondary.type ? null : discScore.secondary.type)}
                className="w-full p-4 bg-amber-100 hover:bg-amber-200 transition flex items-center justify-between"
              >
                <span className="font-bold text-amber-900">
                  {discScore.secondary.emoji} {discScore.secondary.label} (Secondary)
                </span>
                <span className="text-xl">{expandedProfile === discScore.secondary.type ? '▼' : '▶'}</span>
              </button>

              {expandedProfile === discScore.secondary.type && (
                <div className="p-4 space-y-4 bg-white">
                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-1">CORE MOTIVATION</p>
                    <p className="text-sm text-gray-800">{discProfiles[discScore.secondary.type].motivation}</p>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">CHARACTERISTICS</p>
                    <ul className="text-sm text-gray-800 space-y-1">
                      {discProfiles[discScore.secondary.type].characteristics.map((char, idx) => (
                        <li key={idx}>• {char}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-xs font-bold text-green-700 mb-2">✓ STRENGTHS</p>
                      <ul className="text-xs text-green-800 space-y-1">
                        {discProfiles[discScore.secondary.type].strengths.map((strength, idx) => (
                          <li key={idx}>✓ {strength}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <p className="text-xs font-bold text-red-700 mb-2">⚠️ CHALLENGES</p>
                      <ul className="text-xs text-red-800 space-y-1">
                        {discProfiles[discScore.secondary.type].challenges.map((challenge, idx) => (
                          <li key={idx}>• {challenge}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">BEST ENVIRONMENT</p>
                    <div className="flex flex-wrap gap-2">
                      {discProfiles[discScore.secondary.type].bestEnvironment.map((env, idx) => (
                        <span key={idx} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {env}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <p className="text-xs font-bold text-gray-600 mb-2">SUITABLE CAREERS</p>
                    <div className="text-sm text-gray-800 space-y-1">
                      {discProfiles[discScore.secondary.type].careers.map((career, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <span className="text-green-600">→</span>
                          <span>{career}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Common Combination Info */}
            <div className="p-4 bg-purple-50 border border-purple-300 rounded-lg">
              <p className="text-xs font-bold text-purple-900 mb-2">🔗 PROFILE COMBINATION</p>
              <p className="text-sm text-purple-900 font-semibold">
                {discScore.primary.type}{discScore.secondary.type}: {combinations[`${discScore.primary.type}${discScore.secondary.type}`] || 'Unique blend'}
              </p>
              <p className="text-xs text-purple-700 mt-2 italic">
                This combination brings together the strengths of both profiles for a unique skill set.
              </p>
            </div>
          </div>
        </div>
      )}

      <hr className="border-gray-200" />

      {/* Industry Pitch Toggle */}
      <div>
        <button
          onClick={() => setShowPitch(!showPitch)}
          className="w-full btn-secondary text-left flex items-center justify-between"
        >
          <span>📢 Show Industry Pitch Script</span>
          <span className="text-lg">{showPitch ? '▼' : '▶'}</span>
        </button>

        {showPitch && (
          <div className="mt-4 space-y-4">
            {/* 30 Second Pitch */}
            <div className="p-4 bg-blue-50 border border-blue-300 rounded-lg">
              <p className="text-xs font-bold text-blue-900 mb-2">⚡ 30-SECOND VERSION (Quick)</p>
              <div className="text-sm text-blue-900 leading-relaxed italic">
                <p>
                  "Here's the reality: financial services is one of the few industries where you can genuinely control your income. You're not waiting for a boss to give you a raise—you build relationships, you get recurring commission. Fresh grads go from ₹10K to ₹50K+ in 2–3 years if they're sharp. And we have the system, training, and team to back you up. It's real entrepreneurship without the risk."
                </p>
              </div>
            </div>

            {/* 90 Second Pitch */}
            <div className="p-4 bg-green-50 border border-green-300 rounded-lg">
              <p className="text-xs font-bold text-green-900 mb-2">📝 90-SECOND VERSION (Full Pitch)</p>
              <div className="text-sm text-green-900 leading-relaxed italic space-y-3">
                <p>
                  "So here's the thing about insurance and financial services—most people think of it as commission sales, which sounds sketchy, right? But the reality is completely different."
                </p>
                <p>
                  "Every person needs insurance. Every family needs financial planning. It's not a want—it's a need. And when you help someone with that, they actually value you. We have people who build deep relationships, recurring income, and referral networks that generate passive income forever."
                </p>
                <p>
                  "What makes this different: We're not pushing random products. We're teaching you how to actually help families plan. That means stable, recurring commission. A fresh grad starting at ₹10–12K base can hit ₹30–50K within a year if they're disciplined. Working adults with experience jump to ₹60K+."
                </p>
                <p>
                  "The hard part isn't the income—it's the mindset. You have to actually care about helping people and be willing to have real conversations. But if you do that, the business builds itself. We provide training, leads, tools, and a team that supports you. The rest is on you."
                </p>
                <p>
                  "<strong>That make sense? Do you think you could see yourself doing this?</strong>"
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <hr className="border-gray-200" />

      {/* Notes */}
      <div>
        <label className="block text-sm font-bold text-gray-900 mb-2">
          Quick Notes (for closing station)
        </label>
        <textarea
          value={formData.notes}
          onChange={(e) => onChange({ notes: e.target.value })}
          placeholder="e.g., 'Strong D type - motivated by results', 'I/S mix - people-focused and loyal', 'Concerns about stability'"
          className="input-field resize-none h-20"
        />
      </div>
    </div>
  )
}
