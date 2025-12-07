import React from 'react'
import { companyDashboard, studentDashboard } from '../../assets/dashboard'
import { Link, useLocation } from 'react-router-dom';

const DashboardSidebar = ({ userData, userProfile }) => {

    const location = useLocation();

    const sidebarBtns = userData.role === 'Company' ? companyDashboard : studentDashboard;

    return (
        <section className='h-full'>
            <div className='px-4 py-10 h-full border-r border-gray-400'>
            
                {/* Profile */}
                <div className='flex gap-4'>
                    <h1 className='border w-10 h-10 rounded-full text-xl flex items-center justify-center
                    text-white bg-gradient-to-r from-blue-600 to-green-600'>
                        { 
                            userData.role === 'Company' ?
                            userProfile?.companyName[0] || 'C'
                            :
                            userProfile?.firstName[0] || 'S'
                        }
                    </h1>
                    
                    <div className=''>
                        {/* Full Name */}
                        <h1 className='text-xl font-semibold'>
                            { 
                                userData.role === 'Company' ?
                                <span>{ userProfile?.companyName }</span>
                                :
                                <span>{ userProfile?.firstName } { userProfile?.lastname }</span>
                            }
                        </h1>
                        <p className='text-xs font-mono text-gray-900 bg-gray-200 px-2 py-1
                        rounded-xl w-fit tracking-wide'>
                            { 
                                userData.role === 'Company' ?
                                <span>{ userProfile?.industry } Company</span>
                                :
                                <span>{ userProfile?.year } year { userProfile?.major } student</span>
                            }
                        </p>
                    </div>
                </div>

                {/* Sidebar buttons */}
                <div className='mt-10 flex flex-col items-start gap-4 text-lg'>
                    {
                        sidebarBtns.map((btn, i) => (
                            <Link key={i} to={`${btn.path}`}>
                                <button className={`border border-transparent px-2 py-1 rounded cursor-pointer
                                hover:border-blue-600 active:opacity-80 transition-all duration-200
                                ${ location.pathname.includes(`${btn.id}`) && 'bg-blue-600 text-white' }`}>
                                    { btn.name }
                                </button>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default DashboardSidebar