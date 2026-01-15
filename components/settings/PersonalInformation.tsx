'use client'

import { useState, useRef } from 'react'
import { Camera, X, Check } from 'lucide-react'

export default function PersonalInformation() {
  const [formData, setFormData] = useState({
    firstName: 'Kebede',
    lastName: 'Tsegaye',
    email: 'kebede@example.com',
    emailVerified: true,
    phone: '911234567',
    phoneVerified: false,
    dateOfBirth: '1990-01-15',
    gender: 'Male',
    addressLine1: '123 Main Street',
    addressLine2: 'Apt 4B',
    city: 'Addis Ababa',
    region: 'Addis Ababa',
    postalCode: '1000',
    country: 'Ethiopia',
    bio: 'Legal professional with experience in various areas of law.'
  })
  const [hasChanges, setHasChanges] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const [photoPreview, setPhotoPreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setHasChanges(true)
  }

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB')
        return
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string)
        setHasChanges(true)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSave = () => {
    // Simulate save
    setHasChanges(false)
    setShowSuccess(true)
    setTimeout(() => setShowSuccess(false), 3000)
  }

  const handleCancel = () => {
    // Reset form
    setHasChanges(false)
    setPhotoPreview(null)
  }

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Personal Information</h1>
        <p className="text-gray-600">Manage your personal details and profile</p>
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2">
          <Check className="text-green-600" size={20} />
          <span className="text-green-800 font-medium">Profile updated successfully</span>
        </div>
      )}

      {/* Profile Photo */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Profile Photo</h2>
        <div className="flex items-center gap-6">
          <div className="relative group">
            <div className="w-32 h-32 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-white text-4xl font-semibold overflow-hidden">
              {photoPreview ? (
                <img src={photoPreview} alt="Profile" className="w-full h-full object-cover" />
              ) : (
                'KT'
              )}
            </div>
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
              <Camera className="text-white" size={24} />
            </div>
          </div>
          <div className="flex-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png"
              onChange={handlePhotoChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current?.click()}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold mb-2"
            >
              Upload New Photo
            </button>
            {photoPreview && (
              <button
                onClick={() => {
                  setPhotoPreview(null)
                  setHasChanges(true)
                }}
                className="block text-sm text-red-600 hover:text-red-700"
              >
                Remove Photo
              </button>
            )}
            <p className="text-xs text-gray-500 mt-2">JPG, PNG (max 5MB)</p>
          </div>
        </div>
      </div>

      {/* Personal Details Form */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-6">Personal Details</h2>
        
        <div className="space-y-6">
          {/* Row 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                First Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.firstName}
                onChange={(e) => handleChange('firstName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Last Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={formData.lastName}
                onChange={(e) => handleChange('lastName', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Row 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Email <span className="text-red-500">*</span>
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {formData.emailVerified && (
                  <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded flex items-center gap-1">
                    <Check size={12} />
                    Verified
                  </span>
                )}
              </div>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 mt-1 inline-block">
                Change email
              </a>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Phone
              </label>
              <div className="flex items-center gap-2">
                <span className="px-3 py-3 bg-gray-100 border border-gray-300 rounded-l-lg">+251</span>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 border-l-0 rounded-r-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              {!formData.phoneVerified && (
                <button className="text-sm text-blue-600 hover:text-blue-700 mt-1">
                  Verify phone number
                </button>
              )}
            </div>
          </div>

          {/* Row 3 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Date of Birth
              </label>
              <input
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => handleChange('gender', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
                <option>Prefer not to say</option>
              </select>
            </div>
          </div>

          {/* Address Line 1 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Address Line 1
            </label>
            <input
              type="text"
              value={formData.addressLine1}
              onChange={(e) => handleChange('addressLine1', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Address Line 2 */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              Address Line 2 (Optional)
            </label>
            <input
              type="text"
              value={formData.addressLine2}
              onChange={(e) => handleChange('addressLine2', e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Row 4 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                City
              </label>
              <select
                value={formData.city}
                onChange={(e) => handleChange('city', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Addis Ababa</option>
                <option>Dire Dawa</option>
                <option>Mekelle</option>
                <option>Bahir Dar</option>
                <option>Hawassa</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Region/State
              </label>
              <select
                value={formData.region}
                onChange={(e) => handleChange('region', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Addis Ababa</option>
                <option>Oromia</option>
                <option>Amhara</option>
                <option>Tigray</option>
                <option>SNNPR</option>
              </select>
            </div>
          </div>

          {/* Row 5 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Postal Code
              </label>
              <input
                type="text"
                value={formData.postalCode}
                onChange={(e) => handleChange('postalCode', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-2">
                Country
              </label>
              <select
                value={formData.country}
                onChange={(e) => handleChange('country', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option>Ethiopia</option>
              </select>
            </div>
          </div>

          {/* Bio */}
          <div>
            <label className="block text-sm font-semibold text-gray-900 mb-2">
              About You (Optional)
            </label>
            <textarea
              value={formData.bio}
              onChange={(e) => handleChange('bio', e.target.value)}
              maxLength={500}
              rows={4}
              placeholder="Tell us a bit about yourself..."
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <div className="flex justify-between mt-1">
              <p className="text-xs text-gray-500">Optional</p>
              <p className="text-xs text-gray-500">{formData.bio.length}/500</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-4 mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handleCancel}
            disabled={!hasChanges}
            className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-gray-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={!hasChanges}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  )
}

