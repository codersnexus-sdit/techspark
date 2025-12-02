// Rate limiting utility for API protection
interface RateLimitStore {
  [key: string]: {
    count: number
    resetTime: number
  }
}

class RateLimit {
  private store: RateLimitStore = {}
  private windowMs: number
  private maxRequests: number

  constructor(windowMs: number = 15 * 60 * 1000, maxRequests: number = 100) {
    this.windowMs = windowMs
    this.maxRequests = maxRequests
  }

  isAllowed(identifier: string): boolean {
    const now = Date.now()
    const userLimit = this.store[identifier]

    if (!userLimit || now > userLimit.resetTime) {
      this.store[identifier] = {
        count: 1,
        resetTime: now + this.windowMs
      }
      return true
    }

    if (userLimit.count >= this.maxRequests) {
      return false
    }

    userLimit.count++
    return true
  }

  cleanup(): void {
    const now = Date.now()
    Object.keys(this.store).forEach(key => {
      if (now > this.store[key].resetTime) {
        delete this.store[key]
      }
    })
  }
}

// Rate limiters for different endpoints
export const registrationLimiter = new RateLimit(60 * 1000, 10) // 10 registrations per minute
export const generalLimiter = new RateLimit(15 * 60 * 1000, 100) // 100 requests per 15 minutes

// Clean up expired entries every 5 minutes
if (typeof window === 'undefined') {
  setInterval(() => {
    registrationLimiter.cleanup()
    generalLimiter.cleanup()
  }, 5 * 60 * 1000)
}

export const getRateLimitHeaders = (remaining: number, resetTime: number) => ({
  'X-RateLimit-Remaining': remaining.toString(),
  'X-RateLimit-Reset': resetTime.toString(),
})