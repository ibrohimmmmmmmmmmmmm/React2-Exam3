import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

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
          relative rounded-lg border transition-all duration-300
          bg-white dark:bg-neutral-900
          ${error
            ? 'border-red-400 dark:border-red-500'
            : focused
              ? 'border-[#DB4444] shadow-sm'
              : 'border-gray-200 dark:border-neutral-800'
          }
        `}
      >
        <label
          className={`
            absolute left-3 transition-all duration-200 pointer-events-none select-none
            ${active
              ? 'top-1.5 text-[10px] text-gray-500 dark:text-gray-400'
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
          className="w-full pt-5 pb-2 px-3 text-sm bg-transparent outline-none text-gray-900 dark:text-white"
          autoComplete="off"
        />
      </div>

      {error && (
        <p className="text-[10px] text-red-500 mt-1 ml-1">{error}</p>
      )}
    </div>
  )
}

// ── Sidebar Navigation Components ──────────────────────────────────────────
function SidebarLink({ label, active, onClick }: { label: string; active?: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`
        text-sm whitespace-nowrap px-4 py-2 rounded-lg transition-all
        ${active
          ? 'text-[#DB4444] font-semibold bg-red-50 dark:bg-red-500/10'
          : 'text-gray-600 dark:text-gray-400 hover:text-[#DB4444]'
        }
      `}
    >
      {label}
    </button>
  )
}

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
    if (errors[name as keyof FormErrors]) setErrors((prev) => ({ ...prev, [name]: undefined }))
    setSaveSuccess(false)
  }

  const validate = (): boolean => {
    const newErrors: FormErrors = {}
    if (!form.firstName.trim()) newErrors.firstName = t('account.validation.firstName')
    if (!form.lastName.trim()) newErrors.lastName = t('account.validation.lastName')
    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) newErrors.email = t('account.validation.emailInvalid')
    
    if (form.newPassword || form.currentPassword || form.confirmNewPassword) {
      if (!form.currentPassword) newErrors.currentPassword = t('account.validation.currentPassword')
      if (form.newPassword.length < 6) newErrors.newPassword = t('account.validation.newPasswordLength')
      if (form.newPassword !== form.confirmNewPassword) newErrors.confirmNewPassword = t('account.validation.passwordMatch')
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSave = async () => {
    if (!validate()) return
    setSaving(true)
    await new Promise((res) => setTimeout(res, 800))
    localStorage.setItem('user_profile', JSON.stringify({ firstName: form.firstName, lastName: form.lastName, email: form.email, streetAddress: form.streetAddress }))
    setSaving(false)
    setSaveSuccess(true)
  }

  return (
    <div className="max-w-[1200px] mx-auto px-4 py-6 md:py-10 bg-gray-50 dark:bg-black min-h-screen">
      
      {/* Breadcrumb */}
      <div className="text-sm mb-6">
        <span className="text-gray-400 cursor-pointer" onClick={() => navigate('/')}>{t('account.breadcrumbHome')}</span>
        <span className="mx-2 text-gray-300">/</span>
        <span className="text-gray-900 dark:text-white font-medium">{t('account.breadcrumbAccount')}</span>
      </div>

      <div className="flex flex-col gap-6">
        {/* Mobile-Friendly Horizontal Scroll Nav */}
        <nav className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide bg-white dark:bg-neutral-900 p-2 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800">
          {['profile', 'address', 'payment', 'returns', 'cancellations', 'wishlist'].map((sec) => (
            <SidebarLink 
              key={sec} 
              label={t(`account.sidebar.${sec}`)} 
              active={activeSection === (sec as ActiveSection)} 
              onClick={() => setActiveSection(sec as ActiveSection)} 
            />
          ))}
        </nav>

        {/* Main Content */}
        <main className="bg-white dark:bg-neutral-900 rounded-2xl border border-gray-100 dark:border-neutral-800 p-6 md:p-10 shadow-sm">
          {activeSection === 'profile' ? (
            <div className="space-y-8">
              <h2 className="text-xl font-bold text-[#DB4444]">{t('account.profile.title')}</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FloatingInput label={t('account.profile.firstName')} name="firstName" value={form.firstName} error={errors.firstName} onChange={handleChange} />
                <FloatingInput label={t('account.profile.lastName')} name="lastName" value={form.lastName} error={errors.lastName} onChange={handleChange} />
                <FloatingInput label={t('account.profile.email')} name="email" type="email" value={form.email} error={errors.email} onChange={handleChange} />
                <FloatingInput label={t('account.profile.street')} name="streetAddress" value={form.streetAddress} error={errors.streetAddress} onChange={handleChange} />
              </div>

              <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-neutral-800">
                <h3 className="font-semibold text-gray-900 dark:text-white">{t('account.profile.passwordTitle')}</h3>
                <FloatingInput label={t('account.profile.currentPassword')} name="currentPassword" type="password" value={form.currentPassword} error={errors.currentPassword} onChange={handleChange} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FloatingInput label={t('account.profile.newPassword')} name="newPassword" type="password" value={form.newPassword} error={errors.newPassword} onChange={handleChange} />
                  <FloatingInput label={t('account.profile.confirmPassword')} name="confirmNewPassword" type="password" value={form.confirmNewPassword} error={errors.confirmNewPassword} onChange={handleChange} />
                </div>
              </div>

              {saveSuccess && <div className="text-sm text-green-600 bg-green-50 p-3 rounded-lg">{t('account.profile.saveSuccess')}</div>}

              <div className="flex items-center justify-end gap-4 pt-4">
                <button onClick={() => setForm(loadStoredProfile())} className="text-sm text-gray-500 hover:text-black dark:hover:text-white">{t('account.profile.cancel')}</button>
                <button onClick={handleSave} disabled={saving} className="bg-[#DB4444] text-white px-8 py-3 rounded-lg text-sm font-medium hover:bg-red-600 transition disabled:opacity-50">
                  {saving ? t('account.profile.saving') : t('account.profile.save')}
                </button>
              </div>
            </div>
          ) : (
            <div className="h-40 flex items-center justify-center text-gray-400">
              {t(`account.sidebar.${activeSection}`)} {t('account.placeholder.comingSoon')}
            </div>
          )}
        </main>
      </div>
    </div>
  )
}

type ActiveSection = 'profile' | 'address' | 'payment' | 'returns' | 'cancellations' | 'wishlist'