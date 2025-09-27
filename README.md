# 🚀 Techspark - Technical Event Registration Platform

<div align="center">
  <img src="public/assets/images/Techspark.png" alt="Techspark Logo" width="300" height="200">
  <h3>Event Registration Platform by Coders Nexus</h3>
  <p>A modern, full-stack web application for seamless technical event registration and management</p>
</div>

---

## 🌟 Overview

Techspark is a cutting-edge event registration platform built for technical events, hackathons, and conferences. It provides a seamless registration experience for participants and comprehensive management tools for administrators.

## ✨ Key Features

### 🎯 User Experience
- **Responsive Landing Page** with hero section, about, timeline, and interactive map
- **Smooth Registration Flow** with form validation and real-time feedback
- **Success Confirmation** with thank-you page and registration confirmation
- **Mobile-First Design** optimized for all device sizes

### 🛡️ Admin Management
- **Secure Admin Dashboard** with authentication
- **Real-Time Participant Tracking** with live updates
- **Data Export Features** (Excel, PDF formats)
- **Participant Search & Filtering**
- **Registration Analytics** and reporting

### 🎨 Modern UI/UX
- **Dark Theme Design** with gradient effects
- **Interactive Animations** using Framer Motion and GSAP
- **3D Elements** with Three.js integration
- **Particle Effects** for enhanced visual appeal
- **Custom Components** with Tailwind CSS

## 🛠️ Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework with App Router
- **[React 19](https://react.dev/)** - Latest React version
- **[TypeScript 5](https://www.typescriptlang.org/)** - Type-safe development
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework

### Backend & Database
- **[Supabase](https://supabase.com/)** - Backend-as-a-Service with PostgreSQL
- **Real-time subscriptions** for live data updates
- **Authentication** and session management

### Animations & UI
- **[Framer Motion](https://www.framer.com/motion/)** - Production-ready motion library
- **[GSAP](https://greensock.com/gsap/)** - Professional animation library
- **[Three.js](https://threejs.org/)** - 3D graphics library
- **[React Three Fiber](https://docs.pmnd.rs/react-three-fiber/)** - React renderer for Three.js
- **[Lucide React](https://lucide.dev/)** - Beautiful icon library

### Form Handling & Validation
- **[React Hook Form](https://react-hook-form.com/)** - Performant forms with easy validation
- **[Yup](https://github.com/jquense/yup)** - Schema validation
- **[React Hot Toast](https://react-hot-toast.com/)** - Notification system

### Data Export
- **[XLSX](https://sheetjs.com/)** - Excel file generation
- **[jsPDF](https://github.com/parallax/jsPDF)** - PDF generation
- **[React to Print](https://github.com/gregnb/react-to-print)** - Print functionality

## 🚀 Getting Started

### Prerequisites
- **Node.js** (version 18 or higher)
- **npm** or **yarn** package manager
- **Supabase account** for database and authentication

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd techspark
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Environment Setup**
   - Create a `.env.local` file in the root directory
   - Add your Supabase credentials:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Database Setup**
   - Create a `participants` table in your Supabase database
   - Set up the required columns (see Database Schema below)

5. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

7. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub
   - Click "New Project" and import your repository
   - Configure environment variables in Vercel dashboard
   - Deploy!

3. **Environment Variables for Production**
   Add these in Vercel dashboard under Settings > Environment Variables:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   ADMIN_EMAIL=your_admin_email
   ADMIN_PASSWORD=your_secure_password
   JWT_SECRET=your_jwt_secret
   ```

### Deploy to Netlify

1. **Build Configuration**
   - Build command: `npm run build`
   - Publish directory: `.next`

2. **Environment Variables**
   Add the same environment variables in Netlify dashboard

### Other Hosting Platforms
- **Railway**: Great for full-stack apps
- **Render**: Free tier available
- **Digital Ocean App Platform**: Professional hosting

## 🗄️ Database Schema

### Participants Table
```sql
CREATE TABLE participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name VARCHAR(50) NOT NULL,
  last_name VARCHAR(50) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  phone VARCHAR(15) NOT NULL,
  college VARCHAR(255) NOT NULL,
  year INTEGER NOT NULL,
  department VARCHAR(100) NOT NULL,
  usn VARCHAR(20) UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### Required Database Functions
Run this in your Supabase SQL Editor:
```sql
CREATE OR REPLACE FUNCTION get_participant_stats()
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_participants', (SELECT COUNT(*) FROM participants),
    'unique_colleges', (SELECT COUNT(DISTINCT college) FROM participants),
    'unique_departments', (SELECT COUNT(DISTINCT department) FROM participants),
    'today_registrations', (
      SELECT COUNT(*) FROM participants 
      WHERE DATE(created_at) = CURRENT_DATE
    ),
    'week_registrations', (
      SELECT COUNT(*) FROM participants 
      WHERE created_at >= CURRENT_DATE - INTERVAL '7 days'
    )
  ) INTO result;
  
  RETURN result;
END;
$$;

GRANT EXECUTE ON FUNCTION get_participant_stats() TO service_role;
```

## 🔐 Admin Access

- **URL**: `/admin/login`
- **Default Credentials** (Change in production!):
  - Email: `admin@techspark.com`
  - Password: `Admin123SecurePass`

## 🎯 Features Overview

### Registration System
- ✅ Form validation with Yup schema
- ✅ Duplicate prevention
- ✅ Real-time feedback
- ✅ Mobile-responsive design

### Admin Dashboard
- ✅ Secure JWT authentication
- ✅ Real-time participant tracking
- ✅ Export to Excel/PDF
- ✅ Search and filtering
- ✅ Registration analytics

### Security Features
- ✅ Row Level Security (RLS) in Supabase
- ✅ HTTP-only cookies for admin sessions
- ✅ Environment variable protection
- ✅ API route protection
- ✅ Input validation and sanitization


## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

**Coders Nexus** - SDIT Open Source Community
- Dedicated to building innovative solutions for the tech community
- Fostering collaboration and learning in software development

## 📞 Support

For support and questions:
- 📧 Email: [contact@codersnexus.com]
- 🌐 Website: [codersnexus.com]
- 💬 Discord: [Join our community]

---

<div align="center">
  <p>Made with ❤️ by <strong>Coders Nexus</strong></p>
  <p>Empowering the next generation of developers</p>
</div>
