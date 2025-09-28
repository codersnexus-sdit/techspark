import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import jwt from 'jsonwebtoken'

// Server-side admin credentials (NOT exposed to client)
// SECURITY: Validate environment variables at runtime, not build time
function getAdminCredentials() {
  const email = process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_PASSWORD
  
  if (!email || !password) {
    throw new Error('ADMIN_EMAIL and ADMIN_PASSWORD environment variables are required')
  }
  
  return { email, password }
}

function getJWTSecret() {
  const secret = process.env.JWT_SECRET
  
  if (!secret) {
    throw new Error('JWT_SECRET environment variable is required')
  }
  
  return secret
}

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json()
    
    // Get credentials at runtime
    const adminCredentials = getAdminCredentials()
    const jwtSecret = getJWTSecret()

    // Validate credentials
    if (email !== adminCredentials.email || password !== adminCredentials.password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      )
    }

    // Create JWT token
    const token = jwt.sign(
      { email, role: 'admin' },
      jwtSecret,
      { expiresIn: '24h' }
    )

    // Create response
    const response = NextResponse.json(
      { message: 'Login successful', email },
      { status: 200 }
    )

    // Set secure HTTP-only cookie
    response.cookies.set('admin-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 // 24 hours
    })

    return response
  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function DELETE() {
  // Simple logout endpoint
  const response = NextResponse.json(
    { message: 'Logged out successfully' },
    { status: 200 }
  )

  // Clear the admin token cookie
  response.cookies.set('admin-token', '', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: 0
  })

  return response
}