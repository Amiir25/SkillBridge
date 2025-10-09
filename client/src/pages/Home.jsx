import React from 'react'
import { images } from '../assets/images'
import { Link } from 'react-router-dom'
import Logo from '../components/Logo'

const Home = () => {
  return (
    <section
    style={{ backgroundImage: `url(${ images.bg })` }}
    className='relative h-screen bg-cover bg-center bg-no-repeat'>

        {/* Logo */}
        <Logo/>
        
        <div id='hero' className='h-[95vh] w-200 mx-auto flex flex-col justify-center text-center'>
          {/* Titles */}
          <div className=' text-gray-900'>
            <h1 className='text-6xl font-semibold tex-shadow-2xl [text-shadow:4px_4px_12px_rgba(0,0,0,0.8)]'>
              Welcome to the real world of skills & experiance!
            </h1>
            <p className='text-2xl mt-8'>
              Connecting students with short, practical projects from companies.
            </p>
          </div>

          {/* Buttons */}
          <div className='mt-10'>
            <Link to={'login'}>
              <button className='mr-10 w-40 text-2xl border px-8 py-2 rounded cursor-pointer
              hover:bg-gray-900 hover:text-gray-100 transition-all duration-200'>
                Login
              </button>
            </Link>

            <Link to={'/register'}>
              <button className='w-40 text-2xl border px-8 py-2 rounded cursor-pointer
              hover:bg-gray-900 hover:text-gray-100 transition-all duration-200'>
                Register
              </button>
            </Link>
          </div>
        </div>
    </section>
  )
}

export default Home