'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Participant } from '@/types'
import type { RealtimePostgresInsertPayload } from '@supabase/supabase-js'
import * as XLSX from 'xlsx'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export default function AdminDashboard() {
  const [participants, setParticipants] = useState<Participant[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const supabase = createClient()
  const router = useRouter()

  useEffect(() => {
    fetchParticipants()
    
    // Subscribe to real-time changes
    const channel = supabase
      .channel('participants-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'participants'
        },
        (payload: RealtimePostgresInsertPayload<Participant>) => {
          setParticipants(prev => [payload.new as Participant, ...prev])
          toast.success('New participant registered!')
        }
      )
      .subscribe()

    return () => {
      supabase.removeChannel(channel)
    }
  }, [supabase])

  const fetchParticipants = async () => {
    try {
      const { data, error } = await supabase
        .from('participants')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      setParticipants(data || [])
    } catch (error) {
      console.error('Error fetching participants:', error)
      toast.error('Failed to fetch participants')
    } finally {
      setLoading(false)
    }
  }

  // Updated handleLogout function to clear session storage
  const handleLogout = async () => {
    try {
      // Clear admin session from sessionStorage
      sessionStorage.removeItem('adminAuthenticated')
      sessionStorage.removeItem('adminEmail')
      
      // Sign out from Supabase
      await supabase.auth.signOut()
      
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Error logging out')
      console.error('Logout error:', error)
    }
  }

  const exportToExcel = () => {
    if (participants.length === 0) {
      toast.error('No participants to export')
      return
    }

    try {
      const exportData = participants.map(p => ({
        'First Name': p.first_name,
        'Last Name': p.last_name,
        'Email': p.email,
        'Phone': p.phone,
        'College': p.college,
        'Year': p.year,
        'Department': p.department,
        'USN': p.usn,
        'Registration Date': new Date(p.created_at!).toLocaleDateString()
      }))

      const ws = XLSX.utils.json_to_sheet(exportData)
      const wb = XLSX.utils.book_new()
      XLSX.utils.book_append_sheet(wb, ws, 'Participants')
      
      // Set column widths for better formatting
      const colWidths = [
        { wch: 15 }, // First Name
        { wch: 15 }, // Last Name
        { wch: 25 }, // Email
        { wch: 15 }, // Phone
        { wch: 30 }, // College
        { wch: 8 },  // Year
        { wch: 20 }, // Department
        { wch: 15 }, // USN
        { wch: 15 }  // Registration Date
      ]
      ws['!cols'] = colWidths

      XLSX.writeFile(wb, `event-participants-${new Date().toISOString().split('T')[0]}.xlsx`)
      toast.success('Excel file downloaded successfully!')
    } catch (error) {
      toast.error('Failed to export Excel file')
      console.error('Excel export error:', error)
    }
  }

  const exportToPDF = () => {
    if (participants.length === 0) {
      toast.error('No participants to export')
      return
    }

    try {
      const printWindow = window.open('', '', 'height=600,width=800')
      if (!printWindow) {
        toast.error('Pop-up blocked. Please allow pop-ups for PDF export.')
        return
      }

      const html = `
        <!DOCTYPE html>
        <html>
          <head>
            <title>Event Participants Report</title>
            <style>
              @page { margin: 20px; }
              body { 
                font-family: Arial, sans-serif; 
                margin: 0;
                padding: 20px;
                font-size: 12px;
              }
              .header {
                text-align: center;
                margin-bottom: 30px;
                border-bottom: 2px solid #333;
                padding-bottom: 15px;
              }
              h1 { 
                color: #333;
                margin-bottom: 10px;
                font-size: 24px;
              }
              .info {
                margin-bottom: 20px;
                color: #666;
                background-color: #f5f5f5;
                padding: 10px;
                border-radius: 5px;
              }
              table { 
                width: 100%; 
                border-collapse: collapse; 
                margin-top: 20px;
                font-size: 11px;
              }
              th, td { 
                border: 1px solid #ddd; 
                padding: 6px 8px; 
                text-align: left;
                word-wrap: break-word;
              }
              th { 
                background-color: #f5f5f5;
                font-weight: bold;
                color: #333;
              }
              tr:nth-child(even) {
                background-color: #f9f9f9;
              }
              tr:hover {
                background-color: #f0f8ff;
              }
              .footer {
                margin-top: 30px;
                text-align: center;
                color: #666;
                font-size: 10px;
                border-top: 1px solid #ddd;
                padding-top: 15px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Event Participants Report</h1>
              <p>TechEvent 2024 Registration Data</p>
            </div>
            <div class="info">
              <p><strong>Total Participants:</strong> ${participants.length}</p>
              <p><strong>Unique Colleges:</strong> ${new Set(participants.map(p => p.college)).size}</p>
              <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}</p>
            </div>
            <table>
              <thead>
                <tr>
                  <th style="width: 15%;">Name</th>
                  <th style="width: 20%;">Email</th>
                  <th style="width: 12%;">Phone</th>
                  <th style="width: 25%;">College</th>
                  <th style="width: 8%;">Year</th>
                  <th style="width: 15%;">Department</th>
                  <th style="width: 12%;">USN</th>
                </tr>
              </thead>
              <tbody>
                ${participants.map((p, index) => `
                  <tr>
                    <td>${p.first_name} ${p.last_name}</td>
                    <td>${p.email}</td>
                    <td>${p.phone}</td>
                    <td>${p.college}</td>
                    <td>Year ${p.year}</td>
                    <td>${p.department}</td>
                    <td>${p.usn}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="footer">
              <p>This report was generated automatically from the TechEvent 2024 registration system.</p>
              <p>For any queries, contact the event organizers.</p>
            </div>
          </body>
        </html>
      `

      printWindow.document.write(html)
      printWindow.document.close()
      
      // Wait for content to load before printing
      printWindow.onload = () => {
        printWindow.print()
        // Close the window after printing
        printWindow.onafterprint = () => {
          printWindow.close()
        }
      }
      
      toast.success('PDF export initiated!')
    } catch (error) {
      toast.error('Failed to export PDF')
      console.error('PDF export error:', error)
    }
  }

  const filteredParticipants = participants.filter(p =>
    `${p.first_name} ${p.last_name}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.department.toLowerCase().includes(searchTerm.toLowerCase()) ||
    p.usn.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const todayRegistrations = participants.filter(p => 
    new Date(p.created_at!).toDateString() === new Date().toDateString()
  ).length

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/20 via-black to-purple-600/20"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
          <p className="mt-4 text-gray-300">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900/10 via-black to-purple-600/10"></div>
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      
      {/* Header */}
      <div className="relative z-10 bg-gray-900/80 backdrop-blur-md border-b border-gray-700/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <img 
                src="/logo/nexus.svg" 
                alt="Coders Nexus Logo" 
                className="w-10 h-10 object-contain"
              />
              <div>
                <h1 className="text-3xl font-bold text-white">Admin Dashboard</h1>
                <p className="text-gray-300 mt-1">Manage event registrations</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-300">
                Welcome, Admin
              </div>
              <button
                onClick={handleLogout}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-6 py-2 rounded-lg hover:from-red-700 hover:to-red-800 transition-all duration-200 font-medium shadow-lg hover:shadow-red-500/25"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Total Participants
            </h3>
            <p className="text-3xl font-bold text-blue-400 mt-2">{participants.length}</p>
            <p className="text-xs text-gray-500 mt-1">All time registrations</p>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Today's Registrations
            </h3>
            <p className="text-3xl font-bold text-green-400 mt-2">{todayRegistrations}</p>
            <p className="text-xs text-gray-500 mt-1">New registrations today</p>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Unique Colleges
            </h3>
            <p className="text-3xl font-bold text-purple-400 mt-2">
              {new Set(participants.map(p => p.college)).size}
            </p>
            <p className="text-xs text-gray-500 mt-1">Different institutions</p>
          </div>
          
          <div className="bg-gray-900/80 backdrop-blur-md p-6 rounded-xl border border-gray-700/50 shadow-lg">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wide">
              Export Options
            </h3>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={exportToExcel}
                disabled={participants.length === 0}
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-3 py-1 rounded-lg text-sm hover:from-green-700 hover:to-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-green-500/25"
                title="Download Excel file"
              >
                📊 Excel
              </button>
              <button
                onClick={exportToPDF}
                disabled={participants.length === 0}
                className="bg-gradient-to-r from-red-600 to-red-700 text-white px-3 py-1 rounded-lg text-sm hover:from-red-700 hover:to-red-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg hover:shadow-red-500/25"
                title="Print/Save as PDF"
              >
                📄 PDF
              </button>
            </div>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-gray-900/80 backdrop-blur-md rounded-xl border border-gray-700/50 shadow-lg">
          <div className="p-6 border-b border-gray-700/50">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-white">Registered Participants</h2>
                <p className="text-sm text-gray-300 mt-1">
                  {filteredParticipants.length} of {participants.length} participants
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search by name, email, college, or USN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 bg-gray-800/50 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent w-full sm:w-80 transition-all duration-200"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-3 py-2 text-gray-400 hover:text-gray-200 rounded-lg hover:bg-gray-700/50 transition-all duration-200"
                    title="Clear search"
                  >
                    ✕
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700/50">
              <thead className="bg-gray-800/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    #
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    College
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Year/Dept
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    USN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="bg-gray-900/50 divide-y divide-gray-700/50">
                {filteredParticipants.map((participant, index) => (
                  <tr key={participant.id} className="hover:bg-gray-800/50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-white">
                        {participant.first_name} {participant.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{participant.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">{participant.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-300 max-w-xs truncate" title={participant.college}>
                        {participant.college}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        Year {participant.year}
                      </div>
                      <div className="text-sm text-gray-500">
                        {participant.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300 font-mono bg-gray-800/50 px-2 py-1 rounded border border-gray-600">
                        {participant.usn}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-300">
                        {new Date(participant.created_at!).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(participant.created_at!).toLocaleTimeString([], { 
                          hour: '2-digit', 
                          minute: '2-digit' 
                        })}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-500 mb-4">
                <svg className="mx-auto h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-white mb-2">
                {searchTerm ? 'No participants found' : 'No participants registered yet'}
              </h3>
              <p className="text-gray-400">
                {searchTerm 
                  ? 'Try adjusting your search terms or clear the search to see all participants.' 
                  : 'Participants will appear here once they start registering for the event.'
                }
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-lg hover:shadow-purple-500/25"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          {/* Pagination info */}
          {filteredParticipants.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-700/50 bg-gray-800/50">
              <div className="flex justify-between items-center text-sm text-gray-300">
                <div>
                  Showing {filteredParticipants.length} participant{filteredParticipants.length !== 1 ? 's' : ''}
                  {searchTerm && ` matching "${searchTerm}"`}
                </div>
                <div className="text-gray-500">
                  Last updated: {new Date().toLocaleTimeString()}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}