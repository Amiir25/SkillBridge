import React, { useEffect, useState } from 'react'
import CloseProject from './CloseProject';
import UpdateProject from './UpdateProject';
import { useDashboardData } from '../Dashboard/useDashboardData';
import DashboardSidebar from '../Dashboard/DashboardSidebar';

const ManageProjects = () => {

    // Get user data from useDashboardData hook
    const {
        userData: companyData,
        userProfile: companyProfile,
        userProjects: companyProjects,
        isLoading,
        refreshData,
    } = useDashboardData();

    // Handle Project closing
    const [closedProject, setClosedProject] = useState(null);
    const handleProjectClose = () => {
        setClosedProject(null);
        refreshData();
    }

    // Handle project updating
    const [updatedProject, setUpdatedProject] = useState(null);
    const handleProjectUpdate = () => {
        setUpdatedProject(null);
        refreshData();
    }

    // Handle popup screens
    const handlePopups = () => {
        setClosedProject(null);
        setUpdatedProject(null);
    }

    // Render logic (Loading state)
    if (isLoading || !companyData) {
        return (
        <div className='flex items-center justify-center h-screen md:text-2xl font-semibold
        tracking-wide animate-pulse'>
            Loading Projects...
        </div>
        )
    }

    return (
        <section className='flex items-start h-screen'>

            {/* Dashboard sidebar */}
            <DashboardSidebar
                userData={ companyData }
                userProfile={ companyProfile }
            />

            <div className='flex-3 p-10 grid grid-cols-1 md:grid-cols-2 gap-8'>
                {
                    companyProjects?.map((project, i) => (
                        <div key={i} className='relative bg-blue-100 p-2 rounded-xl h-[380px]'>

                            <div>
                                
                                <div className={`absolute top-0 right-0 text-white text-sm px-2 py-1
                                ${ project.status === 'Open' ? 'bg-green-600' : 'bg-gray-500' } `}>
                                    { project.status }
                                </div>

                                <div>
                                    <h1 className='text-3xl font-semibold'>{ project.title }</h1>
                                    <div className='w-fit flex items-center gap-8 text-sm text-gray-700'>
                                        <p>${ project.price }</p>
                                        <p>{ project.duration }</p>
                                        {/* <p>{ project.createdAt }</p> */}
                                    </div>
                                </div>
                                
                                <p className='my-4 text-sm'>{ project.description }</p>

                                <div className='flex items-center gap-6 text-gray-800 font-serif'>
                                    {
                                        project.skills.map((skill, i) => (
                                            <p key={i}>
                                                { skill }
                                            </p>
                                        ))
                                    }
                                </div>
                                
                            </div>

                            <div className='absolute bottom-4 left-14 right-14'>
                                {/* Buttons */}
                                <div className='w-full mt-10 flex items-center justify-center gap-2'>
                                
                                    <button
                                    onClick={ () => setClosedProject(project) }
                                    className={`${ project.status !== 'Open' && 'hidden' } 
                                    border border-gray-700 text-gray-700 w-24 py-1 rounded cursor-pointer
                                    hover:opacity-90 active:opacity-100`}>
                                        Close
                                    </button>
                                    <button
                                    onClick={ () => setUpdatedProject(project) }
                                    className='border border-blue-600 text-blue-600 text w-24 py-1 rounded cursor-pointer
                                    hover:opacity-90 active:opacity-100'>
                                        Update
                                    </button>
                                    <button className='border border-rose-600 text-rose-600 w-24 py-1 rounded cursor-pointer
                                    hover:opacity-90 active:opacity-100'>
                                        Delete
                                    </button>
                                </div>

                                {/* Applicants button */}
                                <div className='mt-4'>
                                    <button className='w-full py-1 bg-gradient-to-r from-blue-600 to-green-600 text-white
                                    tracking-wide rounded cursor-pointer hover:opacity-90 active:opacity-100'>
                                        Manage Applicants
                                    </button>
                                    <p className='text-[10px] tracking-wide text-center'>
                                        { project.applicants } students applied
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))
                }
                {/* Close project */}
                {
                    closedProject &&
                    <CloseProject
                        projectId={ closedProject._id }
                        projectTitle={ closedProject.title }
                        applicants={ closedProject.applicants }
                        onReturn={ handlePopups }
                        onProjectClose={ handleProjectClose}
                    />
                }
                {/* Update project */}
                {
                    updatedProject &&
                    <UpdateProject
                        project={ updatedProject }
                        onReturn={ handlePopups }
                        onProjectUpdate={ handleProjectUpdate }
                    />
                }
            </div>
        </section>
    )
}

export default ManageProjects