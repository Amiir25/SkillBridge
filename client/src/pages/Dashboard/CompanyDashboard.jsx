import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import CloseProject from '../Project/CloseProject.jsx';
import UpdateProject from '../Project/UpdateProject.jsx';
import DashboardSidebar from './DashboardSidebar.jsx';
import { useDashboardData } from './useDashboardData.jsx';

const CompanyDashboard = () => {

    // Get user data from useDashboardData hook
    const {
        userData: companyData,
        userProfile: companyProfile,
        userProjects: companyProjects,
        isLoading,
        refreshData // function to refresh data
    } = useDashboardData();
    
    const activeProjects = companyProjects?.filter(p => p.status === 'Open');

    // Handle project closing
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

    // Handle popups
    const handlePopups = () => {
        setClosedProject(null);
        setUpdatedProject(null);
    }

    // Render logic (Loading state)
    if (isLoading || !companyData) {
        return (
        <div className='flex items-center justify-center h-screen md:text-2xl font-semibold
        tracking-wide animate-pulse'>
            Loading Dashboard Data...
        </div>
        )
    }

    return (
        <section className=''>

            <div className=' h-screen flex items-start'>

                {/* Side bar */}
                <DashboardSidebar
                    userData={ companyData }
                    userProfile={ companyProfile }
                />

                {/* --- */}
                <div className='relative flex-3 p-10 h-full'>
                    
                    {/* Post new project */}
                    <Link to={ '/create-project' }>
                        <button className='fixed top-4 right-12 text-white font-medium p-4 bg-blue-600
                        rounded-xl shadow-xl hover:opacity-80 active:opacity-100 cursor-pointer'>
                            + Post new project
                        </button>
                    </Link>

                    {/* Overview */}
                    <h1 className='text-4xl font-extrabold underline'>Overview</h1>
                    <div className='mt-6 flex items-center justify-between gap-10 '>

                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-sky-500 shadow-xl'>
                            <h1 className='text-5xl font-bold mb-2'>{ companyProjects?.length || 0 }</h1>
                            <h1 className='text-xl'>Projects Posted</h1>
                        </div>

                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-indigo-500 shadow-xl'>
                            <h1 className='text-5xl font-bold mb-2'>{ companyProjects?.applicants || 0 }</h1>
                            <h1 className='text-xl'>Applications Received</h1>
                        </div>
                        
                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-cyan-500 shadow-xl'>
                            <h1 className='text-5xl font-bold mb-2'>{ activeProjects?.length }</h1>
                            <h1 className='text-xl'>Active Posts</h1>
                        </div>
                    </div>

                    {/* Hiring pipeline */}
                    {/* <div className='mt-20 px-2 py-6 rounded-xl shadow-xl'>
                        <h1 className='text-4xl font-extrabold underline'>Hiring Pipeline Overview</h1>
                        <div className='mt-10 flex items-center gap-4'>

                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-sky-500
                            bg-sky-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>62</h1>
                                <h1 className=''>New Applicants</h1>
                            </div>

                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-fuchsia-500
                            bg-fuchsia-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>35</h1>
                                <h1 className=''>Screening</h1>
                            </div>

                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-indigo-500
                            bg-indigo-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>18</h1>
                                <h1 className=''>Interviews</h1>
                            </div>

                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-amber-500
                            bg-amber-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>4</h1>
                                <h1 className=''>Offer Pending</h1>
                            </div>

                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-green-500
                            bg-green-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>2</h1>
                                <h1 className=''>Hired</h1>
                            </div>
                        </div>
                    </div> */}

                    {/* Active Job Postings */}
                    <div className='mt-20 px-2 py-6 rounded-xl shadow'>
                        <h1 className='text-4xl font-extrabold underline'>Active Project Postings</h1>
                        {
                            !activeProjects
                            ?
                            <div>
                                <p className='mt-10 text-gray-600 tracking-wide'>There are no active projects.</p>
                            </div>
                            :
                            <table className='mt-10 w-full divide-y divide-gray-500'>
                                <thead className='bg-gray-200 text-lg text-gray-700'>
                                    <tr>
                                        <th>Project Title</th>
                                        <th>Applications</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody className='text-center'>
                                    {
                                        activeProjects.map((project, i) => (
                                            <tr key={i}>
                                                <td>{ project.title }</td>
                                                <td><span className='text-cyan-600 font-bold'>{ project.applicants.length }</span> total </td>
                                                <td className='text-green-800 rounded-full'>
                                                    <span className='px-2 py-1 bg-green-500 text-white rounded'>{ project.status }</span>
                                                </td>
                                                <td className='flex items-center justify-center gap-2'>
                                                    
                                                    <button
                                                    onClick={() => setUpdatedProject(project) }
                                                    className='text-sky-500 cursor-pointer'>
                                                        Update
                                                    </button>
                                                    
                                                    <button
                                                    onClick={ () => setClosedProject(project) }
                                                    className='text-red-500 cursor-pointer'>
                                                        Close
                                                    </button>
                                                </td>
                                            </tr>
                                        ))
                                    }
                                </tbody>
                            </table>
                        }
                        {/* Close project */}
                        {
                            closedProject &&
                            <CloseProject 
                                projectId={ closedProject._id }
                                projectTitle={ closedProject.title }
                                applicants={ closedProject.applicants }
                                onReturn={ handlePopups }
                                onProjectClose={ handleProjectClose }
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
                </div>
            </div>


        </section>
    )
}

export default CompanyDashboard;