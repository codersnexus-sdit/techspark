import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// SECURITY: Get JWT_SECRET at runtime to avoid build-time errors
function getJWTSecret() {
  if (!process.env.JWT_SECRET) {
    throw new Error('JWT_SECRET environment variable is required')
  }
  return process.env.JWT_SECRET
}

export async function GET(request: NextRequest) {
  try {
    const token = request.cookies.get('admin-token')?.value

    if (!token) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }

    // Verify JWT token
    try {
      const jwtSecret = getJWTSecret()
      const decoded = jwt.verify(token, jwtSecret) as { email: string, role: string }
      
      if (decoded.role !== 'admin') {
        return NextResponse.json(
          { authenticated: false },
          { status: 401 }
        )
      }

      return NextResponse.json(
        { authenticated: true, email: decoded.email },
        { status: 200 }
      )
    } catch (jwtError) {
      return NextResponse.json(
        { authenticated: false },
        { status: 401 }
      )
    }
  } catch (error) {
    return NextResponse.json(
      { authenticated: false },
      { status: 500 }
    )
  }
}