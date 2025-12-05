import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';


const StudentDashboard = () => {

    const navigate = useNavigate();
    const { user } = useAuth();

    // Fetch student data
    useEffect(() => {
        const fetchStudentData = async () => {
            try {
                const studentData = await api.get('/applications/student/dashboard');
                console.log('Student Data', studentData.data.data);
            } catch (error) {
                console.error('Error fetching student data:', error.response?.data?.message);
            }
        }

        // Check if student has a profile
        const checkUserProfile = async () => {
            try {
                const role = user.role;
                const res = await api.get(`/profile/${role}/me`);
                
                if (!res.data.exists) {
                    navigate(`/${role}/profile-setup`);
                    return
                }

                fetchStudentData();

            } catch (error) {
                console.error('Failed profile check');
            }
        }

        checkUserProfile();

    }, [user, navigate])

    return (
        <section className='pb-60'>

            <nav className='relative'>

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
                border-r border-gray-400'>
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

                {/* --- */}
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
                    <h1 className='text-4xl font-extrabold underline'>Overview</h1>
                    <div className='mt-6 flex items-center gap-10 '>
                        {/*  */}
                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-sky-500
                        shadow-xl'>
                            <h1 className='text-6xl font-bold mb-2'>4</h1>
                            <h1 className='text-xl'>Active Posts</h1>
                            <p className='text-xs text-gray-600'>+1 new post this week</p>
                        </div>
                        {/*  */}
                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-indigo-500
                        shadow-xl'>
                            <h1 className='text-6xl font-bold mb-2'>127</h1>
                            <h1 className='text-xl'>Applications Rec'd</h1>
                            <p className='text-xs text-gray-600'>15 pending review</p>
                        </div>
                        {/*  */}
                        <div className='px-8 py-4 rounded-2xl w-fit border-t-4 border-green-500
                        shadow-xl'>
                            <h1 className='text-6xl font-bold mb-2'>3.5k</h1>
                            <h1 className='text-xl'>Total Profile Views</h1>
                            <p className='text-xs text-gray-600'>15% increase vs. last month</p>
                        </div>
                    </div>

                    {/* Hiring pipeline */}
                    <div className='mt-20 px-2 py-6 rounded-xl shadow-xl'>
                        <h1 className='text-4xl font-extrabold underline'>Hiring Pipeline Overview</h1>
                        <div className='mt-10 flex items-center gap-4'>
                            {/* --- */}
                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-sky-500
                            bg-sky-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>62</h1>
                                <h1 className=''>New Applicants</h1>
                            </div>
                            {/* --- */}
                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-fuchsia-500
                            bg-fuchsia-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>35</h1>
                                <h1 className=''>Screening</h1>
                            </div>
                            {/* --- */}
                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-indigo-500
                            bg-indigo-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>18</h1>
                                <h1 className=''>Interviews</h1>
                            </div>
                            {/* --- */}
                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-amber-500
                            bg-amber-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>4</h1>
                                <h1 className=''>Offer Pending</h1>
                            </div>
                            {/* --- */}
                            <div className='px-4 py-4 rounded-2xl w-36 border-b-4 border-b-green-500
                            bg-green-200 text-center'>
                                <h1 className='text-4xl font-bold mb-2'>2</h1>
                                <h1 className=''>Hired</h1>
                            </div>
                        </div>
                    </div>

                    {/* Active Job Postings */}
                    <div className='mt-20 px-2 py-6 rounded-xl shadow-xl'>
                        <h1 className='text-4xl font-extrabold underline'>Active Project Postings</h1>
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
                                {/* --- */}
                                <tr className='font-medium'>
                                    <td>Data Entry</td>
                                    <td><span className='text-cyan-600 font-bold'>52</span> total </td>
                                    <td className='text-green-800 rounded-full'>Active</td>
                                    <td className='flex items-center justify-center gap-2'>
                                        <span className='text-sky-500'>Manage</span>
                                        <span className='text-red-500'>Close</span>
                                    </td>
                                </tr>
                                {/* --- */}
                                <tr className='font-medium'>
                                    <td>Customer Support</td>
                                    <td><span className='text-cyan-600 font-bold'>48</span> total </td>
                                    <td className='text-green-800 rounded-full'>Active</td>
                                    <td className='flex items-center justify-center gap-2'>
                                        <span className='text-sky-500'>Manage</span>
                                        <span className='text-red-500'>Close</span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>


        </section>
    )
}

export default StudentDashboard;