import React, { memo, useState } from 'react'
import { InputUserName } from '../../components/inputUserName/inputUserName'
import { Button } from '../../components/ui/button'
import img from "@/assets/Icon-Google (1).png"
import { axiosRequest } from '../../utils/token'
import { Link, useNavigate } from 'react-router-dom'
export default memo(function CreateAccount() {
    const navigate = useNavigate()
    const [forms, setForms] = useState({
        "userName" : "",
        "phoneNumber" : "",
        "email" : "",
        "password" : "",
        "confirmPassword" : ""
    })
    async function register() {
        try {
            const {data} = await axiosRequest.post("Account/register", forms)
            if(data.statusCode == 200) {
                navigate("/sign2")
            }
        } catch (error) {
            console.error(error); 
        }
    }
  return (
    <div className = 'py-25 flex items-center justify-center'>
        <div>
            <p className='text-[36px] font-medium'>Create an account</p>
            <p className='mt-2 mb-10'>Enter your details below</p> 
            <InputUserName forms={forms} setForms={setForms} />
            <Button onClick={register} className='w-full bg-[#DB4444] rounded-[4px] py-5 mt-7 mb-5'>
                Create Account
            </Button>
            <div className='flex items-center justify-center gap-3 border border-[#DB4444] rounded-[4px] py-2'>
                <img src={img} alt="Google" />
                <p>Sign up with Google</p>
            </div>
            <p className='text-[#000000] text-center mt-4'>Already have account? <span className='underline font-medium'> <Link to="/signup2">Log in </Link> </span></p>
        </div>
    </div>
  )
})
