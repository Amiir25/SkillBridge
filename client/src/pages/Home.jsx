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

        {/*  */}
    </div>
  )
}

export default Home