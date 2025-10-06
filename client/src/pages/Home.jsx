import React from 'react'
import { images } from '../assets/images'

const Home = () => {
  return (
    <section
    style={{ backgroundImage: `url(${ images.bg })` }}
    className='relative h-screen bg-cover bg-center bg-no-repeat'>

        {/* Logo */}
        <div className='absolute top-4 left-4 ml-6 md:ml-12 lg:ml-24 xl:ml-32
        flex flex-col items-center'>
          
          <img src="/logo-gold.png" alt="SkillBridge logo image"
          className='w-10' />
          
          <p className='text-sm bg-gradient-to-r from-[#b57b0e] via-[#f0c141] to-[#fcf5a2]
          bg-clip-text text-transparent font-bold'>
            SkillBridge
          </p>
        </div>

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
            <button className='mr-10 w-40 text-2xl border px-8 py-2 rounded cursor-pointer
            hover:bg-gray-900 hover:text-gray-100 transition-all duration-200'>
              Login
            </button>

            <button className='w-40 text-2xl border px-8 py-2 rounded cursor-pointer
            hover:bg-gray-900 hover:text-gray-100 transition-all duration-200'>
              Register
            </button>
          </div>
        </div>
    </section>
  )
}

export default Home