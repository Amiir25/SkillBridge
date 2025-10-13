import React from 'react'
import Logo from '../components/Logo'

const Dashboard = () => {
  return (
    <section>

        <nav className='relative'>
            {/* Logo */}
            <Logo/>

            {/* Profile */}
            <div className='absolute top-4 right-4 mr-6 md:mr-12 lg:mr-24 xl:mr-32
            flex items-center gap-2'>
                <h1 className='border w-10 h-10 rounded-full text-xl flex items-center justify-center
                text-white bg-gradient-to-r from-blue-600 to-green-600'>A</h1>
            </div>
        </nav>

        <div className='pt-20 px-6 md:px-12 lg:px-24 xl:px-32 h-screen
        flex items-start'>
            {/* Side bar */}
            <div className='flex-1 h-full mt-10 flex flex-col items-start gap-4 py-10 text-lg
            border-r border-gray-400 '>
                <button className='border border-white px-2 py-1 rounded cursor-pointer
                hover:border-blue-600 active:opacity-80 transition-all duration-200'>
                    Dashboard
                </button>
               <button className='border border-white px-2 py-1 rounded cursor-pointer
                hover:border-blue-600 active:opacity-80 transition-all duration-200'>
                    Posted Projects
                </button>
                <button className='border border-white px-2 py-1 rounded cursor-pointer
                hover:border-blue-600 active:opacity-80 transition-all duration-200'>
                    Manage Applications
                </button>
                 <button className='border border-white px-2 py-1 rounded cursor-pointer
                hover:border-blue-600 active:opacity-80 transition-all duration-200'>
                    Analytics
                </button>
                 <button className='border border-white px-2 py-1 rounded cursor-pointer
                hover:border-blue-600 active:opacity-80 transition-all duration-200'>
                    Settings
                </button>
            </div>

            <div className='relative flex-4 mt-10 py-10 px-10 h-full'>
                {/* Full Name */}
                <h1 className='absolute -top-10 text-2xl flex items-start font-extrabold
                bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent'>
                    Amir Sadik <span className='text-[8px] font-mono text-gray-900 bg-gray-200 p-1 rounded-xl ml-1'>Company</span>
                </h1>
                
                {/* Post new project */}
                <button className='fixed top-20 right-32 text-white font-medium p-4 bg-blue-600
                rounded-xl shadow-xl hover:opacity-80 active:opacity-100 cursor-pointer'>
                    + Post new project
                </button>

                {/* Overview */}
                <h1 className='text-4xl font-extralight underline'>Overview</h1>
                <div className='mt-10 flex items-center gap-10 text-center'>
                    <div className=''>
                        <p className='text-7xl text-blue-600 bg-blue-300 w-fit mx-auto font-semibold
                        px-8 py-2 rounded-xl'>5</p>
                        <p className='mt-2 text-5xl font-serif'>Projects</p>
                    </div>
                    <div>
                        <div>
                            <p className='text-3xl text-green-600 bg-green-300 w-fit mx-auto font-semibold
                        px-6 py-2 rounded-xl'>3</p>
                            <p className='mt-2 text-2xl font-serif'>Active</p>
                        </div>
                        <div>
                            <p className='text-3xl text-red-600 bg-red-300 w-fit mx-auto font-semibold
                        px-6 py-2 rounded-xl'>2</p>
                            <p className='mt-2 text-2xl font-serif'>Closed</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </section>
  )
}

export default Dashboard