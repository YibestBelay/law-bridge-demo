'use client'

import { useState } from 'react'
import Layout from '@/components/shared/Layout'
import SettingsSidebar from '@/components/settings/SettingsSidebar'
import PersonalInformation from '@/components/settings/PersonalInformation'
import SecurityPrivacy from '@/components/settings/SecurityPrivacy'
import PaymentMethods from '@/components/settings/PaymentMethods'
import Notifications from '@/components/settings/Notifications'
import LanguageRegion from '@/components/settings/LanguageRegion'
import DeleteAccount from '@/components/settings/DeleteAccount'
import MobileNav from '@/components/settings/MobileNav'

type SettingsSection = 
  | 'personal'
  | 'security'
  | 'payment'
  | 'notifications'
  | 'language'
  | 'delete'

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState<SettingsSection>('personal')
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case 'personal':
        return <PersonalInformation />
      case 'security':
        return <SecurityPrivacy />
      case 'payment':
        return <PaymentMethods />
      case 'notifications':
        return <Notifications />
      case 'language':
        return <LanguageRegion />
      case 'delete':
        return <DeleteAccount />
      default:
        return <PersonalInformation />
    }
  }

  return (
    <Layout showNav={false}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex">
        {/* Desktop Sidebar */}
        <SettingsSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />

        {/* Main Content */}
        <main className="flex-1 lg:ml-64">
          {/* Mobile Header */}
          <div className="lg:hidden bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="p-2 hover:bg-gray-100 rounded-lg"
              aria-label="Toggle menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <h1 className="text-lg font-bold text-navy">Account Settings</h1>
          </div>

          <div className="p-4 md:p-6 lg:p-8 pb-20 lg:pb-8">
            <div className="max-w-4xl mx-auto">
              {renderContent()}
            </div>
          </div>
        </main>
      </div>

      {/* Mobile Navigation */}
      <MobileNav
        activeSection={activeSection}
        onSectionChange={setActiveSection}
      />
    </div>
    </Layout>
  )
}
