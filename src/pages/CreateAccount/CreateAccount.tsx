import { memo } from 'react'
import { Button } from '../../components/ui/button'
import img from "@/assets/Icon-Google (1).png"
import { axiosRequest } from '../../utils/token'
import { Link, useNavigate } from 'react-router-dom'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import { InputUserName } from '../../components/inputUserName/inputUserName'

interface RegisterValues {
  userName: string
  email: string
  phoneNumber: string
  password: string
  confirmPassword: string
}

const validationSchema = Yup.object({
  userName: Yup.string()
    .min(3, "Username must be at least 3 characters")
    .required("Username is required"),

  email: Yup.string()
    .email("Invalid email")
    .required("Email is required"),

  phoneNumber: Yup.string()
    .matches(/^[0-9+ ]+$/, "Invalid phone number")
    .required("Phone number is required"),

  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], "Passwords do not match")
    .required("Confirm your password"),
})

export default memo(function CreateAccount() {
  const navigate = useNavigate()

  async function register(values: RegisterValues) {
    try {
      const response = await axiosRequest.post(
        "Account/register",
        values
      )

      if (response.status >= 200 && response.status < 300) {
        localStorage.setItem(
          'user_profile',
          JSON.stringify({
            firstName: values.userName || 'User',
            lastName: '',
            email: values.email,
            streetAddress: '',
          })
        )
        navigate("/signup2")
      }
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <div className='min-h-screen flex items-center justify-center py-10 lg:py-25 px-4 bg-white overflow-x-hidden'>
      
      <div className='w-full max-w-[520px]'>
        
        <div className='mb-8 lg:mb-10'>
          <p className='text-[30px] lg:text-[36px] font-medium leading-tight text-black'>
            Create an account
          </p>

          <p className='mt-2 text-sm lg:text-base text-gray-600'>
            Enter your details below
          </p>
        </div>

        <Formik
          initialValues={{
            userName: "",
            phoneNumber: "",
            email: "",
            password: "",
            confirmPassword: ""
          }}
          validationSchema={validationSchema}
          onSubmit={register}
        >
          {({ values, setFieldValue, isSubmitting }) => (
            <Form>
              
              <InputUserName
                forms={values}
                setForms={setFieldValue}
              />

              {/* BUTTON */}
              <Button
                type='submit'
                disabled={isSubmitting}
                className='w-full bg-[#DB4444] hover:bg-[#c53b3b] rounded-xl py-6 mt-7 mb-5 text-white text-[15px] lg:text-[16px] font-semibold transition'
              >
                Create Account
              </Button>

              {/* GOOGLE */}
              <button
                type='button'
                className='w-full flex items-center justify-center gap-3 border border-gray-300 hover:border-[#DB4444] rounded-xl py-4 transition bg-white'
              >
                <img
                  src={img}
                  alt="Google"
                  className='w-5 h-5'
                />

                <p className='text-sm lg:text-base font-medium'>
                  Sign up with Google
                </p>
              </button>

              {/* LOGIN */}
              <p className='text-black text-center mt-6 text-sm lg:text-base'>
                Already have account?{" "}
                
                <span className='underline font-medium hover:text-[#DB4444] transition'>
                  <Link to="/signup2">
                    Log in
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