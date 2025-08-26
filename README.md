# AI Efficiency Pilot

This is a frontend-only React application built with Vite. The application serves as an AI Value Calculator that helps users calculate the business value and ROI of AI training for both individuals and teams. It features a modern, tabbed interface with separate calculators for individual and team scenarios, built using shadcn/ui components and following the exact calculation logic from provided Excel specifications.

## Development

```bash
npm install
npm run dev
```

The application will be available at `http://localhost:5173`

## Build & Deploy

Build the static site:
```bash
npm run build
```

Deploy to Google Cloud Run:
```bash
gcloud builds submit --tag gcr.io/$(gcloud config get-value project)/ai-lift

gcloud run deploy ai-lift \
  --image gcr.io/$(gcloud config get-value project)/ai-lift \
  --platform managed --region us-east1 --allow-unauthenticated --port 8080
```

The application uses nginx to serve static files in production.