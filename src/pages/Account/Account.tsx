import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useTranslation } from 'react-i18next'

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

const defaultProfile: ProfileForm = {
  firstName: 'Anna',
  lastName: 'Petrova',
  email: 'anna.petrov@example.com',
  streetAddress: '123 Main St, Kyiv',
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: '',
}

const loadStoredProfile = (): ProfileForm => {
  const saved = localStorage.getItem('user_profile')
  if (!saved) return defaultProfile

  try {
    const parsed = JSON.parse(saved) as Partial<ProfileForm>
    return {
      ...defaultProfile,
      ...parsed,
      currentPassword: '',
      newPassword: '',
      confirmNewPassword: '',
    }
  } catch {
    return defaultProfile
  }
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

// ── Floating Input ─────────────────────────────────────────────────────────
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
          relative rounded-xl border transition-all duration-300
          bg-white dark:bg-neutral-900
          ${error
            ? 'border-red-400 dark:border-red-500'
            : focused
              ? 'border-[#DB4444] shadow-md shadow-red-100 dark:shadow-black/40'
              : 'border-gray-200 dark:border-neutral-800'
          }
        `}
      >
        <label
          className={`
            absolute left-3 transition-all duration-200 pointer-events-none select-none
            ${active
              ? 'top-1 text-[10px] text-gray-500 dark:text-gray-400'
              : 'top-1/2 -translate-y-1/2 text-sm text-gray-400 dark:text-gray-500'
            }
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
          className="w-full pt-5 pb-2 px-3 text-sm bg-transparent outline-none text-gray-900 dark:text-white rounded-xl"
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-xs text-red-500 mt-1 ml-1">{error}</p>
      )}
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
        text-sm text-left w-full px-2 py-1 rounded-md transition-all duration-200
        hover:text-[#DB4444] hover:bg-red-50 dark:hover:bg-red-500/10
        ${active
          ? 'text-[#DB4444] font-semibold bg-red-50 dark:bg-red-500/10'
          : 'text-gray-500 dark:text-gray-400'
        }
      `}
    >
      {label}
    </button>
  )
}

// ── Sidebar Group ──────────────────────────────────────────────────────────
function SidebarGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-6">
      <p className="text-xs uppercase tracking-wider font-bold text-gray-900 dark:text-white mb-3">
        {title}
      </p>
      <div className="flex flex-col gap-2 pl-2">{children}</div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────────────────────
type ActiveSection =
  | 'profile'
  | 'address'
  | 'payment'
  | 'returns'
  | 'cancellations'
  | 'wishlist'

export default function MyAccount() {
  const navigate = useNavigate()
  const { t } = useTranslation()

  const [activeSection, setActiveSection] = useState<ActiveSection>('profile')
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)

  const [form, setForm] = useState<ProfileForm>(loadStoredProfile())

  const [errors, setErrors] = useState<FormErrors>({})

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

    if (!form.firstName.trim()) newErrors.firstName = t('account.validation.firstName')
    if (!form.lastName.trim()) newErrors.lastName = t('account.validation.lastName')

    if (!form.email.trim()) {
      newErrors.email = t('account.validation.emailRequired')
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = t('account.validation.emailInvalid')
    }

    if (form.newPassword || form.currentPassword || form.confirmNewPassword) {
      if (!form.currentPassword) newErrors.currentPassword = t('account.validation.currentPassword')
      if (!form.newPassword) newErrors.newPassword = t('account.validation.newPasswordRequired')
      else if (form.newPassword.length < 6) newErrors.newPassword = t('account.validation.newPasswordLength')

      if (!form.confirmNewPassword) {
        newErrors.confirmNewPassword = t('account.validation.confirmPassword')
      } else if (form.newPassword !== form.confirmNewPassword) {
        newErrors.confirmNewPassword = t('account.validation.passwordMatch')
      }
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    await new Promise((res) => setTimeout(res, 800))
    localStorage.setItem(
      'user_profile',
      JSON.stringify({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        streetAddress: form.streetAddress,
      })
    )
    setSaving(false)
    setSaveSuccess(true)
  }

  useEffect(() => {
    setForm(loadStoredProfile())
  }, [])

  const handleCancel = () => {
    setForm(loadStoredProfile())
    setErrors({})
    setSaveSuccess(false)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-10 bg-gray-50 dark:bg-black min-h-screen transition-colors">

      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-sm">
        <button
          onClick={() => navigate('/')}
          className="text-gray-400 hover:text-[#DB4444]"
        >
          {t('account.breadcrumbHome')}
        </button>
        <span className="text-gray-400">/</span>
        <span className="text-gray-900 dark:text-white font-medium">
          {t('account.breadcrumbAccount')}
        </span>
      </div>

      <div className="flex flex-col md:flex-row gap-8 md:gap-10">

        {/* Sidebar */}
        <aside className="w-full md:w-[240px] flex-shrink-0 overflow-x-auto pb-4 md:pb-0">
          <div className="flex md:flex-col gap-8 md:gap-0 bg-white dark:bg-neutral-900 border border-gray-100 dark:border-neutral-800 rounded-xl p-4 shadow-sm">

            <SidebarGroup title={t('account.sidebar.manage')}>
              <SidebarLink label={t('account.sidebar.profile')} active={activeSection === 'profile'} onClick={() => setActiveSection('profile')} />
              <SidebarLink label={t('account.sidebar.address')} active={activeSection === 'address'} onClick={() => setActiveSection('address')} />
              <SidebarLink label={t('account.sidebar.payment')} active={activeSection === 'payment'} onClick={() => setActiveSection('payment')} />
            </SidebarGroup>

            <SidebarGroup title={t('account.sidebar.orders')}>
              <SidebarLink label={t('account.sidebar.returns')} active={activeSection === 'returns'} onClick={() => setActiveSection('returns')} />
              <SidebarLink label={t('account.sidebar.cancellations')} active={activeSection === 'cancellations'} onClick={() => setActiveSection('cancellations')} />
            </SidebarGroup>

            <button
              onClick={() => setActiveSection('wishlist')}
              className={`
                text-sm font-semibold text-left px-2 py-1 rounded-md transition
                ${activeSection === 'wishlist'
                  ? 'text-[#DB4444] bg-red-50 dark:bg-red-500/10'
                  : 'text-gray-900 dark:text-white hover:text-[#DB4444]'
                }
              `}
            >
              {t('account.sidebar.wishlist')}
            </button>

          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 bg-white dark:bg-neutral-900 rounded-xl border border-gray-100 dark:border-neutral-800 p-6 md:p-10 shadow-sm transition-colors">

          {activeSection === 'profile' ? (
            <div>

              <h2 className="text-lg font-semibold text-[#DB4444] mb-6">
                {t('account.profile.title')}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <FloatingInput label={t('account.profile.firstName')} name="firstName" value={form.firstName} error={errors.firstName} onChange={handleChange} />
                <FloatingInput label={t('account.profile.lastName')} name="lastName" value={form.lastName} error={errors.lastName} onChange={handleChange} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <FloatingInput label={t('account.profile.email')} name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} />
                <FloatingInput label={t('account.profile.street')} name="streetAddress" value={form.streetAddress} error={errors.streetAddress} onChange={handleChange} />
              </div>

              <h3 className="text-base font-semibold text-gray-900 dark:text-white mb-4">
                {t('account.profile.passwordTitle')}
              </h3>

              <div className="flex flex-col gap-4 mb-8">
                <FloatingInput label={t('account.profile.currentPassword')} name="currentPassword" type="password" value={form.currentPassword} error={errors.currentPassword} onChange={handleChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput label={t('account.profile.newPassword')} name="newPassword" type="password" value={form.newPassword} error={errors.newPassword} onChange={handleChange} />
                  <FloatingInput label={t('account.profile.confirmPassword')} name="confirmNewPassword" type="password" value={form.confirmNewPassword} error={errors.confirmNewPassword} onChange={handleChange} />
                </div>
              </div>

              {saveSuccess && (
                <div className="mb-4 px-4 py-3 bg-green-50 dark:bg-green-500/10 rounded-md text-sm text-green-600">
                  {t('account.profile.saveSuccess')}
                </div>
              )}

              <div className="flex items-center justify-end gap-4">
                <button
                  onClick={handleCancel}
                  className="text-sm px-4 py-2 text-gray-500 hover:text-black dark:hover:text-white"
                >
                  {t('account.profile.cancel')}
                </button>

                <button
                  onClick={handleSave}
                  disabled={saving}
                  className="bg-[#DB4444] hover:bg-red-600 transition text-white text-sm px-8 py-3 rounded-md shadow-md disabled:opacity-60"
                >
                  {saving ? t('account.profile.saving') : t('account.profile.save')}
                </button>
              </div>

            </div>
          ) : (
            <p className="text-sm text-gray-400 dark:text-gray-500 capitalize">
              {t(`account.sidebar.${activeSection}`)} {t('account.placeholder.comingSoon')}
            </p>
          )}

        </main>
      </div>
    </div>
  )
}