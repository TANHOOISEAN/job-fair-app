import React, { useState } from 'react'
import { ChevronDown, TrendingUp, DollarSign, Award, BarChart3 } from 'lucide-react'

export default function CareerPresentation() {
  const [expandedTier, setExpandedTier] = useState(null)
  const [selectedPerformance, setSelectedPerformance] = useState('average')

  // Clear tier structure with specific commission rates
  const tiers = [
    {
      rank: 1,
      name: 'AGENT',
      icon: '👤',
      minProduction: 'RM18,000 FYLPI',
      baseSalary: 'RM500-1,000',
      commissionRate: 'RM2,500-3,500 per policy sold',
      overrideCommission: 'None (personal sales only)',
      requirements: [
        'SPM/MCE qualification minimum',
        'Pass PCE (Pre-Contract Exam)',
        'Pass CEILLI exam within 6 months',
        'Complete PEP Year 1 training (30 hours)',
        '85%+ 1st year persistency (customer retention)'
      ],
      progressionTo: 'Unit Manager (UM)',
      timeline: '2-3 years with consistent performance',
      color: 'bg-blue-50 border-blue-400',
      policy: '8-10 policies/month',
      estimatedMonthly: {
        low: 'RM20,000-25,000',
        average: 'RM30,000-40,000',
        high: 'RM50,000-60,000'
      }
    },
    {
      rank: 2,
      name: 'UNIT MANAGER (UM)',
      icon: '👨‍💼',
      minProduction: 'RM100,000 FYLPI (Direct Group)',
      baseSalary: 'RM3,500-5,000 monthly allowance',
      commissionRate: 'RM3,200-4,500 per policy (personal sales)',
      overrideCommission: '25-30% of direct agents\' sales',
      requirements: [
        'RM100,000+ annual FYLPI from Direct Group',
        'Minimum 4 Qualifying Agents (team)',
        '85%+ 1st year persistency (Direct Group)',
        'GM Venture Level 3 training',
        'Pass required exams',
        '2+ years as Agent'
      ],
      progressionTo: 'Group Manager (GM)',
      timeline: '2-3 years of strong team building',
      color: 'bg-purple-50 border-purple-400',
      policy: 'Lead 4+ agents + personal sales',
      estimatedMonthly: {
        low: 'RM60,000-80,000',
        average: 'RM120,000-180,000',
        high: 'RM250,000-350,000'
      }
    },
    {
      rank: 3,
      name: 'GROUP MANAGER (GM)',
      icon: '👑',
      minProduction: 'RM300,000-450,000 FYLPI (Direct Group)',
      baseSalary: 'RM5,000-8,000+ monthly allowance',
      commissionRate: 'RM3,200-4,500 per policy (personal sales)',
      overrideCommission: '35-50% of entire Whole Group (direct & indirect)',
      requirements: [
        'RM300,000-450,000 FYLPI (Direct Group)',
        'Minimum 8 Qualifying Agents (whole group)',
        '80%+ 1st year persistency (Whole Group)',
        'GM Venture Level 4 training (AMTC)',
        '3+ years as Unit Manager',
        'Build & manage multiple UM teams'
      ],
      progressionTo: 'Senior Group Manager (Leadership)',
      timeline: 'Top leadership tier',
      color: 'bg-red-50 border-red-400',
      policy: 'Lead multiple UMs + agents + personal sales',
      estimatedMonthly: {
        low: 'RM200,000-300,000',
        average: 'RM500,000-800,000',
        high: 'RM1,000,000+'
      }
    }
  ]

  const performanceScenarios = {
    low: { label: '📉 Below Average', multiplier: 0.6, description: 'Selling 50% below target' },
    average: { label: '📊 Average', multiplier: 1.0, description: 'Hitting consistent targets' },
    high: { label: '📈 High Performer', multiplier: 1.5, description: 'Exceeding targets significantly' }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-600 to-emerald-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2">💰 Career & Commission Structure</h2>
        <p className="text-sm opacity-90">
          Clear progression path with transparent salary + commission breakdown
        </p>
      </div>

      {/* Performance Filter */}
      <div className="card">
        <p className="text-sm font-bold text-gray-700 mb-3">View income estimates by performance level:</p>
        <div className="flex gap-2 flex-wrap">
          {Object.entries(performanceScenarios).map(([key, value]) => (
            <button
              key={key}
              onClick={() => setSelectedPerformance(key)}
              className={`px-4 py-2 rounded-lg font-medium transition ${
                selectedPerformance === key
                  ? 'bg-blue-600 text-white shadow-lg'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {value.label}
            </button>
          ))}
        </div>
        <p className="text-xs text-gray-500 mt-2">
          *Estimates based on: {performanceScenarios[selectedPerformance].description}
        </p>
      </div>

      {/* Tier-by-Tier Breakdown */}
      <div className="space-y-3">
        {tiers.map((tier, idx) => (
          <div
            key={idx}
            className={`border-l-4 p-4 rounded-lg cursor-pointer transition ${tier.color}`}
          >
            <button
              onClick={() => setExpandedTier(expandedTier === tier.rank ? null : tier.rank)}
              className="w-full flex items-center justify-between text-left"
            >
              <div className="flex items-center gap-3 flex-1">
                <span className="text-3xl">{tier.icon}</span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-bold text-lg text-gray-900">TIER {tier.rank}: {tier.name}</p>
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Min Production: {tier.minProduction} | Base: {tier.baseSalary}
                  </p>
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <p className="text-sm font-bold text-green-700">{tier.estimatedMonthly[selectedPerformance]}/month</p>
                <ChevronDown
                  className={`w-5 h-5 text-gray-400 transition mt-1 ${
                    expandedTier === tier.rank ? 'rotate-180' : ''
                  }`}
                />
              </div>
            </button>

            {expandedTier === tier.rank && (
              <div className="mt-4 pt-4 border-t-2 border-gray-300 space-y-4">
                {/* Commission Breakdown */}
                <div className="bg-white p-3 rounded-lg">
                  <p className="text-sm font-bold text-gray-900 mb-2">💰 COMMISSION STRUCTURE:</p>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-700">Base Monthly Allowance:</span>
                      <span className="font-bold text-gray-900">{tier.baseSalary}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-700">Commission per Policy:</span>
                      <span className="font-bold text-green-700">{tier.commissionRate}</span>
                    </div>
                    <div className="flex justify-between border-t pt-2">
                      <span className="text-gray-700">Team Override (from agents):</span>
                      <span className="font-bold text-blue-700">{tier.overrideCommission}</span>
                    </div>
                  </div>
                </div>

                {/* Income at Performance Level */}
                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-3 rounded-lg">
                  <p className="text-sm font-bold text-green-900 mb-2">📊 MONTHLY INCOME (Estimated):</p>
                  <div className="grid grid-cols-3 gap-2 text-sm text-center">
                    <div>
                      <p className="text-xs text-green-700">Below Average</p>
                      <p className="font-bold text-green-900">{tier.estimatedMonthly.low}</p>
                    </div>
                    <div className="bg-green-200 rounded px-2 py-1">
                      <p className="text-xs text-green-700 font-bold">AVERAGE</p>
                      <p className="font-bold text-green-900">{tier.estimatedMonthly.average}</p>
                    </div>
                    <div>
                      <p className="text-xs text-green-700">High Performer</p>
                      <p className="font-bold text-green-900">{tier.estimatedMonthly.high}</p>
                    </div>
                  </div>
                </div>

                {/* Requirements */}
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-2">✓ REQUIREMENTS TO ACHIEVE THIS TIER:</p>
                  <ul className="text-xs text-gray-700 space-y-1">
                    {tier.requirements.map((req, i) => (
                      <li key={i} className="flex gap-2">
                        <span className="text-green-600 font-bold">•</span>
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Progression */}
                <div className="p-3 bg-blue-100 rounded-lg">
                  <p className="text-xs font-bold text-blue-900 mb-1">➡️ PROGRESSION PATH:</p>
                  <p className="text-sm text-blue-900">
                    <strong>{tier.progressionTo}</strong> — Timeline: {tier.timeline}
                  </p>
                </div>

                {/* Team Impact */}
                {tier.rank >= 4 && (
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <p className="text-xs font-bold text-purple-900 mb-1">👥 TEAM EARNING MULTIPLIER:</p>
                    <p className="text-sm text-purple-900">
                      Your income grows as your team grows. {tier.name}s earn {tier.overrideCommission} on all team sales in addition to personal sales commissions.
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Commission Explanation */}
      <div className="card border-2 border-orange-300 bg-orange-50">
        <h3 className="font-bold text-orange-900 mb-3 flex items-center gap-2">
          <BarChart3 className="w-5 h-5" />
          How Commission Works
        </h3>
        <div className="space-y-3 text-sm text-orange-900">
          <p>
            <strong>Personal Sales Commission:</strong> You earn RM2,500-4,500 per policy you sell directly, regardless of tier.
          </p>
          <p>
            <strong>Team Override (UM & GM only):</strong> You earn a percentage of your team members' personal sales. This is how leadership builds wealth.
          </p>
          <p className="bg-white p-2 rounded border border-orange-200">
            <strong>Example:</strong> As a UM with 4 agents, if each sells 10 policies/month at RM3,200 commission:
            <br />
            • Your personal sales (5 policies): RM16,000
            <br />
            • Your team override (40 policies × 25%): RM32,000
            <br />
            • Base allowance: RM4,000
            <br />
            • <strong>Total: RM52,000/month</strong>
          </p>
        </div>
      </div>

      {/* Key Insights */}
      <div className="card border-2 border-green-300 bg-green-50">
        <h3 className="font-bold text-green-900 mb-3">🎯 Key Income Drivers</h3>
        <ul className="text-sm text-green-800 space-y-2">
          <li className="flex gap-2">
            <span>1️⃣</span>
            <span><strong>Personal Sales Volume:</strong> More policies = higher income. Target 10-15 policies/month as Agent/CA.</span>
          </li>
          <li className="flex gap-2">
            <span>2️⃣</span>
            <span><strong>Team Building (UM/GM):</strong> Your real wealth comes from building a strong team. Each agent you recruit multiplies your income.</span>
          </li>
          <li className="flex gap-2">
            <span>3️⃣</span>
            <span><strong>Customer Retention (85%+):</strong> High persistency = job security + repeat business + faster promotion.</span>
          </li>
          <li className="flex gap-2">
            <span>4️⃣</span>
            <span><strong>Tier Progression:</strong> Each promotion increases your base + commission rate. GM can earn RM500K-1M+ per month.</span>
          </li>
        </ul>
      </div>

      {/* Income Comparison Table */}
      <div className="card">
        <h3 className="font-bold text-gray-900 mb-3">📋 Quick Comparison: Monthly Income by Rank</h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-gradient-to-r from-gray-300 to-gray-400">
                <th className="border border-gray-300 p-2 text-left font-bold">Rank</th>
                <th className="border border-gray-300 p-2 text-center font-bold">Position</th>
                <th className="border border-gray-300 p-2 text-center font-bold">Below Avg</th>
                <th className="border border-gray-300 p-2 text-center font-bold">Average</th>
                <th className="border border-gray-300 p-2 text-center font-bold">High</th>
              </tr>
            </thead>
            <tbody>
              {tiers.map((tier, idx) => (
                <tr key={idx} className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="border border-gray-300 p-2 font-bold text-center">{tier.rank}</td>
                  <td className="border border-gray-300 p-2 font-bold">{tier.name}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs">{tier.estimatedMonthly.low}</td>
                  <td className="border border-gray-300 p-2 text-center text-xs font-bold text-green-700">
                    {tier.estimatedMonthly.average}
                  </td>
                  <td className="border border-gray-300 p-2 text-center text-xs text-blue-700 font-bold">{tier.estimatedMonthly.high}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
