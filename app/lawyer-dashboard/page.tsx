'use client'

import { useState } from 'react'
import Layout from '@/components/shared/Layout'
import LawyerSidebar from '@/components/lawyer-dashboard/LawyerSidebar'
import DashboardHeader from '@/components/lawyer-dashboard/DashboardHeader'
import PerformanceMetrics from '@/components/lawyer-dashboard/PerformanceMetrics'
import ConsultationRequests from '@/components/lawyer-dashboard/ConsultationRequests'
import ActiveCasesTable from '@/components/lawyer-dashboard/ActiveCasesTable'
import EarningsOverview from '@/components/lawyer-dashboard/EarningsOverview'
import RecentMessages from '@/components/lawyer-dashboard/RecentMessages'
import CalendarWidget from '@/components/lawyer-dashboard/CalendarWidget'
import PerformanceInsights from '@/components/lawyer-dashboard/PerformanceInsights'
import NotificationsPanel from '@/components/lawyer-dashboard/NotificationsPanel'
import MobileNav from '@/components/lawyer-dashboard/MobileNav'

// Mock data
const mockLawyer = {
  name: 'Alemayehu Bekele',
  title: 'Dr.',
  avatar: 'AB',
  rating: 4.9,
  reviews: 248,
  verified: true
}

const mockMetrics = {
  totalEarnings: 45750,
  earningsTrend: 15,
  activeCases: 12,
  inProgress: 8,
  pending: 4,
  newRequests: 5,
  responseRate: 98,
  avgResponse: '1.5 hours',
  clientRating: 4.9,
  ratingTrend: 0.2
}

const mockRequests = [
  {
    id: '1',
    clientName: 'Sarah M.',
    clientInitials: 'SM',
    caseType: 'Family Law',
    summary: 'Need assistance with divorce proceedings and child custody arrangements. Looking for experienced family law attorney.',
    budget: 5000,
    urgency: 'urgent',
    posted: '2 hours ago'
  },
  {
    id: '2',
    clientName: 'John D.',
    clientInitials: 'JD',
    caseType: 'Property',
    summary: 'Property dispute with neighbor regarding boundary lines. Need legal consultation and representation.',
    budget: 3500,
    urgency: 'normal',
    posted: '5 hours ago'
  },
  {
    id: '3',
    clientName: 'Anonymous',
    clientInitials: 'AN',
    caseType: 'Contract',
    summary: 'Review of employment contract and negotiation of terms. Confidential matter.',
    budget: 2000,
    urgency: 'flexible',
    posted: '1 day ago'
  }
]

const mockCases = [
  {
    id: 'LC-2401',
    client: 'John D.',
    caseType: 'Family Law',
    status: 'Document Review',
    deadline: '3 days',
    hasDeadline: true
  },
  {
    id: 'LC-2398',
    client: 'Sarah M.',
    caseType: 'Property',
    status: 'Awaiting Client',
    deadline: '-',
    hasDeadline: false
  },
  {
    id: 'LC-2387',
    client: 'David T.',
    caseType: 'Contract',
    status: 'In Progress',
    deadline: '1 week',
    hasDeadline: true
  },
  {
    id: 'LC-2365',
    client: 'Mary A.',
    caseType: 'Criminal',
    status: 'Court Prep',
    deadline: '5 days',
    hasDeadline: true
  }
]

const mockMessages = [
  {
    id: '1',
    client: { name: 'John D.', initials: 'JD' },
    snippet: 'Thank you for the document review. I have a few questions...',
    timestamp: '30 minutes ago',
    unread: true
  },
  {
    id: '2',
    client: { name: 'Sarah M.', initials: 'SM' },
    snippet: 'Can we schedule a follow-up meeting this week?',
    timestamp: '2 hours ago',
    unread: true
  },
  {
    id: '3',
    client: { name: 'David T.', initials: 'DT' },
    snippet: 'The contract looks good. When can we finalize?',
    timestamp: '1 day ago',
    unread: false
  }
]

const mockNotifications = [
  {
    id: '1',
    type: 'request',
    message: 'New request from Sarah M.',
    timestamp: '2 hours ago',
    unread: true
  },
  {
    id: '2',
    type: 'message',
    message: 'Message from John D.',
    timestamp: '3 hours ago',
    unread: true
  },
  {
    id: '3',
    type: 'payment',
    message: 'Payment received: 2,500 ETB',
    timestamp: '5 hours ago',
    unread: false
  },
  {
    id: '4',
    type: 'review',
    message: 'New 5-star review from Mary A.',
    timestamp: '1 day ago',
    unread: false
  },
  {
    id: '5',
    type: 'reminder',
    message: 'Reminder: Court tomorrow at 9 AM',
    timestamp: '1 day ago',
    unread: false
  }
]

export default function LawyerDashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [available, setAvailable] = useState(true)

  return (
    <Layout showNav={false}>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Left Sidebar */}
        <LawyerSidebar
        lawyer={mockLawyer}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Dashboard */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <DashboardHeader
          lawyer={mockLawyer}
          available={available}
          onAvailableChange={setAvailable}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto">
            {/* Performance Metrics */}
            <PerformanceMetrics metrics={mockMetrics} />

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                <ConsultationRequests requests={mockRequests} />
                <ActiveCasesTable cases={mockCases} />
                <EarningsOverview />
                <RecentMessages messages={mockMessages} />
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                <CalendarWidget />
                <PerformanceInsights />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right Notifications Panel - Desktop Only */}
      <div className="hidden xl:block w-80 border-l border-gray-200 bg-white overflow-y-auto">
        <NotificationsPanel notifications={mockNotifications} />
      </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </Layout>
  )
}

