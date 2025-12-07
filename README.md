# EvoCRM – Professional Customer Relationship Management System

Live Demo → https://evocrm-demo.vercel.app (replace with your actual link)

---

## Overview

EvoCRM is a powerful, beautifully designed Customer Relationship Management platform built from the ground up using modern web technologies. It helps businesses manage customers, track revenue, organize products, run marketing campaigns, and grow faster — all from one intuitive dashboard.

Perfect for startups, digital agencies, SaaS companies, e-commerce brands, and service providers operating locally or globally.

---

## Supabase Authentication Setup

To run this project with authentication, you need to set up a Supabase project:

### 1. Create a Supabase Project
- Go to [supabase.com](https://supabase.com) and sign up for a free account
- Create a new project in the Supabase dashboard
- Wait for the database to be set up (this may take a minute)

### 2. Configure Authentication
- Go to the Authentication section in your Supabase dashboard
- Under "Providers", enable Email and Google authentication
- For Google authentication, you'll need to:
  - Go to Google Cloud Console
  - Create credentials (OAuth 2.0 Client IDs)
  - Add your domain (e.g., localhost:5173) to authorized domains
  - Copy the Client ID and Client Secret back to Supabase

### 3. Get Your Project Keys
- In your Supabase project dashboard, go to Project Settings
- Go to the API section
- Copy the "Project URL" and "Public anon key"

### 4. Set Up Environment Variables
- Create a `.env` file in your project root (copy from `.env.example`)
- Add your Supabase URL and ANON key:
```
VITE_SUPABASE_URL=your_project_url
VITE_SUPABASE_ANON_KEY=your_anon_key
```

### 5. Run the Application
- Install dependencies: `npm install`
- Start the development server: `npm run dev`

Your EvoCRM dashboard with Supabase authentication will be ready to use!

---

## Key Features

| Module         | What You Can Do                                                                                 |
|----------------|-------------------------------------------------------------------------------------------------|
| **Dashboard**  | Instant overview: total customers, active members, real-time users + quick customer table     |
| **Customers**  | Full customer database with search, filters, sorting, pagination, status tags & bulk actions |
| **Products**   | Manage your full product catalog: name, category, price, stock, images, and availability     |
| **Income**     | Track revenue, create & send invoices, monitor payment status, view beautiful monthly charts |
| **Promote**    | Run email/SMS marketing campaigns, track opens, clicks, conversions, and campaign performance|

### Additional Features Included
- 100% responsive (looks perfect on mobile, tablet, and desktop)
- Add, edit, delete, and export data (CSV)
- Real-time search and smart filtering
- Professional modals with smooth animations
- Toast notifications for all actions
- Loading skeletons for better UX
- Clean sidebar navigation with active states
- "Upgrade to PRO" banner (ready for future monetization)
- Fully hand-crafted, production-ready code
- **Complete authentication system** (Supabase)

---

## Tech Stack

| Technology          | Purpose                              |
|---------------------|--------------------------------------|
| React 18 + TypeScript | Strong, scalable frontend           |
| Vite                  | Lightning-fast development & build  |
| Tailwind CSS          | Beautiful, consistent, responsive design |
| React Router v6       | Smooth page navigation              |
| Recharts              | Elegant data visualization         |
| Headless UI           | Accessible modals and components    |
| React Hook Form       | Fast and reliable forms             |
| react-hot-toast       | Friendly success/error messages     |
| json-server           | Full mock REST API included         |
| Supabase              | Authentication and database         |



