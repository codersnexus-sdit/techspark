import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

// SECURITY: Ensure JWT_SECRET is provided via environment variable
if (!process.env.JWT_SECRET) {
  throw new Error('JWT_SECRET environment variable is required')
}

const JWT_SECRET = process.env.JWT_SECRET

// Create Supabase client with service role key for admin operations
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!,
  {
    auth: {
      autoRefreshToken: false,
      persistSession: false
    }
  }
)

// Verify admin authentication
async function verifyAdminAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value
    if (!token) return false

    const decoded = jwt.verify(token, JWT_SECRET) as { email: string, role: string }
    return decoded.role === 'admin'
  } catch {
    return false
  }
}

export async function GET(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!await verifyAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    // Try to get statistics using the secure function first
    const { data: statsData, error: statsError } = await supabase
      .rpc('get_participant_stats')

    // If function exists and works, use it
    if (!statsError && statsData) {
      return NextResponse.json({ stats: statsData }, { status: 200 })
    }

    // Fallback to manual calculation if function doesn't exist or fails
    console.log('Using fallback stats calculation:', statsError?.message || 'Function not available')
    
    const { count: totalParticipants, error: countError } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true })

    if (countError) {
      console.error('Error getting participant count:', countError)
      throw new Error('Failed to fetch participant data')
    }

    const { data: collegeData, error: collegeError } = await supabase
      .from('participants')
      .select('college')

    const { data: departmentData, error: departmentError } = await supabase
      .from('participants')
      .select('department')

    // Get today's date in ISO format (YYYY-MM-DD)
    const todayStart = new Date()
    todayStart.setHours(0, 0, 0, 0)
    const todayISOString = todayStart.toISOString()

    const { count: todayRegistrations, error: todayError } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', todayISOString)

    // Get week start date
    const weekStart = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
    const weekISOString = weekStart.toISOString()

    const { count: weekRegistrations, error: weekError } = await supabase
      .from('participants')
      .select('*', { count: 'exact', head: true })
      .gte('created_at', weekISOString)

    // Calculate unique values
    const uniqueColleges = collegeError ? 0 : new Set(collegeData?.map((item: any) => item.college)).size
    const uniqueDepartments = departmentError ? 0 : new Set(departmentData?.map((item: any) => item.department)).size

    const stats = {
      total_participants: totalParticipants || 0,
      unique_colleges: uniqueColleges || 0,
      unique_departments: uniqueDepartments || 0,
      today_registrations: todayRegistrations || 0,
      week_registrations: weekRegistrations || 0
    }

    return NextResponse.json({ stats }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    )
  }
}