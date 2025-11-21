import React from 'react'
import { images } from '../assets/images'
import { Link } from 'react-router-dom'

const Register = () => {
  return (
    <section
    style={{ backgroundImage: `url(${images.bg})` }}
    className='h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center'>
        <div className='w-100 h-120 border-5 border-gray-100 rounded-xl px-8 py-10
        overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>

            {/* Logo */}
            <img src="/logo-color.png" alt="SkillBridge logo image"
            className='w-60 mx-auto' />

            {/* Title */}
            <h1 className='mt-4 text-xl text-gray-600 text-center'>Create your account</h1>

            {/* Form */}
            <form className='mt-8'>
                {/* <div>
                    <label htmlFor="firstName" className='block text-xl'>First Name</label>
                    <input type="text" id='firstName' placeholder='Enter your first name'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div> */}
                
                {/* <div className='mt-4'>
                    <label htmlFor="lastName" className='block text-xl'>Last Name</label>
                    <input type="text" id='lastName' placeholder='Enter your last name'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div> */}
                
                <div className='mt-4'>
                    <label htmlFor="userName" className='block text-xl'>Name</label>
                    <input type="text" id='userName' placeholder='Enter your name'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div>
                
                <div className='mt-4'>
                    <label htmlFor="email" className='block text-xl'>Email</label>
                    <input type="text" id='email' placeholder='Enter your email'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div>
                
                <div className='mt-4'>
                    <label htmlFor="password" className='block text-xl'>Password</label>
                    <input type="passworld" id='password' placeholder='Enter your password'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div>
                
                {/* <div className='mt-4'>
                    <label htmlFor="confirmPassword" className='block text-xl'>Confirm Password</label>
                    <input type="passworld" id='confirmassword' placeholder='Confirm your password'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div> */}

                <div className="mt-4">
                    <label htmlFor="role" className='block text-xl'>Role</label>
                    <select name="role-selection" id="role"
                    className='w-full border border-gray-800/50 p-2 rounded outline-0'>
                        <option>Student</option>
                        <option>Company</option>
                    </select>
                </div>

                <button className='mt-8 w-full py-2 rounded text-gray-100 text-xl text-semibold cursor-pointer
                bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 active:opacity-100'>
                    Register
                </button>

                <p className='mt-4 text-sm text-center'>
                    Already have an account?
                    <Link to={'/login'} className='text-blue-600'> Login</Link>
                </p>
            </form>
        </div>

    </section>
  )
}

export default Register