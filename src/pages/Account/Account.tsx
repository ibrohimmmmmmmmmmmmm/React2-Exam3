import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

// ── Types ──────────────────────────────────────────────────────────────────
interface ProfileForm {
  firstName: string
  lastName: string
  email: string
  streetAddress: string
  currentPassword: string
  newPassword: string
  confirmNewPassword: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  streetAddress?: string
  currentPassword?: string
  newPassword?: string
  confirmNewPassword?: string
}

// ── Floating Label Input ───────────────────────────────────────────────────
interface FloatingInputProps {
  label: string
  name: keyof ProfileForm
  value: string
  type?: string
  error?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function FloatingInput({ label, name, value, type = 'text', error, onChange }: FloatingInputProps) {
  const [focused, setFocused] = useState(false)
  const active = focused || value.length > 0

  return (
    <div className="relative w-full">
      <div
        className={`
          relative border rounded-md transition-all duration-200
          ${error ? 'border-red-400' : focused ? 'border-gray-500' : 'border-gray-300'}
        `}
      >
        <label
          className={`
            absolute left-3 transition-all duration-200 pointer-events-none select-none
            ${active ? 'top-1 text-[10px] text-gray-500' : 'top-1/2 -translate-y-1/2 text-sm text-gray-400'}
          `}
        >
          {label}
        </label>
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          className="w-full pt-5 pb-2 px-3 text-sm text-gray-900 bg-transparent outline-none rounded-md"
          autoComplete="off"
        />
      </div>
      {error && <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>}
    </div>
  )
}

// ── Sidebar Link ───────────────────────────────────────────────────────────
interface SidebarLinkProps {
  label: string
  active?: boolean
  onClick: () => void
}

function SidebarLink({ label, active, onClick }: SidebarLinkProps) {
  return (
    <button
      onClick={onClick}
      className={`
        text-sm text-left w-full transition-colors duration-150 hover:text-[#DB4444]
        ${active ? 'text-[#DB4444] font-medium' : 'text-gray-500'}
      `}
    >
      {label}
    </button>
  )
}

// ── Section Group ──────────────────────────────────────────────────────────
function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-sm font-bold text-gray-900 mb-3">{title}</p>
      <div className="flex flex-col gap-3 pl-2">{children}</div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
type ActiveSection = 'profile' | 'address' | 'payment' | 'returns' | 'cancellations' | 'wishlist'

export default function MyAccount() {
  const navigate = useNavigate()
  const [activeSection, setActiveSection] = useState<ActiveSection>('profile')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [form, setForm] = useState<ProfileForm>({
    firstName: '',
    lastName: '',
    email: '',
    streetAddress: '',
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: '',
  })

  const [errors, setErrors] = useState<FormErrors>({})

  // ── Handlers ──────────────────────────────────────────────────────────
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setForm((prev) => ({ ...prev, [name]: value }))
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
    setSaveSuccess(false)
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}

    if (!form.firstName.trim()) newErrors.firstName = 'First name is required'
    if (!form.lastName.trim()) newErrors.lastName = 'Last name is required'
    if (!form.email.trim()) {
      newErrors.email = 'Email is required'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = 'Enter a valid email address'
    }

    if (form.newPassword || form.currentPassword || form.confirmNewPassword) {
      if (!form.currentPassword) newErrors.currentPassword = 'Current password is required'
      if (!form.newPassword) newErrors.newPassword = 'New password is required'
      else if (form.newPassword.length < 6) newErrors.newPassword = 'At least 6 characters'
      if (!form.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Please confirm your new password'
      } else if (form.newPassword !== form.confirmNewPassword) {
        newErrors.confirmNewPassword = 'Passwords do not match'
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    try {
      // TODO: wire up API call here
      // await axiosRequest.put('/Account/update-profile', { ... })
      await new Promise((res) => setTimeout(res, 800)) // placeholder
      setSaveSuccess(true)
    } catch (err) {
      // handle API errors
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setForm({
      firstName: '',
      lastName: '',
      email: '',
      streetAddress: '',
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    })
    setErrors({})
    setSaveSuccess(false)
  }

  // ── Render Content ─────────────────────────────────────────────────────
  const renderContent = () => {
    switch (activeSection) {
      case 'profile':
        return (
          <div>
            <h2 className="text-lg font-semibold text-[#DB4444] mb-6">Profile</h2>

            {/* Profile fields */}
            <div className="grid grid-cols-2 gap-4 mb-4">
              <FloatingInput
                label="First name"
                name="firstName"
                value={form.firstName}
                error={errors.firstName}
                onChange={handleChange}
              />
              <FloatingInput
                label="Last name"
                name="lastName"
                value={form.lastName}
                error={errors.lastName}
                onChange={handleChange}
              />
            </div>

            <div className="grid grid-cols-2 gap-4 mb-8">
              <FloatingInput
                label="Email address"
                name="email"
                type="email"
                value={form.email}
                error={errors.email}
                onChange={handleChange}
              />
              <FloatingInput
                label="Street address"
                name="streetAddress"
                value={form.streetAddress}
                error={errors.streetAddress}
                onChange={handleChange}
              />
            </div>

            {/* Password section */}
            <h3 className="text-base font-semibold text-gray-900 mb-4">Password Changes</h3>

            <div className="flex flex-col gap-4 mb-8">
              <FloatingInput
                label="Current password"
                name="currentPassword"
                type="password"
                value={form.currentPassword}
                error={errors.currentPassword}
                onChange={handleChange}
              />
              <div className="grid grid-cols-2 gap-4">
                <FloatingInput
                  label="New password"
                  name="newPassword"
                  type="password"
                  value={form.newPassword}
                  error={errors.newPassword}
                  onChange={handleChange}
                />
                <FloatingInput
                  label="Confirm new password"
                  name="confirmNewPassword"
                  type="password"
                  value={form.confirmNewPassword}
                  error={errors.confirmNewPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            {/* Success message */}
            {saveSuccess && (
              <div className="mb-4 px-4 py-2 bg-green-50 border border-green-200 rounded-md">
                <p className="text-sm text-green-600 font-medium">Changes saved successfully!</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4">
              <button
                onClick={handleCancel}
                className="text-sm text-gray-700 hover:text-gray-900 transition-colors px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="bg-[#DB4444] hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed text-white text-sm font-medium px-8 py-3 rounded-md transition-colors flex items-center gap-2"
              >
                {saving && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                  </svg>
                )}
                {saving ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        )

      case 'address':
        return (
          <div>
            <h2 className="text-lg font-semibold text-[#DB4444] mb-6">Address Book</h2>
            <p className="text-sm text-gray-400">Address book content coming soon.</p>
          </div>
        )

      case 'payment':
        return (
          <div>
            <h2 className="text-lg font-semibold text-[#DB4444] mb-6">My Payment Options</h2>
            <p className="text-sm text-gray-400">Payment options content coming soon.</p>
          </div>
        )

      case 'returns':
        return (
          <div>
            <h2 className="text-lg font-semibold text-[#DB4444] mb-6">My Returns</h2>
            <p className="text-sm text-gray-400">Returns content coming soon.</p>
          </div>
        )

      case 'cancellations':
        return (
          <div>
            <h2 className="text-lg font-semibold text-[#DB4444] mb-6">My Cancellations</h2>
            <p className="text-sm text-gray-400">Cancellations content coming soon.</p>
          </div>
        )

      case 'wishlist':
        return (
          <div>
            <h2 className="text-lg font-semibold text-[#DB4444] mb-6">My Wishlist</h2>
            <p className="text-sm text-gray-400">Wishlist content coming soon.</p>
          </div>
        )

      default:
        return null
    }
  }

  // ── Page ───────────────────────────────────────────────────────────────
  return (
    <div className="max-w-[1200px] mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8">
        <button
          onClick={() => navigate('/')}
          className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
        >
          Home
        </button>
        <span className="text-gray-400 text-sm">/</span>
        <span className="text-sm text-gray-900 font-medium">My Account</span>
      </div>

      <div className="flex gap-10">
        {/* ── Sidebar ── */}
        <aside className="w-[220px] flex-shrink-0">
          <SidebarGroup title="Manage My Account">
            <SidebarLink
              label="My Profile"
              active={activeSection === 'profile'}
              onClick={() => setActiveSection('profile')}
            />
            <SidebarLink
              label="Address Book"
              active={activeSection === 'address'}
              onClick={() => setActiveSection('address')}
            />
            <SidebarLink
              label="My Payment Options"
              active={activeSection === 'payment'}
              onClick={() => setActiveSection('payment')}
            />
          </SidebarGroup>

          <SidebarGroup title="My Orders">
            <SidebarLink
              label="My Returns"
              active={activeSection === 'returns'}
              onClick={() => setActiveSection('returns')}
            />
            <SidebarLink
              label="My Cancellations"
              active={activeSection === 'cancellations'}
              onClick={() => setActiveSection('cancellations')}
            />
          </SidebarGroup>

          <div className="mb-6">
            <button
              onClick={() => setActiveSection('wishlist')}
              className={`
                text-sm font-bold text-left w-full transition-colors duration-150 hover:text-[#DB4444]
                ${activeSection === 'wishlist' ? 'text-[#DB4444]' : 'text-gray-900'}
              `}
            >
              My WishList
            </button>
          </div>
        </aside>

        <main className="flex-1 bg-white rounded-lg shadow-sm border border-gray-100 p-8">
          {renderContent()}
        </main>
      </div>
    </div>
  )
}
