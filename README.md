# AI Efficiency Pilot

A comprehensive AI Value Calculator that helps organizations estimate the business value, ROI, and costs of AI implementation for both individuals and teams. Available as both a standalone web application and a HubSpot-compatible module.

## 🌟 Features

- **Individual & Team Analysis** - Calculate ROI for single users or entire teams
- **Productivity vs Efficiency Modes** - Two calculation approaches for different scenarios
- **Comprehensive ROI Analysis** - Including training costs, technology costs, and net value
- **Professional PDF Export** - Generate reports for stakeholder presentations
- **Mobile Responsive** - Works on all devices and screen sizes
- **HubSpot Integration** - Embeddable module for HubSpot pages

## 🚀 Live Demo

**Standalone Application:** https://ai-efficiency-pilot-601121193684.us-central1.run.app

## 📦 HubSpot Module

Ready-to-deploy HubSpot module available at `dist/hubspot-embedded-calculator.zip`

### HubSpot Installation:
1. Upload `dist/hubspot-embedded-calculator.zip` to HubSpot Design Manager
2. Use `module-embedded-full.html` for complete embedded calculator
3. Configure widget variables (title, subtitle) as needed

### HubSpot Features:
- ✅ **CSP Compliant** - Works within HubSpot's security restrictions
- ✅ **No External Dependencies** - Self-contained calculator
- ✅ **Widget Variables** - Customizable title and subtitle
- ✅ **Full Feature Parity** - All calculator functionality preserved

## 🛠️ Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## 📋 Build Commands

**Build Static Site:**
```bash
npm run build
```

**Build HubSpot Module:**
```bash
node build-hubspot-embedded.js
```

## ☁️ Cloud Deployment

**Deploy to Google Cloud Run:**
```bash
gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/ai-lift

gcloud run deploy ai-lift \
  --image gcr.io/$(gcloud config get-value project)/ai-lift \
  --platform managed --region us-east1 --allow-unauthenticated --port 8080
```

## 📊 Calculator Capabilities

### Individual Analysis:
- Annual compensation and work hours
- Value of work multipliers
- Productivity/efficiency lift percentages  
- AI training costs (hours, licenses, technology)
- ROI and net value calculations
- Dynamic insights generation

### Team Analysis:
- Multiple learners support
- Combined compensation calculations
- Per-learner cost analysis
- Scaled productivity projections
- Team ROI analysis

## 🏗️ Architecture

- **Frontend:** React 18 + TypeScript + Vite
- **UI Framework:** shadcn/ui components
- **Styling:** Tailwind CSS
- **Deployment:** Docker + nginx (Cloud Run) + HubSpot modules
- **PDF Export:** Browser-native printing

## 📁 Project Structure

```
├── client/                 # React application source
├── shared/                 # Shared TypeScript schemas  
├── hubspot-module 3/       # HubSpot module files
├── dist/                   # Build outputs and packages
├── build-hubspot-embedded.js # HubSpot module build script
└── HUBSPOT-FIX-SUMMARY.md  # HubSpot integration details
```

## 🎯 Use Cases

- **Sales Teams** - Demonstrate AI training value to prospects
- **Training Organizations** - Calculate ROI for AI courses
- **IT Departments** - Justify AI implementation budgets
- **Consulting Firms** - Provide value analysis for clients
- **HR Departments** - Plan AI training initiatives