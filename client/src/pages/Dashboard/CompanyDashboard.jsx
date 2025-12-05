import React, { useState } from 'react'
import { useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import api from '../../utils/axiosConfig.js';
import { useAuth } from '../../context/AuthContext.jsx';
import { sidebarBtns } from '../../assets/company/dashboard.js';
import CloseProject from '../Project/CloseProject.jsx';
import UpdateProject from '../Project/UpdateProject.jsx';

const CompanyDashboard = () => {

    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();

    const [companyData, setCompanyData] = useState(null);
    const [companyProfile, setCompanyProfile] = useState(null);
    const [projects, setProjects] = useState(null);

    // Fetch company data
    useEffect(() => {

        if (!user) return;
        
        const fetchCompanyData = async () => {
            try {
                const res = await api.get('/applications/company/dashboard');
                const company = res.data;
                console.log('Company:', company)

                setCompanyData(company.companyData);
                setCompanyProfile(company.companyProfile);
                if (company.projects) setProjects(company.projects); // For non-empty project

            } catch (error) {
                console.error('Error fetching company data:', error.response?.data?.message);
            }
        }

        // Check if company has a profile
        const checkUserProfile = async () => {
            try {
                const role = user.role;
                const res = await api.get(`/profile/${role}/me`);

                if (!res.data.exists) {
                    navigate(`/${role}/profile-setup`);
                    return
                }

                fetchCompanyData();

            } catch (error) {
                console.error('Failed profile check');
            }
        }

        checkUserProfile();

    }, [user])

    // Calculate active projects
    const activeProjects = projects?.filter(p => p.status === 'Open').length || 0;

    // Handle project closing
    const [closedProject, setClosedProject] = useState(null);
    const handleProjectClose = () => {
        setClosedProject(null);
        window.location.reload();
    }

    // Handle project updating
    const [updatedProject, setUpdatedProject] = useState(null);
    const handleProjectUpdate = () => {
        setUpdatedProject(null);
        window.location.reload();
    }

    // Handle popups
    const handlePopups = () => {
        setClosedProject(null);
        setUpdatedProject(null);
    }

    return (
        <section className=''>

            <div className=' h-screen flex items-start'>

                {/* Side bar */}
                <div className='flex-1 h-full ml-2 py-10 border-r border-gray-400'>

                    {/* Profile */}
                    <div className='flex gap-4'>
                        <h1 className='border w-10 h-10 rounded-full text-xl flex items-center justify-center
                        text-white bg-gradient-to-r from-blue-600 to-green-600'>
                            { companyProfile?.companyName[0] || 'C' }
                        </h1>
                        
                        <div className=''>
                            {/* Full Name */}
                            <h1 className='text-xl font-semibold'>
                                { companyProfile?.companyName }
                            </h1>
                            <p className='text-xs font-mono text-gray-900 bg-gray-200 px-2 py-1
                            rounded-xl w-fit tracking-wide'>
                                    { companyData?.role }
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

                {/* --- */}
                <div className='relative flex-3 py-10 px-10 h-full'>
                    
                    {/* Post new project */}
                    <Link to={ '/create-project' }>
                        <button className='fixed top-8 right-32 text-white font-medium p-4 bg-blue-600
                        rounded-xl shadow-xl hover:opacity-80 active:opacity-100 cursor-pointer'>
                            + Post new project
                        </button>
                    </Link>

                    {/* Overview */}
                    <h1 className='text-4xl font-extrabold underline'>Overview</h1>
                    <div className='mt-6 flex items-center gap-10 '>

                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-sky-500 shadow-xl'>
                            <h1 className='text-5xl font-bold mb-2'>{ projects?.length || 0 }</h1>
                            <h1 className='text-xl'>Projects Posted</h1>
                        </div>

                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-indigo-500 shadow-xl'>
                            <h1 className='text-5xl font-bold mb-2'>{ projects?.applicants || 0 }</h1>
                            <h1 className='text-xl'>Applications Received</h1>
                        </div>
                        
                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-cyan-500 shadow-xl'>
                            <h1 className='text-5xl font-bold mb-2'>{ activeProjects }</h1>
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
                            !projects
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
                                        projects.filter(p => p.status === 'Open').map((project, i) => (
                                            <tr key={i}>
                                                <td>{ project.title }</td>
                                                <td><span className='text-cyan-600 font-bold'>{ project.applicants.length }</span> total </td>
                                                <td className='text-green-800 rounded-full'>{ project.status }</td>
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