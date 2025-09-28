import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import jwt from 'jsonwebtoken'

// SECURITY: Get JWT_SECRET at runtime to avoid build-time errors
function getJWTSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required')
  }
  return process.env.JWT_SECRET
}

// Create Supabase client at runtime to avoid build-time errors
function getSupabaseServiceClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  
  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required')
  }
  
  return createClient(
    supabaseUrl,
    supabaseServiceKey,
    {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    }
  )
}

// Verify admin authentication
async function verifyAdminAuth(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value
    if (!token) return false

    const jwtSecret = getJWTSecret()
    const decoded = jwt.verify(token, jwtSecret) as { email: string, role: string }
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

    // Fetch participants with service role permissions
    const supabase = getSupabaseServiceClient()
    const { data: participants, error } = await supabase
      .from('participants')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to fetch participants' },
        { status: 500 }
      )
    }

    return NextResponse.json({ participants }, { status: 200 })
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE(request: NextRequest) {
  try {
    // Verify admin authentication
    if (!await verifyAdminAuth(request)) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const { searchParams } = new URL(request.url)
    const participantId = searchParams.get('id')

    if (!participantId) {
      return NextResponse.json(
        { error: 'Participant ID is required' },
        { status: 400 }
      )
    }

    // Delete participant using service role
    const supabase = getSupabaseServiceClient()
    const { error } = await supabase
      .from('participants')
      .delete()
      .eq('id', participantId)

    if (error) {
      console.error('Database error:', error)
      return NextResponse.json(
        { error: 'Failed to delete participant' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { message: 'Participant deleted successfully' },
      { status: 200 }
    )
  } catch (error) {
    console.error('API error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}