import React, { memo } from 'react'
import { Button } from '../../components/ui/button'
import InputLogin from '../../components/InputLogin/InputLogin'
import { useNavigate, Link } from 'react-router-dom'
import { axiosRequest, SaveToken } from '../../utils/token'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'

const validationSchema = Yup.object({
  userName: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
})

export default memo(function SignUp() {
  const navigate = useNavigate()

  async function login(values: any) {
    try {
      const { data } = await axiosRequest.post(
        "Account/login",
        values
      )

      if (data.statusCode === 200 && data.statusCode < 300) {
        SaveToken(data.data)
        navigate("/")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center py-10 lg:py-25 px-4 bg-white overflow-x-hidden'>
      
      <div className='w-full max-w-[520px]'>
        
        {/* TITLE */}
        <div className='mb-8 lg:mb-10'>
          <p className='text-[30px] lg:text-[36px] font-medium leading-tight text-black'>
            Log in to Exclusive
          </p>

          <p className='mt-2 text-sm lg:text-base text-gray-600'>
            Enter your details below
          </p>
        </div>

        <Formik
          initialValues={{
            userName: "",
            password: ""
          }}
          validationSchema={validationSchema}
          onSubmit={login}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>

              <InputLogin
                forms={values}
                setForms={setFieldValue}
              />

              {/* FORGOT PASSWORD */}
              <p className='text-[#DB4444] text-center font-medium mt-4 text-sm lg:text-base cursor-pointer hover:underline'>
                Forget Password?
              </p>

              {/* BUTTON */}
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#DB4444] hover:bg-[#c53b3b] rounded-xl py-6 mt-7 mb-5 text-white text-[15px] lg:text-[16px] font-semibold transition'
              >
                Log in
              </Button>

              {/* CREATE ACCOUNT */}
              <p className='text-black text-center text-sm lg:text-base'>
                Don’t have an account?{" "}

                <span className='underline font-medium hover:text-[#DB4444] transition'>
                  <Link to="/create-account">
                    Create Account
                  </Link>
                </span>
              </p>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
})