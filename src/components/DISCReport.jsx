import React from 'react'
import { TrendingUp, Award, Heart, CheckCircle } from 'lucide-react'

export default function DISCReport({ answers, onComplete }) {
  // Calculate DISC scores based on answers
  const calculateDISC = () => {
    let D = 0, I = 0, S = 0, C = 0

    // Station 2 - CURRENT SITUATION scoring
    if (answers.situation === 'A') S += 3; I += 1  // Just graduated
    if (answers.situation === 'B') I += 2; S += 1  // Working but not satisfied
    if (answers.situation === 'C') I += 3; D += 1  // Looking for opportunity
    if (answers.situation === 'D') C += 2; S += 2  // Just exploring

    // Station 3 - INCOME PRESSURE scoring
    if (answers.pressure === 'A') S += 2; C += 1   // Same is okay
    if (answers.pressure === 'B') I += 2; S += 1   // Slight increase
    if (answers.pressure === 'C') D += 3; I += 2   // Need change
    if (answers.pressure === 'D') C += 2; D += 1   // Unsure

    // Station 4 - EFFORT READINESS scoring
    if (answers.effort === 'A') S += 2; C += 2     // Fixed salary
    if (answers.effort === 'B') I += 3; S += 1     // Performance-based
    if (answers.effort === 'C') C += 2; S += 1     // Unsure
    if (answers.effort === 'D') D += 1; I += 2     // High income but stable

    // Station 5 - SOCIAL COMFORT scoring
    if (answers.social === 'A') I += 3; D += 1     // People & connections
    if (answers.social === 'B') C += 2; S += 2     // Behind scenes
    if (answers.social === 'C') I += 1; S += 2     // Mix of both
    if (answers.social === 'D') C += 2; I += 1     // Not sure yet

    // Station 6 - DECISION SPEED scoring
    if (answers.speed === 'A') D += 3; I += 2      // Today/this week
    if (answers.speed === 'B') I += 2; S += 1      // 1-2 weeks
    if (answers.speed === 'C') S += 3; C += 1      // Need more time
    if (answers.speed === 'D') C += 2; S += 1      // Just collecting info

    return { D, I, S, C }
  }

  const scores = calculateDISC()
  const maxScore = Math.max(scores.D, scores.I, scores.S, scores.C)
  const secondMax = Math.max(
    ...[scores.D, scores.I, scores.S, scores.C]
      .sort((a, b) => b - a)
      .slice(1, 2)
  )

  const getPrimaryProfile = () => {
    const max = Math.max(scores.D, scores.I, scores.S, scores.C)
    if (scores.D === max) return 'D'
    if (scores.I === max) return 'I'
    if (scores.S === max) return 'S'
    return 'C'
  }

  const getSecondaryProfile = () => {
    const profiles = [
      { score: scores.D, type: 'D' },
      { score: scores.I, type: 'I' },
      { score: scores.S, type: 'S' },
      { score: scores.C, type: 'C' }
    ]
    const sorted = profiles.sort((a, b) => b.score - a.score)
    return sorted[1].type
  }

  const primary = getPrimaryProfile()
  const secondary = getSecondaryProfile()

  const profiles = {
    D: {
      name: 'Dominance',
      icon: '🔥',
      color: 'red',
      description: 'Direct, Results-Oriented, Competitive',
      talk: 'Goals, challenges, competition, results, efficiency',
      avoid: 'Passive people, slow processes, wasted time, lack of purpose',
      close: '"We need someone who can drive results. You lead the way."'
    },
    I: {
      name: 'Influence',
      icon: '⭐',
      color: 'yellow',
      description: 'Enthusiastic, People-Focused, Optimistic',
      talk: 'Team culture, recognition, relationships, visibility, fun',
      avoid: 'Isolation, boring tasks, lots of admin, no social aspect',
      close: '"You make things fun. We invest in your growth and visibility."'
    },
    S: {
      name: 'Steadiness',
      icon: '💎',
      color: 'blue',
      description: 'Supportive, Team Player, Stable',
      talk: 'Security, team belonging, clarity, low stress, support, stability',
      avoid: 'High pressure, constant change, cutthroat competition, unpredictability',
      close: '"We invest in you long-term. Ongoing training, mentorship & a manager who cares."'
    },
    C: {
      name: 'Compliance',
      icon: '📊',
      color: 'green',
      description: 'Analytical, Quality-Focused, Precise',
      talk: 'Quality, accuracy, systems, data, compliance, detailed planning',
      avoid: 'Vagueness, rushed decisions, emotional appeals, lack of data',
      close: '"We value excellence and have clear systems. Your attention to detail matters."'
    }
  }

  const primaryData = profiles[primary]
  const secondaryData = profiles[secondary]

  return (
    <div className="space-y-6 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 p-6 rounded-lg">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Your DISC Profile Analysis</h2>
        <p className="text-gray-600">Understanding Your Work Style & Communication Preference</p>
      </div>

      {/* Primary & Secondary Profiles */}
      <div className="grid grid-cols-2 gap-4">
        <div className={`p-4 border-2 border-${primaryData.color}-300 bg-${primaryData.color}-50 rounded-lg`}>
          <div className="text-sm font-bold text-gray-600 mb-2">🏆 PRIMARY PROFILE</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{primaryData.icon} {primaryData.name}</div>
          <div className="text-sm text-gray-700">{scores[primary]} points</div>
        </div>

        <div className={`p-4 border-2 border-${secondaryData.color}-300 bg-${secondaryData.color}-50 rounded-lg`}>
          <div className="text-sm font-bold text-gray-600 mb-2">🤝 SECONDARY PROFILE</div>
          <div className="text-2xl font-bold text-gray-900 mb-1">{secondaryData.icon} {secondaryData.name}</div>
          <div className="text-sm text-gray-700">{scores[secondary]} points</div>
        </div>
      </div>

      {/* DISC Scores Chart */}
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="text-sm font-bold text-gray-900 mb-4">📊 All DISC Scores:</div>
        <div className="space-y-3">
          {[
            { type: 'D', name: 'Dominance', icon: '🔥', color: 'bg-red-500' },
            { type: 'I', name: 'Influence', icon: '⭐', color: 'bg-yellow-500' },
            { type: 'S', name: 'Steadiness', icon: '💎', color: 'bg-blue-500' },
            { type: 'C', name: 'Compliance', icon: '📊', color: 'bg-green-500' }
          ].map(item => (
            <div key={item.type}>
              <div className="flex justify-between mb-1">
                <span className="text-sm font-bold text-gray-700">{item.icon} {item.name}</span>
                <span className="text-sm font-bold text-gray-900">{scores[item.type]}/20</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className={`${item.color} h-2 rounded-full`}
                  style={{ width: `${(scores[item.type] / 20) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Primary Profile Detail */}
      <div className={`p-4 border-2 border-${primaryData.color}-300 bg-${primaryData.color}-50 rounded-lg`}>
        <div className="text-lg font-bold text-gray-900 mb-3">{primaryData.icon} {primaryData.name} (Primary Personality)</div>

        <div className="space-y-3">
          <div>
            <div className="font-bold text-gray-800 mb-1">✓ Talk about:</div>
            <div className="text-gray-700">{primaryData.talk}</div>
          </div>

          <div>
            <div className="font-bold text-gray-800 mb-1">✗ Avoid:</div>
            <div className="text-gray-700">{primaryData.avoid}</div>
          </div>

          <div className="bg-white p-3 rounded border-l-4 border-current">
            <div className="font-bold text-gray-900 italic mb-1">➜ Close with:</div>
            <div className="text-gray-800 italic">{primaryData.close}</div>
          </div>
        </div>
      </div>

      {/* Secondary Profile Detail */}
      <div className={`p-4 border-2 border-${secondaryData.color}-300 bg-${secondaryData.color}-50 rounded-lg`}>
        <div className="text-lg font-bold text-gray-900 mb-3">{secondaryData.icon} {secondaryData.name} (Secondary Personality)</div>

        <div className="space-y-3">
          <div>
            <div className="font-bold text-gray-800 mb-1">✓ Also values:</div>
            <div className="text-gray-700">{secondaryData.talk}</div>
          </div>

          <div className="bg-white p-3 rounded border-l-4 border-current">
            <div className="font-bold text-gray-900 italic mb-1">➜ Also appeal with:</div>
            <div className="text-gray-800 italic">{secondaryData.close}</div>
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3">
        <button
          onClick={onComplete}
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition"
        >
          ✓ Save & Complete
        </button>
        <button
          onClick={onComplete}
          className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 rounded-lg transition"
        >
          Print Report
        </button>
      </div>
    </div>
  )
}
