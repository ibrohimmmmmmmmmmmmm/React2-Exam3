import { memo, useState } from 'react'
import { Field } from '../ui/field'
import { Input } from '../ui/input'
import { ErrorMessage } from 'formik'
import { Eye, EyeOff } from 'lucide-react'

interface InputLoginProps {
  forms: {
    userName: string
    password: string
  }

  setForms: any
}

export default memo(function InputLogin({
  forms,
  setForms,
}: InputLoginProps) {

  const [showPassword, setShowPassword] = useState(false)

  return (
    <div>
      <Field className="space-y-4">

        {/* EMAIL */}
        <div>
          <Input
            className="h-[54px] lg:h-[58px] rounded-xl border-gray-300 focus-visible:ring-[#DB4444] text-sm lg:text-base"
            id="fieldgroup-email"
            type="email"
            value={forms.userName}
            onChange={(e) =>
              setForms("userName", e.target.value)
            }
            placeholder="User@gmail.com"
          />

          <ErrorMessage
            name="userName"
            component="p"
            className="text-red-500 text-sm mt-1"
          />
        </div>

        {/* PASSWORD */}
        <div className='relative'>
          <Input
            className="h-[54px] lg:h-[58px] rounded-xl border-gray-300 focus-visible:ring-[#DB4444] text-sm lg:text-base pr-12"
            id="fieldgroup-password"
            type={showPassword ? "text" : "password"}
            value={forms.password}
            onChange={(e) =>
              setForms("password", e.target.value)
            }
            placeholder="Enter password"
          />

          <button
            type='button'
            onClick={() =>
              setShowPassword(!showPassword)
            }
            className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#DB4444] transition'
          >
            {showPassword ? (
              <Eye size={20} />
            ) : (
              <EyeOff size={20} />
            )}
          </button>

          <ErrorMessage
            name="password"
            component="p"
            className="text-red-500 text-sm mt-1"
          />
        </div>
      </Field>
    </div>
  )
})