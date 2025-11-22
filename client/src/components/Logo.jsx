import React from 'react'
import { Link } from 'react-router-dom'

const Logo = () => {
  return (
    <section >
          
          <Link to={'/'}
          className='absolute top-4 left-0 ml-6 md:ml-12 lg:ml-24 xl:ml-32
          flex flex-col items-center'>
            
            <img src="/logo-gold.png" alt="SkillBridge logo image"
            className='w-10' />
            
            <p className='text-sm font-black bg-gradient-to-r from-[#b57b0e] via-[#f0c141] to-[#fcf5a2]
            bg-clip-text text-transparent'>
                SkillBridge
            </p>
          </Link>

    </section>
  )
}

export default Logo