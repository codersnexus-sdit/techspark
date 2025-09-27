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

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)


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
