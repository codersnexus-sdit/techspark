import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

const JWT_SECRET = process.env.JWT_SECRET || 'your-secure-jwt-secret-change-in-production'

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
      const decoded = jwt.verify(token, JWT_SECRET) as { email: string, role: string }
      
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