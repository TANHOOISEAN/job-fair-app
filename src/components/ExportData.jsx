import React from 'react'
import { Download, FileText, Copy, Printer } from 'lucide-react'

export default function ExportData({ candidates }) {
  const exportToCSV = () => {
    if (candidates.length === 0) {
      alert('No candidates to export')
      return
    }

    const headers = [
      'Recruiter Name',
      'Name',
      'NRIC',
      'Phone',
      'Hometown',
      'Email',
      'DISC Type',
      'Conversion Path',
      'Interview Booked',
      'Interview Date',
      'WhatsApp Sent',
      'Event Confirmed',
      'Notes',
      'Added Date'
    ]

    const rows = candidates.map(c => [
      c.recruiterName || '',
      c.name,
      c.nric || '',
      c.phone,
      c.hometown || '',
      c.email || '',
      c.disc || '',
      c.path,
      c.interviewBooked ? 'Yes' : 'No',
      c.interviewDate || '',
      c.whatsappSent ? 'Yes' : 'No',
      c.eventConfirmed ? 'Yes' : 'No',
      c.notes || '',
      c.createdAt
    ])

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(','))
    ].join('\n')

    const link = document.createElement('a')
    link.href = `data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`
    link.download = `job-fair-candidates-${new Date().toISOString().split('T')[0]}.csv`
    link.click()
  }

  const exportToJSON = () => {
    if (candidates.length === 0) {
      alert('No candidates to export')
      return
    }

    const jsonContent = JSON.stringify(candidates, null, 2)
    const link = document.createElement('a')
    link.href = `data:application/json;charset=utf-8,${encodeURIComponent(jsonContent)}`
    link.download = `job-fair-candidates-${new Date().toISOString().split('T')[0]}.json`
    link.click()
  }

  const copyWhatsAppList = () => {
    const warmCandidates = candidates.filter(c => c.path === 'WARM')
    if (warmCandidates.length === 0) {
      alert('No WARM candidates to export')
      return
    }

    const list = warmCandidates
      .map(c => `${c.name} - ${c.phone}`)
      .join('\n')

    navigator.clipboard.writeText(list)
    alert(`Copied ${warmCandidates.length} WARM candidates to clipboard!`)
  }

  const copyWhatsAppNumbers = () => {
    const numbers = candidates
      .filter(c => c.phone)
      .map(c => c.phone)
      .join(', ')

    navigator.clipboard.writeText(numbers)
    alert(`Copied ${candidates.length} phone numbers to clipboard!`)
  }

  const printList = () => {
    const printWindow = window.open('', '_blank')
    let html = `
      <html>
      <head>
        <title>Job Fair Candidates - ${new Date().toLocaleDateString()}</title>
        <style>
          body { font-family: Arial, sans-serif; margin: 20px; }
          h1 { color: #333; }
          table { width: 100%; border-collapse: collapse; margin-top: 20px; }
          th, td { border: 1px solid #ddd; padding: 12px; text-align: left; }
          th { background-color: #f5f5f5; font-weight: bold; }
          .hot { background-color: #fee; }
          .warm { background-color: #fef5e7; }
          .cold { background-color: #f0f0f0; }
          .stats { margin-bottom: 20px; padding: 10px; background-color: #f0f8ff; border-radius: 5px; }
        </style>
      </head>
      <body>
        <h1>Job Fair Conversion Report</h1>
        <p><strong>Generated:</strong> ${new Date().toLocaleString()}</p>
        <p><strong>Total Candidates:</strong> ${candidates.length}</p>

        <div class="stats">
          <strong>Conversion Stats:</strong>
          <ul>
            <li>🔴 HOT: ${candidates.filter(c => c.path === 'HOT').length}</li>
            <li>🟡 WARM: ${candidates.filter(c => c.path === 'WARM').length}</li>
            <li>⚪ COLD: ${candidates.filter(c => c.path === 'COLD').length}</li>
            <li>📅 Interviews Booked: ${candidates.filter(c => c.interviewBooked).length}</li>
            <li>✓ WhatsApp Sent: ${candidates.filter(c => c.whatsappSent).length}</li>
          </ul>
        </div>

        <table>
          <tr>
            <th>Name</th>
            <th>Phone</th>
            <th>Email</th>
            <th>Path</th>
            <th>DISC</th>
            <th>Interview</th>
            <th>WhatsApp</th>
            <th>Event</th>
            <th>Notes</th>
          </tr>
    `

    candidates.forEach(c => {
      const rowClass = c.path === 'HOT' ? 'hot' : c.path === 'WARM' ? 'warm' : 'cold'
      html += `
        <tr class="${rowClass}">
          <td><strong>${c.name}</strong></td>
          <td>${c.phone}</td>
          <td>${c.email || ''}</td>
          <td><strong>${c.path}</strong></td>
          <td>${c.disc || ''}</td>
          <td>${c.interviewBooked ? '✓' : '–'}</td>
          <td>${c.whatsappSent ? '✓' : '–'}</td>
          <td>${c.eventConfirmed ? '✓' : '–'}</td>
          <td>${c.notes || ''}</td>
        </tr>
      `
    })

    html += `
        </table>
      </body>
      </html>
    `

    printWindow.document.write(html)
    printWindow.document.close()
    setTimeout(() => printWindow.print(), 250)
  }

  const stats = {
    hot: candidates.filter(c => c.path === 'HOT').length,
    warm: candidates.filter(c => c.path === 'WARM').length,
    cold: candidates.filter(c => c.path === 'COLD').length,
    interviewed: candidates.filter(c => c.interviewBooked).length,
    whatsappSent: candidates.filter(c => c.whatsappSent).length,
    eventConfirmed: candidates.filter(c => c.eventConfirmed).length,
  }

  return (
    <div className="space-y-6">
      {/* Summary Stats */}
      <div className="card">
        <h2 className="text-lg font-bold text-gray-900 mb-4">📊 Export Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-3 text-sm">
          <div className="text-center">
            <p className="text-gray-500">Total</p>
            <p className="text-2xl font-bold text-gray-900">{candidates.length}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">🔴 HOT</p>
            <p className="text-2xl font-bold text-red-600">{stats.hot}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">🟡 WARM</p>
            <p className="text-2xl font-bold text-amber-600">{stats.warm}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">⚪ COLD</p>
            <p className="text-2xl font-bold text-gray-600">{stats.cold}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">📅 Interview</p>
            <p className="text-2xl font-bold text-blue-600">{stats.interviewed}</p>
          </div>
          <div className="text-center">
            <p className="text-gray-500">✓ WhatsApp</p>
            <p className="text-2xl font-bold text-green-600">{stats.whatsappSent}</p>
          </div>
        </div>
      </div>

      {/* Export Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Download Formats */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4">📥 Download Data</h3>
          <div className="space-y-3">
            <button
              onClick={exportToCSV}
              disabled={candidates.length === 0}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Download className="w-4 h-4" />
              Export as CSV (Excel)
            </button>
            <button
              onClick={exportToJSON}
              disabled={candidates.length === 0}
              className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-4 h-4" />
              Export as JSON (Backup)
            </button>
          </div>
        </div>

        {/* Quick Copy Options */}
        <div className="card">
          <h3 className="font-bold text-gray-900 mb-4">📋 Copy to Clipboard</h3>
          <div className="space-y-3">
            <button
              onClick={copyWhatsAppList}
              disabled={candidates.filter(c => c.path === 'WARM').length === 0}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              WARM Candidates ({stats.warm})
            </button>
            <button
              onClick={copyWhatsAppNumbers}
              disabled={candidates.length === 0}
              className="w-full btn-secondary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Copy className="w-4 h-4" />
              All Phone Numbers ({candidates.length})
            </button>
          </div>
        </div>
      </div>

      {/* Print Option */}
      <div className="card">
        <button
          onClick={printList}
          disabled={candidates.length === 0}
          className="w-full btn-primary flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed py-3 text-lg"
        >
          <Printer className="w-5 h-5" />
          Print Full Report
        </button>
      </div>

      {/* Export Instructions */}
      <div className="card bg-blue-50 border border-blue-200">
        <h3 className="font-bold text-blue-900 mb-2">💡 How to Use Exports</h3>
        <div className="text-sm text-blue-800 space-y-2">
          <p><strong>CSV (Excel):</strong> Open in Excel/Google Sheets for filtering, sorting, and analysis</p>
          <p><strong>JSON:</strong> Backup of all data; can be re-imported later</p>
          <p><strong>Copy WARM Candidates:</strong> Paste into Spreadsheet for WhatsApp bulk messaging</p>
          <p><strong>Copy Phone Numbers:</strong> Use for creating WhatsApp broadcast lists</p>
          <p><strong>Print Report:</strong> Physical record of the event with all conversion data</p>
        </div>
      </div>

      {/* Data Usage Guide */}
      <div className="card bg-green-50 border border-green-200">
        <h3 className="font-bold text-green-900 mb-3">🎯 Post-Event Action Plan</h3>
        <ol className="text-sm text-green-800 space-y-2 list-decimal list-inside">
          <li><strong>Day 1:</strong> Export CSV, load into CRM/Spreadsheet</li>
          <li><strong>Same Day:</strong> Send WhatsApp to all WARM candidates (event invite)</li>
          <li><strong>48 Hours:</strong> WhatsApp reminder to WARM candidates</li>
          <li><strong>5 Days:</strong> Final reminder, confirm interview times</li>
          <li><strong>Before Event:</strong> Call HOT candidates to confirm attendance</li>
          <li><strong>Event Day:</strong> Check-in, record attendance, follow up same day</li>
        </ol>
      </div>
    </div>
  )
}
