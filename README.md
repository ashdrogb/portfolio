# Ashwin Kumar — Portfolio

React + Flask personal portfolio. Clean, minimal, built to attract Data Scientist / ML Engineer roles.

## Structure

```
portfolio/
├── frontend/       # React + Vite
└── backend/        # Flask API
```

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev        # http://localhost:5173
```

### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py      # http://localhost:5000
```

## Deployment

### Frontend → Vercel
```bash
cd frontend
npm run build
# Push to GitHub → connect repo in Vercel
```

### Backend → Render
- Create a new Web Service on Render
- Point to `backend/` directory
- Build command: `pip install -r requirements.txt`
- Start command: `gunicorn app:app`
- Add env vars: `SMTP_USER`, `SMTP_PASS` (optional, for contact form email)

## Customise Before Deploying

1. **`frontend/src/App.jsx`** — update your name, bio, experience, and project details
2. **`frontend/.env`** — set `VITE_API_URL` to your deployed Flask backend URL
3. **`backend/app.py`** — uncomment SMTP block and set env vars to enable email from contact form
4. Add a LinkedIn link in the footer and contact section

## Contact Form

The `/api/contact` endpoint logs messages to stdout by default.
To enable actual email sending: set `SMTP_USER` and `SMTP_PASS` env vars on Render and uncomment the SMTP block in `app.py`.
