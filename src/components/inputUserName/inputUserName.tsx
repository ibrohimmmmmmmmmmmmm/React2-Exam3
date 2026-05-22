import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"

export function InputUserName({forms,setForms}: any) {
  return (
    <Field>
      <Input
      className = "mb-3"
        id="input-field-username"
        type="text"
        value={forms.userName}
        onChange = {(e) =>setForms({...forms, userName: e.target.value})}
        placeholder="Enter your username"
      />
      <Input
      className = "mb-3"
          id="fieldgroup-email"
          type="email"
          value={forms.email}
          onChange = {(e) =>setForms({...forms, email: e.target.value})}
          placeholder="Name@gmail.com"
        />
        <Input
        className = "mb-3"
          id="fieldgroup-telephone"
          type="telephone"
          value={forms.phoneNumber}
          onChange = {(e) =>setForms({...forms, phoneNumber: e.target.value})}
          placeholder="+380 00 000 00 00"
        />
        <Input
          id="fieldgroup-password"
          type="password"
          value={forms.password}
          onChange = {(e) =>setForms({...forms, password: e.target.value})}
          placeholder="Password"
        />
        <Input
          id="fieldgroup-confirmPassword"
          type="password"
          value={forms.confirmPassword}
          onChange = {(e) =>setForms({...forms, confirmPassword: e.target.value})}
          placeholder="Password"
        />
        
    </Field>
  )
}
