import React, { useState, useMemo } from 'react'
import { Calculator, Users, TrendingUp } from 'lucide-react'

export default function IncomeProjector() {
  // Product selection
  const [productType, setProductType] = useState('traditional')

  // Input: Cases per year
  const [casesYear1, setCasesYear1] = useState(100)
  const [casesYear2, setCasesYear2] = useState(120)
  const [casesYear3, setCasesYear3] = useState(140)
  const [casesYear4, setCasesYear4] = useState(100)
  const [casesYear5, setCasesYear5] = useState(100)
  const [casesYear6, setCasesYear6] = useState(100)

  // Input: ANP per case
  const [anpPerCase, setAnpPerCase] = useState(3000)

  // Input: Agents & Promotion
  const [numAgents, setNumAgents] = useState(0)
  const [promotion, setPromotion] = useState('agent') // agent, um, gm

  // Commission rates (% of ANP) - APPLIED EVERY YEAR TO THAT YEAR'S SALES
  const commissionRates = {
    traditional: {
      year1: 0.35,
      year2: 0.25,
      year3: 0.15,
      year4: 0.15,
      year5: 0.10,
      year6: 0.10
    },
    investmentLink: {
      year1: 0.28,
      year2: 0.28,
      year3: 0.155,
      year4: 0.155,
      year5: 0.15,
      year6: 0.15
    }
  }

  const rates = commissionRates[productType]

  // Override percentages by rank
  const overrideRates = {
    um: { year1: 0.084, year2: 0.084, year3: 0.045, year4: 0.045, year5: 0.045, year6: 0.045 },
    gm: { year1: 0.056, year2: 0.056, year3: 0.01647, year4: 0.045, year5: 0.045, year6: 0.045 }
  }

  // Calculate personal sales (same for all years)
  const cases = { year1: casesYear1, year2: casesYear2, year3: casesYear3, year4: casesYear4, year5: casesYear5, year6: casesYear6 }

  const personalSales = useMemo(() => ({
    year1: cases.year1 * anpPerCase,
    year2: cases.year2 * anpPerCase,
    year3: cases.year3 * anpPerCase,
    year4: cases.year4 * anpPerCase,
    year5: cases.year5 * anpPerCase,
    year6: cases.year6 * anpPerCase
  }), [cases, anpPerCase])

  // COMPOUNDING COMMISSION CALCULATION
  // Year N earns commission on: Year 1 sales @ rate.year1 + Year 2 sales @ rate.year2 + ... + Year N sales @ rate.yearN
  const personalIncome = useMemo(() => {
    const y1 = Math.round(personalSales.year1 * rates.year1)
    const y2 = Math.round(personalSales.year1 * rates.year1 + personalSales.year2 * rates.year2)
    const y3 = Math.round(personalSales.year1 * rates.year1 + personalSales.year2 * rates.year2 + personalSales.year3 * rates.year3)
    const y4 = Math.round(personalSales.year1 * rates.year1 + personalSales.year2 * rates.year2 + personalSales.year3 * rates.year3 + personalSales.year4 * rates.year4)
    const y5 = Math.round(personalSales.year1 * rates.year1 + personalSales.year2 * rates.year2 + personalSales.year3 * rates.year3 + personalSales.year4 * rates.year4 + personalSales.year5 * rates.year5)
    const y6 = Math.round(personalSales.year1 * rates.year1 + personalSales.year2 * rates.year2 + personalSales.year3 * rates.year3 + personalSales.year4 * rates.year4 + personalSales.year5 * rates.year5 + personalSales.year6 * rates.year6)

    return { year1: y1, year2: y2, year3: y3, year4: y4, year5: y5, year6: y6 }
  }, [personalSales, rates])

  // Calculate team income (for UM/GM)
  const teamSalesPerAgent = useMemo(() => ({
    year1: cases.year1 * 0.9 * anpPerCase,
    year2: cases.year2 * 0.9 * anpPerCase,
    year3: cases.year3 * 0.9 * anpPerCase,
    year4: cases.year4 * 0.9 * anpPerCase,
    year5: cases.year5 * 0.9 * anpPerCase,
    year6: cases.year6 * 0.9 * anpPerCase
  }), [cases, anpPerCase])

  const totalTeamSales = useMemo(() => ({
    year1: teamSalesPerAgent.year1 * numAgents,
    year2: teamSalesPerAgent.year2 * numAgents,
    year3: teamSalesPerAgent.year3 * numAgents,
    year4: teamSalesPerAgent.year4 * numAgents,
    year5: teamSalesPerAgent.year5 * numAgents,
    year6: teamSalesPerAgent.year6 * numAgents
  }), [teamSalesPerAgent, numAgents])

  // COMPOUNDING TEAM OVERRIDE
  const teamOverride = useMemo(() => {
    if (promotion === 'agent' || numAgents === 0) return null

    const override = promotion === 'um' ? overrideRates.um : overrideRates.gm

    const y1 = Math.round(totalTeamSales.year1 * override.year1)
    const y2 = Math.round(totalTeamSales.year1 * override.year1 + totalTeamSales.year2 * override.year2)
    const y3 = Math.round(totalTeamSales.year1 * override.year1 + totalTeamSales.year2 * override.year2 + totalTeamSales.year3 * override.year3)
    const y4 = Math.round(totalTeamSales.year1 * override.year1 + totalTeamSales.year2 * override.year2 + totalTeamSales.year3 * override.year3 + totalTeamSales.year4 * override.year4)
    const y5 = Math.round(totalTeamSales.year1 * override.year1 + totalTeamSales.year2 * override.year2 + totalTeamSales.year3 * override.year3 + totalTeamSales.year4 * override.year4 + totalTeamSales.year5 * override.year5)
    const y6 = Math.round(totalTeamSales.year1 * override.year1 + totalTeamSales.year2 * override.year2 + totalTeamSales.year3 * override.year3 + totalTeamSales.year4 * override.year4 + totalTeamSales.year5 * override.year5 + totalTeamSales.year6 * override.year6)

    return { year1: y1, year2: y2, year3: y3, year4: y4, year5: y5, year6: y6 }
  }, [promotion, totalTeamSales, numAgents, overrideRates])

  const totalIncome = useMemo(() => {
    if (promotion === 'agent') {
      return personalIncome
    }
    return {
      year1: personalIncome.year1 + (teamOverride?.year1 || 0),
      year2: personalIncome.year2 + (teamOverride?.year2 || 0),
      year3: personalIncome.year3 + (teamOverride?.year3 || 0),
      year4: personalIncome.year4 + (teamOverride?.year4 || 0),
      year5: personalIncome.year5 + (teamOverride?.year5 || 0),
      year6: personalIncome.year6 + (teamOverride?.year6 || 0)
    }
  }, [promotion, personalIncome, teamOverride])

  const sixYearTotal = useMemo(() =>
    Object.values(totalIncome).reduce((a, b) => a + b, 0)
  , [totalIncome])

  const formatCurrency = (value) => `RM${Math.round(value).toLocaleString()}`

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white p-6 rounded-lg">
        <h2 className="text-2xl font-bold mb-2 flex items-center gap-2">
          <Calculator className="w-6 h-6" />
          Custom Income Projector
        </h2>
        <p className="text-sm opacity-90">Build your own 5-year income projection</p>
      </div>

      {/* STEP 1: Product Type */}
      <div className="card border-2 border-orange-300 bg-orange-50">
        <h3 className="text-lg font-bold text-orange-900 mb-3">Step 1: Select Product Type</h3>
        <div className="flex gap-3">
          <button
            onClick={() => setProductType('traditional')}
            className={`flex-1 p-3 rounded-lg font-bold transition ${
              productType === 'traditional'
                ? 'bg-orange-600 text-white'
                : 'bg-white text-gray-700 border-2 border-orange-200 hover:border-orange-400'
            }`}
          >
            📋 Traditional Plan
            <div className="text-xs font-normal opacity-75 mt-1">
              Y1: 35% | Y2: 25% | Y3-6: 15-10%
            </div>
          </button>
          <button
            onClick={() => setProductType('investmentLink')}
            className={`flex-1 p-3 rounded-lg font-bold transition ${
              productType === 'investmentLink'
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-700 border-2 border-blue-200 hover:border-blue-400'
            }`}
          >
            📈 Investment Link
            <div className="text-xs font-normal opacity-75 mt-1">
              Y1-2: 28% | Y3-6: 15-15.5%
            </div>
          </button>
        </div>
      </div>

      {/* STEP 2: Your Personal Sales */}
      <div className="card border-2 border-green-300 bg-green-50">
        <h3 className="text-lg font-bold text-green-900 mb-4">Step 2: Your Personal Sales (Cases/Year)</h3>

        {/* ANP per case */}
        <div className="mb-4 p-3 bg-white rounded-lg border border-green-200">
          <label className="block text-sm font-bold text-gray-700 mb-2">
            Average ANP per case: {formatCurrency(anpPerCase)}
          </label>
          <input
            type="range"
            min="1000"
            max="10000"
            step="100"
            value={anpPerCase}
            onChange={(e) => setAnpPerCase(parseInt(e.target.value))}
            className="w-full h-2 bg-green-200 rounded-lg"
          />
          <p className="text-xs text-gray-600 mt-1">Range: RM1K - RM10K</p>
        </div>

        {/* Summary Table */}
        <div className="mb-4 overflow-x-auto">
          <table className="w-full text-sm border-collapse">
            <thead>
              <tr className="bg-green-200">
                <th className="border border-green-300 p-2 font-bold text-left">Year</th>
                <th className="border border-green-300 p-2 font-bold text-center">Cases</th>
                <th className="border border-green-300 p-2 font-bold text-right">ANP</th>
                <th className="border border-green-300 p-2 font-bold text-right">Income</th>
              </tr>
            </thead>
            <tbody>
              {[
                { year: 'Y1', cases: casesYear1, setter: setCasesYear1 },
                { year: 'Y2', cases: casesYear2, setter: setCasesYear2 },
                { year: 'Y3', cases: casesYear3, setter: setCasesYear3 },
                { year: 'Y4', cases: casesYear4, setter: setCasesYear4 },
                { year: 'Y5', cases: casesYear5, setter: setCasesYear5 },
                { year: 'Y6', cases: casesYear6, setter: setCasesYear6 }
              ].map((row, idx) => (
                <tr key={row.year} className={idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}>
                  <td className="border border-green-300 p-2 font-bold">{row.year}</td>
                  <td className="border border-green-300 p-2 text-center font-bold text-green-700">{row.cases}</td>
                  <td className="border border-green-300 p-2 text-right text-green-700 font-bold">
                    {formatCurrency(row.cases * anpPerCase)}
                  </td>
                  <td className="border border-green-300 p-2 text-right text-green-900 font-bold">
                    {formatCurrency(row.cases * anpPerCase * Object.values(rates)[idx])}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Sliders for each year */}
        <div className="space-y-3 p-3 bg-white rounded-lg border border-green-200">
          <p className="text-sm font-bold text-gray-700 mb-3">Adjust cases per year:</p>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Year 1</label>
              <span className="text-xs font-bold text-green-700">{casesYear1} cases</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={casesYear1}
              onChange={(e) => setCasesYear1(parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Year 2</label>
              <span className="text-xs font-bold text-green-700">{casesYear2} cases</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={casesYear2}
              onChange={(e) => setCasesYear2(parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Year 3</label>
              <span className="text-xs font-bold text-green-700">{casesYear3} cases</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={casesYear3}
              onChange={(e) => setCasesYear3(parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Year 4</label>
              <span className="text-xs font-bold text-green-700">{casesYear4} cases</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={casesYear4}
              onChange={(e) => setCasesYear4(parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Year 5</label>
              <span className="text-xs font-bold text-green-700">{casesYear5} cases</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={casesYear5}
              onChange={(e) => setCasesYear5(parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg"
            />
          </div>

          <div>
            <div className="flex justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Year 6</label>
              <span className="text-xs font-bold text-green-700">{casesYear6} cases</span>
            </div>
            <input
              type="range"
              min="1"
              max="200"
              value={casesYear6}
              onChange={(e) => setCasesYear6(parseInt(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg"
            />
          </div>
        </div>
      </div>

      {/* STEP 3: Promotion & Team */}
      <div className="card border-2 border-purple-300 bg-purple-50">
        <h3 className="text-lg font-bold text-purple-900 mb-4">Step 3: Your Position & Team</h3>

        <div className="space-y-4">
          {/* Promotion */}
          <div>
            <p className="text-sm font-bold text-gray-700 mb-2">Your Position:</p>
            <div className="flex gap-2">
              <button
                onClick={() => { setPromotion('agent'); setNumAgents(0); }}
                className={`flex-1 p-2 rounded font-bold transition ${
                  promotion === 'agent' ? 'bg-blue-600 text-white' : 'bg-white border-2 border-gray-300'
                }`}
              >
                👤 Agent
              </button>
              <button
                onClick={() => setPromotion('um')}
                className={`flex-1 p-2 rounded font-bold transition ${
                  promotion === 'um' ? 'bg-purple-600 text-white' : 'bg-white border-2 border-gray-300'
                }`}
              >
                👨‍💼 UM
              </button>
              <button
                onClick={() => setPromotion('gm')}
                className={`flex-1 p-2 rounded font-bold transition ${
                  promotion === 'gm' ? 'bg-red-600 text-white' : 'bg-white border-2 border-gray-300'
                }`}
              >
                👑 GM
              </button>
            </div>
          </div>

          {/* Agents slider */}
          {(promotion === 'um' || promotion === 'gm') && (
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">
                How many agents to manage? {numAgents}
              </label>
              <input
                type="range"
                min="0"
                max={promotion === 'um' ? 15 : 30}
                value={numAgents}
                onChange={(e) => setNumAgents(parseInt(e.target.value))}
                className="w-full h-2 bg-purple-200 rounded-lg"
              />
              <p className="text-xs text-gray-600 mt-1">
                {promotion === 'um' ? 'UM Override: 8.4% (Y1-2), 4.5% (Y3-5)' : 'GM Override: 5.6% (Y1-2), 1.647% (Y3), 4.5% (Y4-5)'}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* RESULTS - DETAILED TABLE VIEW */}
      <div className="card bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 border-2 border-green-400 p-0">
        <div className="p-4 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-t-lg">
          <h3 className="text-xl font-bold">💰 Your {promotion.toUpperCase()} - 6 Year Income Growth</h3>
          <p className="text-sm opacity-90 mt-1">See how consistency & hard work compounds your earnings</p>
        </div>

        {/* Main Results Table */}
        <div className="p-4">
          <div className="overflow-x-auto mb-4">
            <table className="w-full">
              <thead>
                <tr className="bg-green-200 border-b-2 border-green-400">
                  <th className="px-3 py-2 text-left font-bold text-green-900">Year</th>
                  <th className="px-3 py-2 text-center font-bold text-green-900">Cases</th>
                  <th className="px-3 py-2 text-right font-bold text-green-900">ANP</th>
                  <th className="px-3 py-2 text-right font-bold text-green-900">Rate</th>
                  <th className="px-3 py-2 text-right font-bold text-green-900">Income</th>
                  <th className="px-3 py-2 text-center font-bold text-green-900">Growth</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { year: 'Y1', cases: casesYear1, key: 'year1', rate: rates.year1 },
                  { year: 'Y2', cases: casesYear2, key: 'year2', rate: rates.year2 },
                  { year: 'Y3', cases: casesYear3, key: 'year3', rate: rates.year3 },
                  { year: 'Y4', cases: casesYear4, key: 'year4', rate: rates.year4 },
                  { year: 'Y5', cases: casesYear5, key: 'year5', rate: rates.year5 },
                  { year: 'Y6', cases: casesYear6, key: 'year6', rate: rates.year6 }
                ].map((row, idx) => {
                  const income = totalIncome[row.key]
                  const prevIncome = idx > 0 ? totalIncome[['year1', 'year2', 'year3', 'year4', 'year5', 'year6'][idx - 1]] : 0
                  const growth = idx > 0 ? Math.round((income - prevIncome) / prevIncome * 100) : 0
                  const maxIncome = Math.max(...Object.values(totalIncome))
                  const incomePercent = (income / maxIncome) * 100

                  return (
                    <tr key={row.year} className={`border-b border-green-200 ${idx % 2 === 0 ? 'bg-white' : 'bg-green-50'}`}>
                      <td className="px-3 py-3 font-bold text-green-900">{row.year}</td>
                      <td className="px-3 py-3 text-center font-bold text-gray-700">{row.cases}</td>
                      <td className="px-3 py-3 text-right font-bold text-gray-700">{formatCurrency(row.cases * anpPerCase)}</td>
                      <td className="px-3 py-3 text-right font-bold text-blue-700">{Math.round(row.rate * 100)}%</td>
                      <td className="px-3 py-3 text-right font-bold text-green-700 text-lg">{formatCurrency(income)}</td>
                      <td className="px-3 py-3 text-center">
                        <div className="flex items-center justify-center gap-1">
                          {idx > 0 && (
                            <>
                              <div className="w-20 bg-gray-200 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{width: `${incomePercent}%`}}></div>
                              </div>
                              <span className={`text-xs font-bold ${growth > 0 ? 'text-green-600' : 'text-gray-600'}`}>
                                {growth > 0 ? `+${growth}%` : `${growth}%`}
                              </span>
                            </>
                          )}
                          {idx === 0 && <span className="text-xs text-gray-500">Start</span>}
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>

          {/* Income Breakdown by Type */}
          {(promotion === 'um' || promotion === 'gm') && numAgents > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
              {/* Personal Income */}
              <div className="p-3 bg-white rounded-lg border-2 border-blue-300">
                <p className="text-sm font-bold text-blue-900 mb-2">👤 Your Personal Income</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {['year1', 'year2', 'year3'].map((year, idx) => (
                    <div key={year} className="p-2 bg-blue-50 rounded">
                      <p className="text-xs text-gray-600">Y{idx + 1}</p>
                      <p className="font-bold text-blue-700">{formatCurrency(personalIncome[year])}</p>
                    </div>
                  ))}
                  {['year4', 'year5', 'year6'].map((year, idx) => (
                    <div key={year} className="p-2 bg-blue-50 rounded">
                      <p className="text-xs text-gray-600">Y{idx + 4}</p>
                      <p className="font-bold text-blue-700">{formatCurrency(personalIncome[year])}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Team Override Income */}
              <div className="p-3 bg-white rounded-lg border-2 border-purple-300">
                <p className="text-sm font-bold text-purple-900 mb-2">👥 Team Override ({numAgents} agents)</p>
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  {['year1', 'year2', 'year3'].map((year, idx) => (
                    <div key={year} className="p-2 bg-purple-50 rounded">
                      <p className="text-xs text-gray-600">Y{idx + 1}</p>
                      <p className="font-bold text-purple-700">{formatCurrency(teamOverride[year] || 0)}</p>
                    </div>
                  ))}
                  {['year4', 'year5', 'year6'].map((year, idx) => (
                    <div key={year} className="p-2 bg-purple-50 rounded">
                      <p className="text-xs text-gray-600">Y{idx + 4}</p>
                      <p className="font-bold text-purple-700">{formatCurrency(teamOverride[year] || 0)}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 6-Year Summary */}
          <div className="p-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white rounded-lg">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div>
                <p className="text-xs opacity-90">Total Cases</p>
                <p className="text-xl font-bold">{casesYear1 + casesYear2 + casesYear3 + casesYear4 + casesYear5 + casesYear6}</p>
              </div>
              <div>
                <p className="text-xs opacity-90">Avg Annual Income</p>
                <p className="text-xl font-bold">{formatCurrency(sixYearTotal / 6)}</p>
              </div>
              <div>
                <p className="text-xs opacity-90">Highest Year</p>
                <p className="text-xl font-bold">{formatCurrency(Math.max(...Object.values(totalIncome)))}</p>
              </div>
              <div className="col-span-2 md:col-span-1 border-t-2 border-white md:border-t-0 md:border-l-2 pt-3 md:pt-0 md:pl-3">
                <p className="text-xs opacity-90 font-bold">6-YEAR TOTAL</p>
                <p className="text-2xl font-bold">{formatCurrency(sixYearTotal)}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="card p-3 bg-blue-50 border border-blue-200 text-xs text-blue-900">
        <strong>ℹ️ How it works:</strong> Adjust cases per year, ANP per case, and team size to see different scenarios. Your income grows with: (1) More cases sold, (2) Higher average premiums, (3) Team overrides from agents you manage.
      </div>
    </div>
  )
}
