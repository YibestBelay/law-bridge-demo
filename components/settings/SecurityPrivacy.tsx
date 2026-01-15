'use client'

import { useState } from 'react'
import { Eye, EyeOff, Check, X, Monitor, Smartphone } from 'lucide-react'

export default function SecurityPrivacy() {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false)
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  })

  const checkPasswordStrength = (pwd: string) => {
    let strength = 0
    if (pwd.length >= 8) strength++
    if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++
    if (/\d/.test(pwd)) strength++
    if (/[^a-zA-Z\d]/.test(pwd)) strength++
    return strength
  }

  const passwordStrength = checkPasswordStrength(password.new)
  const strengthLabels = ['Weak', 'Medium', 'Strong', 'Very Strong']
  const strengthColors = ['bg-red-500', 'bg-yellow-500', 'bg-blue-500', 'bg-green-500']

  const activeSessions = [
    {
      id: '1',
      device: 'Chrome on Windows',
      icon: Monitor,
      location: 'Addis Ababa, Ethiopia',
      ip: '196.190.x.x',
      lastActive: 'Active now',
      isActive: true
    },
    {
      id: '2',
      device: 'Safari on iPhone',
      icon: Smartphone,
      location: 'Addis Ababa, Ethiopia',
      ip: '196.190.x.x',
      lastActive: '2 hours ago',
      isActive: false
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Security & Privacy</h1>
        <p className="text-gray-600">Keep your account secure</p>
      </div>

      <div className="space-y-6">
        {/* Password Section */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Password</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Current Password
              </label>
              <div className="relative">
                <input
                  type={showCurrentPassword ? 'text' : 'password'}
                  value={password.current}
                  onChange={(e) => setPassword({ ...password, current: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <button
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showCurrentPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                New Password
              </label>
              <div className="relative">
                <input
                  type={showNewPassword ? 'text' : 'password'}
                  value={password.new}
                  onChange={(e) => setPassword({ ...password, new: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <button
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {password.new && (
                <div className="mt-2">
                  <div className="flex gap-1 mb-2">
                    {[0, 1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-2 flex-1 rounded ${
                          level < passwordStrength
                            ? strengthColors[passwordStrength - 1]
                            : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                  <p className={`text-sm font-medium ${
                    passwordStrength <= 1 ? 'text-red-600' :
                    passwordStrength === 2 ? 'text-yellow-600' :
                    'text-green-600'
                  }`}>
                    {passwordStrength > 0 ? strengthLabels[passwordStrength - 1] : 'Weak'}
                  </p>
                  <div className="mt-2 space-y-1 text-sm">
                    <div className={`flex items-center gap-2 ${password.new.length >= 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      {password.new.length >= 8 ? <Check size={16} /> : <X size={16} />}
                      <span>At least 8 characters</span>
                    </div>
                    <div className={`flex items-center gap-2 ${/[a-z]/.test(password.new) && /[A-Z]/.test(password.new) ? 'text-green-600' : 'text-gray-500'}`}>
                      {/[a-z]/.test(password.new) && /[A-Z]/.test(password.new) ? <Check size={16} /> : <X size={16} />}
                      <span>Contains uppercase and lowercase</span>
                    </div>
                    <div className={`flex items-center gap-2 ${/\d/.test(password.new) ? 'text-green-600' : 'text-gray-500'}`}>
                      {/\d/.test(password.new) ? <Check size={16} /> : <X size={16} />}
                      <span>Contains numbers</span>
                    </div>
                    <div className={`flex items-center gap-2 ${/[^a-zA-Z\d]/.test(password.new) ? 'text-green-600' : 'text-gray-500'}`}>
                      {/[^a-zA-Z\d]/.test(password.new) ? <Check size={16} /> : <X size={16} />}
                      <span>Contains special characters</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Confirm New Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={password.confirm}
                  onChange={(e) => setPassword({ ...password, confirm: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-12"
                />
                <button
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {password.confirm && password.new !== password.confirm && (
                <p className="text-sm text-red-600 mt-1">Passwords do not match</p>
              )}
            </div>
            <div className="flex items-center justify-between">
              <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
                Update Password
              </button>
              <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
                Forgot Password?
              </a>
            </div>
          </div>
        </div>

        {/* Two-Factor Authentication */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Two-Factor Authentication (2FA)</h2>
              <p className="text-sm text-gray-600 mt-1">Add an extra layer of security to your account</p>
            </div>
            <div className="flex items-center gap-3">
              <span className={`text-sm font-medium ${twoFactorEnabled ? 'text-green-600' : 'text-gray-600'}`}>
                {twoFactorEnabled ? 'Enabled' : 'Currently Disabled'}
              </span>
              <label className="relative inline-flex items-center cursor-pointer">
                <input
                  type="checkbox"
                  checked={twoFactorEnabled}
                  onChange={(e) => setTwoFactorEnabled(e.target.checked)}
                  className="sr-only peer"
                />
                <div className="w-14 h-7 bg-gray-300 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-1 after:left-1 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-500"></div>
              </label>
            </div>
          </div>
          {twoFactorEnabled && (
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800 flex items-center gap-2">
                <Check size={16} />
                Authenticator app connected ✓
              </p>
            </div>
          )}
        </div>

        {/* Active Sessions */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Active Sessions</h2>
          <p className="text-sm text-gray-600 mb-4">Manage devices where you're currently logged in</p>
          <div className="space-y-4">
            {activeSessions.map((session) => {
              const Icon = session.icon
              return (
                <div key={session.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-gray-100 rounded-lg">
                      <Icon className="text-gray-600" size={24} />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">{session.device}</p>
                      <p className="text-sm text-gray-600">{session.location}</p>
                      <p className="text-xs text-gray-500">IP: {session.ip}</p>
                      <p className={`text-xs mt-1 ${session.isActive ? 'text-green-600 font-medium' : 'text-gray-500'}`}>
                        {session.lastActive}
                      </p>
                    </div>
                  </div>
                  <button className="px-4 py-2 border border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
                    End Session
                  </button>
                </div>
              )
            })}
          </div>
          <button className="mt-4 px-4 py-2 border-2 border-red-300 text-red-600 rounded-lg font-semibold hover:bg-red-50 transition-colors">
            End All Other Sessions
          </button>
        </div>

        {/* Privacy Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Privacy</h2>
          <div className="space-y-3">
            {[
              { label: 'Allow lawyers to see my full name', default: true },
              { label: 'Show my profile in search results', default: true },
              { label: 'Allow LawBridge to use my data for service improvement', default: false },
              { label: 'Share anonymous usage statistics', default: false }
            ].map((setting, index) => (
              <label key={index} className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  defaultChecked={setting.default}
                  className="mt-1 w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                />
                <div className="flex-1">
                  <span className="text-gray-700">{setting.label}</span>
                  <button className="ml-2 text-gray-400 hover:text-gray-600">?</button>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Data Download */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-2">Your Data</h2>
          <p className="text-sm text-gray-600 mb-4">Download a copy of your account data</p>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Request Data Download
          </button>
          <p className="text-xs text-gray-500 mt-2">We'll email you a link within 48 hours</p>
        </div>

        {/* Save Button */}
        <div className="flex justify-end">
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
            Save Security Settings
          </button>
        </div>
      </div>
    </div>
  )
}

