import React from 'react'
import { images } from '../assets/images'

const Home = () => {
  return (
    <div
    style={{ backgroundImage: `url(${ images.bg })` }}
    className='relative h-screen bg-cover bg-center bg-no-repeat'>

        {/* Logo */}
        <img src="/logo-2.png" alt="SkillBridge logo image"
        className='absolute top-4 left-4 w-40 ml-6 md:ml-12 lg:ml-24 xl:ml-32
        shadow-xl shadow-gray-800/30' />

        {/* Titles */}
        <div id='titles' className='h-screen w-200 mx-auto flex flex-col justify-center text-center text-gray-900'>
          <h1 className='text-6xl font-semibold tex-shadow-2xl [text-shadow:4px_4px_12px_rgba(0,0,0,0.8)]'>
            Welcome to the real world of skills & experiance!
          </h1>
          <p className='text-2xl mt-8'>
            Connecting students with short, practical projects from companies
          </p>
        </div>
    </div>
  )
}

export default Home