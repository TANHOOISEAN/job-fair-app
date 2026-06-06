# Job Fair Conversion Management System

A real-time candidate tracking app designed for high-speed job fair events.

## Features

✅ **Real-time Dashboard** - Live conversion metrics (HOT/WARM/COLD tracking)
✅ **Fast Data Entry** - Quick form for collecting candidate details
✅ **All Candidate View** - Filter, sort, and search all candidates
✅ **Export Options** - CSV, JSON, print, or copy to clipboard
✅ **Local Storage** - All data persists in your browser (no account needed)
✅ **Mobile Friendly** - Works on phones, tablets, and desktops

## Setup

```bash
npm install
npm run dev
```

App opens on http://localhost:3000

## How to Use

### 1. Set Event Date (Settings)
Click the ⚙️ icon to set your follow-up event date.

### 2. Add Candidates
Use the "Add Candidate" tab to input:
- Name + Phone (required)
- Email, DISC type, Income expectation (optional)
- Conversion path: **HOT** (interview now), **WARM** (WhatsApp + event), or **COLD** (referral)
- Track follow-up status: interviews, WhatsApp sent, event confirmed

### 3. Monitor Dashboard
Real-time stats show:
- Total candidates processed
- HOT/WARM/COLD conversion rates
- Follow-up completion %
- Progress toward 60-70% conversion target

### 4. View All Candidates
Filter by path, sort by recent/name/priority.
Edit or delete candidates as needed.

### 5. Export Data
- **CSV:** Open in Excel for analysis
- **JSON:** Backup your data
- **Copy to clipboard:** Quick WhatsApp lists or phone numbers
- **Print:** Physical report for your records

## Data Security

✅ All data stored locally in your browser (localStorage)
✅ No data sent to external servers
✅ Backup with JSON export
✅ Clear all data anytime

## Conversion Paths Explained

| Path | Strategy | Follow-up |
|------|----------|-----------|
| **HOT** | Book interview immediately | Call 1hr before |
| **WARM** | WhatsApp invite to event | WhatsApp reminder 48h |
| **COLD** | Ask for referrals | Optional follow-up |

## Quick Tips

- 📱 Use on phone during event for fast input
- 💾 Export daily backup as JSON
- 📊 Check dashboard to track conversion %
- 🔔 Use phone numbers export for WhatsApp broadcasts
- 🖨️ Print report before interviews for reference

## Troubleshooting

**Lost my data?**
- Check localStorage (DevTools → Application → Local Storage)
- Restore from JSON backup if available

**App not loading?**
- Clear browser cache and refresh
- Check if JavaScript is enabled

**Export issues?**
- Use CSV for most compatibility
- JSON backup if having trouble with CSV

## Building for Production

```bash
npm run build
```

Generates optimized build in `dist/` folder.
