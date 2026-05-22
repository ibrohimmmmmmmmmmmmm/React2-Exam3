import React, { memo } from 'react'
import { Field } from '../ui/field'
import { Input } from '../ui/input'
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from '../ui/input-group'
import { EyeOffIcon } from 'lucide-react'

interface InputLoginProps {
  forms: {
    userName: string
    password: string
  }
  setForms: React.Dispatch<
    React.SetStateAction<{
      userName: string
      password: string
    }>
  >
}

export default memo(function InputLogin({
  forms,
  setForms,
}: InputLoginProps) {
  return (
    <div>
      <Field>
        <Input
          className="mb-3"
          id="fieldgroup-email"
          type="email"
          value={forms.userName}
          onChange={(e) =>
            setForms({
              ...forms,
              userName: e.target.value,
            })
          }
          placeholder="User@gmail.com"
        />

        <Input
          className="mb-3"
          id="fieldgroup-password"
          type="password"
          value={forms.password}
          onChange={(e) =>
            setForms({
              ...forms,
              password: e.target.value,
            })
          }
          placeholder="Enter password"
        />
      </Field>
    </div>
  )
})