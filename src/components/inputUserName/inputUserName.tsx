import {
  Field,
} from "@/components/ui/field"

import { Input } from "@/components/ui/input"

import { ErrorMessage } from "formik"
import type { ChangeEvent } from 'react'

export function InputUserName({ forms, setForms }: any) {
  return (
    <Field className="space-y-4">
      
      {/* USERNAME */}
      <div>
        <Input
          className="h-[54px] lg:h-[58px] rounded-xl border-gray-300 focus-visible:ring-[#DB4444] text-sm lg:text-base"
          id="input-field-username"
          type="text"
          value={forms.userName}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForms("userName", e.target.value)
          }
          placeholder="Enter your username"
        />

        <ErrorMessage
          name="userName"
          component="p"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* EMAIL */}
      <div>
        <Input
          className="h-[54px] lg:h-[58px] rounded-xl border-gray-300 focus-visible:ring-[#DB4444] text-sm lg:text-base"
          id="fieldgroup-email"
          type="email"
          value={forms.email}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForms("email", e.target.value)
          }
          placeholder="Name@gmail.com"
        />

        <ErrorMessage
          name="email"
          component="p"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* PHONE */}
      <div>
        <Input
          className="h-[54px] lg:h-[58px] rounded-xl border-gray-300 focus-visible:ring-[#DB4444] text-sm lg:text-base"
          id="fieldgroup-telephone"
          type="text"
          value={forms.phoneNumber}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForms("phoneNumber", e.target.value)
          }
          placeholder="+992 00 000 00 00"
        />

        <ErrorMessage
          name="phoneNumber"
          component="p"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* PASSWORD */}
      <div>
        <Input
          className="h-[54px] lg:h-[58px] rounded-xl border-gray-300 focus-visible:ring-[#DB4444] text-sm lg:text-base"
          id="fieldgroup-password"
          type="password"
          value={forms.password}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForms("password", e.target.value)
          }
          placeholder="Password"
        />

        <ErrorMessage
          name="password"
          component="p"
          className="text-red-500 text-sm mt-1"
        />
      </div>

      {/* CONFIRM PASSWORD */}
      <div>
        <Input
          className="h-[54px] lg:h-[58px] rounded-xl border-gray-300 focus-visible:ring-[#DB4444] text-sm lg:text-base"
          id="fieldgroup-confirmPassword"
          type="password"
          value={forms.confirmPassword}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            setForms("confirmPassword", e.target.value)
          }
          placeholder="Confirm Password"
        />

        <ErrorMessage
          name="confirmPassword"
          component="p"
          className="text-red-500 text-sm mt-1"
        />
      </div>
    </Field>
  )
}