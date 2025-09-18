'use client'

import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase'
import { Participant } from '@/types'
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
        (payload) => {
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

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut()
      toast.success('Logged out successfully')
      router.push('/admin/login')
    } catch (error) {
      toast.error('Error logging out')
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
      
      // Set column widths
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
              }
              h1 { 
                color: #333;
                margin-bottom: 10px;
              }
              .info {
                margin-bottom: 20px;
                color: #666;
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
              .footer {
                margin-top: 30px;
                text-align: center;
                color: #666;
                font-size: 10px;
              }
            </style>
          </head>
          <body>
            <div class="header">
              <h1>Event Participants Report</h1>
            </div>
            <div class="info">
              <p><strong>Total Participants:</strong> ${participants.length}</p>
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
                ${participants.map(p => `
                  <tr>
                    <td>${p.first_name} ${p.last_name}</td>
                    <td>${p.email}</td>
                    <td>${p.phone}</td>
                    <td>${p.college}</td>
                    <td>${p.year}</td>
                    <td>${p.department}</td>
                    <td>${p.usn}</td>
                  </tr>
                `).join('')}
              </tbody>
            </table>
            <div class="footer">
              <p>This report was generated automatically from the event registration system.</p>
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
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <p className="text-gray-600 mt-1">Manage event registrations</p>
            </div>
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-2 rounded-md hover:bg-red-700 transition-colors duration-200 font-medium"
            >
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Total Participants
            </h3>
            <p className="text-3xl font-bold text-blue-600 mt-2">{participants.length}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Today's Registrations
            </h3>
            <p className="text-3xl font-bold text-green-600 mt-2">{todayRegistrations}</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Unique Colleges
            </h3>
            <p className="text-3xl font-bold text-purple-600 mt-2">
              {new Set(participants.map(p => p.college)).size}
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wide">
              Export Options
            </h3>
            <div className="flex space-x-2 mt-3">
              <button
                onClick={exportToExcel}
                disabled={participants.length === 0}
                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                Excel
              </button>
              <button
                onClick={exportToPDF}
                disabled={participants.length === 0}
                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                PDF
              </button>
            </div>
          </div>
        </div>

        {/* Search and Table */}
        <div className="bg-white rounded-lg shadow-sm border">
          <div className="p-6 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">Registered Participants</h2>
                <p className="text-sm text-gray-600 mt-1">
                  {filteredParticipants.length} of {participants.length} participants
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  placeholder="Search by name, email, college, or USN..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full sm:w-80"
                />
                {searchTerm && (
                  <button
                    onClick={() => setSearchTerm('')}
                    className="px-3 py-2 text-gray-400 hover:text-gray-600"
                  >
                    Clear
                  </button>
                )}
              </div>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Email
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Phone
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    College
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Year/Dept
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    USN
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Registered
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredParticipants.map((participant) => (
                  <tr key={participant.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {participant.first_name} {participant.last_name}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{participant.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{participant.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs truncate" title={participant.college}>
                        {participant.college}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        Year {participant.year}
                      </div>
                      <div className="text-sm text-gray-500">
                        {participant.department}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-mono">{participant.usn}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">
                        {new Date(participant.created_at!).toLocaleDateString()}
                      </div>
                      <div className="text-xs text-gray-500">
                        {new Date(participant.created_at!).toLocaleTimeString()}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredParticipants.length === 0 && (
            <div className="text-center py-12">
              <div className="text-gray-400 mb-2">
                <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <p className="text-gray-500 text-lg">
                {searchTerm ? 'No participants found matching your search' : 'No participants registered yet'}
              </p>
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="mt-2 text-blue-600 hover:text-blue-800 text-sm"
                >
                  Clear search to see all participants
                </button>
              )}
            </div>
          )}

          {/* Pagination info */}
          {filteredParticipants.length > 0 && (
            <div className="px-6 py-3 border-t border-gray-200 bg-gray-50">
              <div className="text-sm text-gray-700">
                Showing {filteredParticipants.length} participant{filteredParticipants.length !== 1 ? 's' : ''}
                {searchTerm && ` matching "${searchTerm}"`}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}