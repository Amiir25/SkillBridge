import React from 'react'
import { images } from '../assets/images'
import { Link } from 'react-router-dom'

const Login = () => {
  return (
    <section
    style={{ backgroundImage: `url(${images.bg})` }}
    className='h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center'>
        <div className='w-100 h-120 border-5 border-gray-100 rounded-xl px-8 py-10'>

            {/* Logo */}
            <Link to={'/'}>
                <img src="/logo-color.png" alt="SkillBridge logo image"
                className='w-60 mx-auto' />
            </Link>

            {/* Title */}
            <h1 className='mt-4 text-xl text-gray-600 text-center'>Sign in to your account</h1>

            {/* Form */}
            <form className='mt-8'>
                <div>
                    <label htmlFor="email" className='block text-xl'>Email</label>
                    <input type="text" id='email' placeholder='Enter your email'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div>
                
                <div className='mt-4'>
                    <label htmlFor="password" className='block text-xl'>Password</label>
                    <input type="passworld" id='password' placeholder='Enter your password'
                    className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                </div>

                <button className='mt-8 w-full py-2 rounded text-gray-100 text-xl text-semibold cursor-pointer
                bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 active:opacity-100'>
                    Login
                </button>

                <p className='mt-4 text-sm text-center'>
                    Don't have an account?
                    <Link to={'/register'} className='text-blue-600'> Register</Link>
                </p>
            </form>
        </div>

    </section>
  )
}

export default Login