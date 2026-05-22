import React, { memo, useState } from 'react'
import { Button } from '../../components/ui/button'
import InputLogin from '../../components/InputLogin/InputLogin'
import { useNavigate } from 'react-router-dom'
import { axiosRequest, SaveToken } from '../../utils/token'

export default memo(function SignUp() {
  const [forms, setForms] = useState({
    userName: "",
    password: ""
  })

  const navigate = useNavigate()

  async function login() {
    try {
      const { data } = await axiosRequest.post("Account/login", forms)

      if (data.statusCode === 200) {
        SaveToken(data.data)
        navigate("/")
      }
    } catch (error) {
      console.error(error)
    }
  } 

  return (
    <div className='py-25 flex items-center justify-center'>
      <div>
        <p className='text-[36px] font-medium'>
          Log in to Exclusive
        </p>

        <p className='mt-2 mb-10'>
          Enter your details below
        </p>
        <InputLogin forms={forms} setForms={setForms} />
        <p className='text-[#DB4444] text-center font-medium mt-4'>
          Forget Password?
        </p>
        <Button
          onClick={login}
          className='w-full bg-[#DB4444] rounded-lg py-5 mt-7 mb-5'
        >
          Log in
        </Button>
      </div>
    </div>
  )
})