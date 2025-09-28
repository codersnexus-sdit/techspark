'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import toast from 'react-hot-toast'
import Link from 'next/link'
import { createClient } from '@/lib/supabase'
import { RegistrationFormData } from '@/types'

// Input sanitization helper
const sanitizeInput = (input: string): string => {
  return input.trim().replace(/[<>"'&]/g, match => {
    const entities: { [key: string]: string } = {
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;',
      '&': '&amp;'
    }
    return entities[match] || match
  })
}

export default function RegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm<RegistrationFormData>()

  const onSubmit = async (data: RegistrationFormData) => {
    setIsSubmitting(true)

    try {
      // Sanitize all input data
      const sanitizedData = {
        first_name: sanitizeInput(data.firstName),
        last_name: sanitizeInput(data.lastName),
        email: sanitizeInput(data.email.toLowerCase()),
        phone: sanitizeInput(data.phone),
        college: sanitizeInput(data.college),
        year: data.year,
        department: sanitizeInput(data.department),
        usn: sanitizeInput(data.usn.toUpperCase())
      }

      const { error } = await supabase
        .from('participants')
        .insert([sanitizedData])

      if (error) {
        if (error.code === '23505') {
          toast.error('Email or phone number already registered!')
        } else {
          toast.error('Registration failed. Please try again.')
        }
        return
      }

      toast.success('Registration successful!')
      setIsSuccess(true)
      
      // Show success animation for 2 seconds then redirect
      setTimeout(() => {
        router.push('/thank-you')
      }, 2000)
    } catch (error) {
      toast.error('Something went wrong. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-950 px-4 relative pt-20 md:pt-24 lg:pt-0">
      {/* Logo in top corner - outside container */}
      <Link href="/" className="absolute top-2 left-3 md:top-4 md:left-4 lg:top-8 lg:left-8 z-10 group flex items-center space-x-3">
        <div className="relative">
          <img 
            src="/assets/logo/logo.png" 
            alt="Coders Nexus Logo" 
            className="w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 object-contain transition-transform duration-300 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-purple-700 opacity-0 group-hover:opacity-30 rounded-full transition-opacity duration-300"></div>
        </div>
        <div className="flex flex-col">
          <span className="text-white text-base md:text-lg lg:text-xl font-bold tracking-tight group-hover:text-purple-300 transition-colors duration-300">
            Coders Nexus
          </span>
          <span className="hidden lg:block text-gray-400 text-sm font-medium group-hover:text-purple-400 transition-colors duration-300">
            SDIT Open Source Community
          </span>
        </div>
      </Link>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-gray-900 rounded-2xl shadow-lg p-8 space-y-6 border border-gray-800"
      >
        <h2 className="text-2xl font-bold text-center text-white mb-6">
          Event Registration
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* First Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              First Name *
            </label>
            <input
              {...register('firstName', { required: 'First name is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
              placeholder="John"
            />
            {errors.firstName && (
              <p className="text-red-500 text-xs mt-1">{errors.firstName.message}</p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Last Name *
            </label>
            <input
              {...register('lastName', { required: 'Last name is required' })}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
              placeholder="Doe"
            />
            {errors.lastName && (
              <p className="text-red-500 text-xs mt-1">{errors.lastName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Email *
          </label>
          <input
            type="email"
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: 'Invalid email address'
              }
            })}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
            placeholder="john@gmail.com"
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            Phone *
          </label>
          <input
            type="tel"
            {...register('phone', {
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits'
              }
            })}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
            placeholder="9876543210"
          />
          {errors.phone && (
            <p className="text-red-500 text-xs mt-1">{errors.phone.message}</p>
          )}
        </div>

        {/* College */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            College *
          </label>
          <input
            {...register('college', { required: 'College is required' })}
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
            placeholder="Shree Devi Institute of Technology"
          />
          {errors.college && (
            <p className="text-red-500 text-xs mt-1">{errors.college.message}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Year */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Year *
            </label>
            <select
              {...register('year', {
                required: 'Year is required',
                valueAsNumber: true
              })}
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
            >
              <option value="" disabled>Select Year</option>
              <option value={1}>1st Year</option>
              <option value={2}>2nd Year</option>
              <option value={3}>3rd Year</option>
              <option value={4}>4th Year</option>
            </select>
            {errors.year && (
              <p className="text-red-500 text-xs mt-1">{errors.year.message}</p>
            )}
          </div>

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Department *
            </label>
            <input
              {...register('department', { required: 'Department is required' })}
              placeholder="e.g., Computer Science"
              className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
            />
            {errors.department && (
              <p className="text-red-500 text-xs mt-1">{errors.department.message}</p>
            )}
          </div>
        </div>

        {/* USN */}
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">
            USN *
          </label>
          <input
            {...register('usn', { required: 'USN is required' })}
            placeholder="e.g., 4SH21CS001"
            className="w-full px-4 py-2 rounded-lg border border-gray-700 bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#9929EA]"
          />
          {errors.usn && (
            <p className="text-red-500 text-xs mt-1">{errors.usn.message}</p>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isSubmitting || isSuccess}
          className={`w-full py-3 rounded-lg font-semibold text-lg shadow-md transition-all duration-500 disabled:cursor-not-allowed ${
            isSuccess 
              ? 'bg-green-500 text-white animate-pulse scale-105' 
              : isSubmitting
              ? 'bg-[#7a21bd] text-white opacity-50'
              : 'bg-[#9929EA] text-white hover:bg-[#7a21bd] hover:scale-105'
          }`}
        >
          {isSuccess ? '✓ Registration Successful!' : isSubmitting ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  )
}
