'use client'

import { useState } from 'react'
import { CreditCard, Smartphone, Building2, Edit, Trash2, Download } from 'lucide-react'

export default function PaymentMethods() {
  const [showAddModal, setShowAddModal] = useState(false)

  const paymentMethods = [
    {
      id: '1',
      type: 'card',
      brand: 'Visa',
      number: '4242',
      expiry: '12/25',
      isDefault: true
    },
    {
      id: '2',
      type: 'mobile',
      provider: 'Telebirr',
      phone: '+251 91x xxx xxx',
      verified: true
    },
    {
      id: '3',
      type: 'bank',
      bank: 'Commercial Bank of Ethiopia',
      account: '5678'
    }
  ]

  const transactions = [
    {
      date: 'Nov 2, 2024',
      description: 'Family Law Consultation',
      lawyer: 'Abebe B.',
      amount: 2500,
      status: 'Paid'
    },
    {
      date: 'Oct 28, 2024',
      description: 'Property Case - Initial',
      lawyer: 'Sara H.',
      amount: 5000,
      status: 'Paid'
    },
    {
      date: 'Oct 15, 2024',
      description: 'Contract Review',
      lawyer: 'David T.',
      amount: 1800,
      status: 'Refunded'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-navy mb-2">Payment Methods</h1>
        <p className="text-gray-600">Manage how you pay for legal services</p>
      </div>

      {/* Saved Payment Methods */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Saved Payment Methods</h2>
        {paymentMethods.length === 0 ? (
          <div className="text-center py-12">
            <CreditCard className="mx-auto text-gray-400 mb-4" size={48} />
            <p className="text-gray-600 mb-4">No payment methods saved</p>
            <button
              onClick={() => setShowAddModal(true)}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold"
            >
              Add Payment Method
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center justify-between p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex items-center gap-4">
                  {method.type === 'card' && (
                    <>
                      <CreditCard className="text-gray-600" size={32} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{method.brand}</span>
                          {method.isDefault && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded">
                              Default
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">•••• •••• •••• {method.number}</p>
                        <p className="text-xs text-gray-500">Expires {method.expiry}</p>
                      </div>
                    </>
                  )}
                  {method.type === 'mobile' && (
                    <>
                      <Smartphone className="text-gray-600" size={32} />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-gray-900">{method.provider}</span>
                          {method.verified && (
                            <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded">
                              Verified ✓
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{method.phone}</p>
                      </div>
                    </>
                  )}
                  {method.type === 'bank' && (
                    <>
                      <Building2 className="text-gray-600" size={32} />
                      <div>
                        <p className="font-semibold text-gray-900">{method.bank}</p>
                        <p className="text-sm text-gray-600">Account: •••• {method.account}</p>
                      </div>
                    </>
                  )}
                </div>
                <div className="flex gap-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    <Edit className="text-gray-600" size={18} />
                  </button>
                  <button className="p-2 hover:bg-red-50 rounded-lg">
                    <Trash2 className="text-red-600" size={18} />
                  </button>
                  {!method.isDefault && (
                    <button className="px-3 py-1 text-sm border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50">
                      Set as Default
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
        <button
          onClick={() => setShowAddModal(true)}
          className="mt-4 w-full px-6 py-3 border-2 border-dashed border-gray-300 text-gray-700 rounded-lg font-semibold hover:border-blue-400 hover:text-blue-600 transition-colors"
        >
          + Add New Payment Method
        </button>
      </div>

      {/* Billing History */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-900">Billing History</h2>
          <div className="flex gap-2">
            <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
              <option>All Transactions</option>
              <option>Last 30 days</option>
            </select>
            <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg font-semibold text-sm hover:bg-gray-50 flex items-center gap-2">
              <Download size={16} />
              Export All
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Date</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Description</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Lawyer</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Amount</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Status</th>
                <th className="text-left py-3 px-4 text-sm font-semibold text-gray-700">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((tx, index) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-4 px-4 text-sm text-gray-900">{tx.date}</td>
                  <td className="py-4 px-4 text-sm text-gray-900">{tx.description}</td>
                  <td className="py-4 px-4 text-sm text-gray-600">{tx.lawyer}</td>
                  <td className="py-4 px-4 text-sm font-semibold text-gray-900">{tx.amount.toLocaleString()} ETB</td>
                  <td className="py-4 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      tx.status === 'Paid' ? 'bg-green-100 text-green-700' : 'bg-orange-100 text-orange-700'
                    }`}>
                      {tx.status}
                    </span>
                  </td>
                  <td className="py-4 px-4">
                    <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                      Download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Payment Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={() => setShowAddModal(false)}>
          <div className="bg-white rounded-xl max-w-md w-full p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-xl font-bold text-navy mb-4">Add Payment Method</h3>
            <div className="space-y-3 mb-6">
              {[
                { icon: '💳', label: 'Credit/Debit Card' },
                { icon: '📱', label: 'Mobile Money (Telebirr, M-Pesa)' },
                { icon: '🏦', label: 'Bank Transfer' },
                { icon: '🌐', label: 'International (PayPal, Stripe)' }
              ].map((option, index) => (
                <button
                  key={index}
                  className="w-full flex items-center gap-3 p-4 border-2 border-gray-200 rounded-lg hover:border-blue-400 transition-colors text-left"
                >
                  <span className="text-2xl">{option.icon}</span>
                  <span className="font-semibold text-gray-900">{option.label}</span>
                </button>
              ))}
            </div>
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg mb-4">
              <p className="text-sm text-green-800">🔒 Your payment info is encrypted and secure</p>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setShowAddModal(false)}
                className="flex-1 px-4 py-3 border-2 border-gray-300 text-gray-700 rounded-lg font-semibold"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

