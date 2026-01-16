'use client'

import { useState } from 'react'
import Layout from '@/components/shared/Layout'
import DashboardSidebar from '@/components/dashboard/DashboardSidebar'
import DashboardHeader from '@/components/dashboard/DashboardHeader'
import OverviewCards from '@/components/dashboard/OverviewCards'
import QuickActions from '@/components/dashboard/QuickActions'
import ActiveCases from '@/components/dashboard/ActiveCases'
import RecentMessages from '@/components/dashboard/RecentMessages'
import UpcomingAppointments from '@/components/dashboard/UpcomingAppointments'
import ActivityTimeline from '@/components/dashboard/ActivityTimeline'
import RecommendedLawyers from '@/components/dashboard/RecommendedLawyers'
import HelpfulResources from '@/components/dashboard/HelpfulResources'
import MobileNav from '@/components/dashboard/MobileNav'

// Mock data
const mockUser = {
  name: 'Kebede Tsegaye',
  avatar: 'KT',
  email: 'kebede@example.com'
}

const mockOverview = {
  activeCases: 3,
  pendingConsultations: 2,
  totalSpent: 12500,
  aiQueries: 47
}

const mockCases = [
  {
    id: 'LC-2401',
    lawyer: { name: 'Abebe Bekele', photo: '👨‍💼' },
    caseType: 'Family Law',
    status: 'In Progress',
    lastUpdate: '2 days ago'
  },
  {
    id: 'LC-2387',
    lawyer: { name: 'Sara Haile', photo: '👩‍💼' },
    caseType: 'Property',
    status: 'Pending Review',
    lastUpdate: '5 days ago'
  },
  {
    id: 'LC-2365',
    lawyer: { name: 'David Tesfaye', photo: '👨‍💼' },
    caseType: 'Contract',
    status: 'Waiting Payment',
    lastUpdate: '1 week ago'
  }
]

const mockMessages = [
  {
    id: '1',
    lawyer: { name: 'Abebe Bekele', photo: '👨‍💼' },
    snippet: 'I have reviewed your case documents and would like to discuss...',
    timestamp: '2 hours ago',
    unread: true
  },
  {
    id: '2',
    lawyer: { name: 'Sara Haile', photo: '👩‍💼' },
    snippet: 'The property documents are ready for review. Please let me know...',
    timestamp: '1 day ago',
    unread: true
  },
  {
    id: '3',
    lawyer: { name: 'David Tesfaye', photo: '👨‍💼' },
    snippet: 'Thank you for your payment. I will begin work on your contract...',
    timestamp: '3 days ago',
    unread: false
  }
]

const mockAppointments = [
  {
    id: '1',
    date: '2024-01-20',
    time: '10:00 AM',
    lawyer: { name: 'Abebe Bekele', photo: '👨‍💼' },
    caseType: 'Family Law Consultation',
    meetingLink: 'https://meet.lawbridge.et/abc123'
  },
  {
    id: '2',
    date: '2024-01-22',
    time: '2:00 PM',
    lawyer: { name: 'Sara Haile', photo: '👩‍💼' },
    caseType: 'Property Review',
    meetingLink: 'https://meet.lawbridge.et/def456'
  }
]

const mockActivity = [
  {
    id: '1',
    type: 'hire',
    description: 'You hired Abebe Bekele for family law case',
    timestamp: '2 hours ago',
    icon: '👤'
  },
  {
    id: '2',
    type: 'message',
    description: 'Sara Haile sent you a message',
    timestamp: '1 day ago',
    icon: '💬'
  },
  {
    id: '3',
    type: 'payment',
    description: 'Payment confirmed for Case #LC-2401',
    timestamp: '2 days ago',
    icon: '💳'
  },
  {
    id: '4',
    type: 'case',
    description: 'Case #LC-2387 status updated to Pending Review',
    timestamp: '5 days ago',
    icon: '📄'
  },
  {
    id: '5',
    type: 'consultation',
    description: 'Consultation scheduled with David Tesfaye',
    timestamp: '1 week ago',
    icon: '📅'
  }
]

const mockRecommendedLawyers = [
  {
    id: '1',
    name: 'Meron Tadesse',
    photo: '👩‍💼',
    specialization: 'Family Law',
    rating: 4.8
  },
  {
    id: '2',
    name: 'Yonas Gebremariam',
    photo: '👨‍💼',
    specialization: 'Property Law',
    rating: 4.9
  },
  {
    id: '3',
    name: 'Selamawit Hailu',
    photo: '👩‍💼',
    specialization: 'Contract Law',
    rating: 4.7
  }
]

export default function DashboardPage() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <Layout>
      <div className="flex h-screen bg-gray-50 overflow-hidden">
        {/* Desktop Sidebar */}
        <DashboardSidebar
        user={mockUser}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Dashboard Header */}
        <DashboardHeader
          userName={mockUser.name}
          onMenuClick={() => setSidebarOpen(!sidebarOpen)}
        />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 pb-20 lg:pb-6">
          <div className="max-w-7xl mx-auto space-y-6">
            {/* Overview Cards */}
            <OverviewCards data={mockOverview} />

            {/* Quick Actions */}
            <QuickActions />

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column - 2/3 width */}
              <div className="lg:col-span-2 space-y-6">
                <ActiveCases cases={mockCases} />
                <RecentMessages messages={mockMessages} />
                <UpcomingAppointments appointments={mockAppointments} />
                <ActivityTimeline activities={mockActivity} />
              </div>

              {/* Right Column - 1/3 width */}
              <div className="space-y-6">
                <RecommendedLawyers lawyers={mockRecommendedLawyers} />
                <HelpfulResources />
              </div>
            </div>
          </div>
        </div>
      </div>

        {/* Mobile Navigation */}
        <MobileNav />
      </div>
    </Layout>
  )
}

