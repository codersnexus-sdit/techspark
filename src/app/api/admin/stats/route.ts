import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret-change-in-production'

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

    // Get statistics using the secure function
    const { data: statsData, error: statsError } = await supabase
      .rpc('get_participant_stats')

    if (statsError) {
      console.error('Stats function error:', statsError)
      // Fallback to manual calculation if function doesn't exist
      const { count: totalParticipants } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true })

      const { data: collegeData } = await supabase
        .from('participants')
        .select('college')

      const { data: departmentData } = await supabase
        .from('participants')
        .select('department')

      const { count: todayRegistrations } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date().toISOString().split('T')[0])

      const { count: weekRegistrations } = await supabase
        .from('participants')
        .select('*', { count: 'exact', head: true })
        .gte('created_at', new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString())

      const uniqueColleges = new Set(collegeData?.map((item: any) => item.college)).size
      const uniqueDepartments = new Set(departmentData?.map((item: any) => item.department)).size

      return NextResponse.json({
        stats: {
          total_participants: totalParticipants || 0,
          unique_colleges: uniqueColleges || 0,
          unique_departments: uniqueDepartments || 0,
          today_registrations: todayRegistrations || 0,
          week_registrations: weekRegistrations || 0
        }
      }, { status: 200 })
    }

    return NextResponse.json({ stats: statsData }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}