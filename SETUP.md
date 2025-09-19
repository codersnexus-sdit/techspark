# Techspark Project Setup

## Environment Variables Setup

To run this project, you need to set up Supabase environment variables. Follow these steps:

### 1. Create Environment File

Create a `.env.local` file in the root directory with the following content:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url_here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key_here
```

### 2. Get Supabase Credentials

1. Go to [Supabase](https://supabase.com) and create a new project
2. In your project dashboard, go to Settings > API
3. Copy the following values:
   - **Project URL** → `NEXT_PUBLIC_SUPABASE_URL`
   - **anon public** key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### 3. Database Setup

Create a table called `participants` with the following structure:

```sql
CREATE TABLE participants (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT UNIQUE NOT NULL,
  phone TEXT NOT NULL,
  college TEXT NOT NULL,
  year INTEGER NOT NULL,
  department TEXT NOT NULL,
  usn TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### 4. Run the Project

```bash
npm run dev
```

The project will now run without Supabase errors. The admin dashboard will show mock data until you configure Supabase properly.

## Admin Access

- **URL**: `http://localhost:3000/admin/login`
- **Email**: `admin@techevent.com`
- **Password**: `admin123`

## Features

- ✅ Modern dark theme UI matching main page
- ✅ Responsive design
- ✅ Real-time participant registration
- ✅ Excel/PDF export functionality
- ✅ Search and filter participants
- ✅ Admin authentication
- ✅ Glassmorphism effects and animations




