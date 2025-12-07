import React, { useState } from 'react'
import { useDashboardData } from '../../Dashboard/useDashboardData'
import DashboardSidebar from '../../Dashboard/DashboardSidebar';
import UpdateCompanyProfile from './UpdateCompanyProfile';
import DeleteCompanyProfile from './DeleteCompanyProfile';

const CompanyProfile = () => {

    const {
        userData: companyData,
        userProfile: companyProfile,
        userProjects: companyProjects,
        isLoading,
        refreshData,
    } = useDashboardData();

    // state variables for profile update
    const [updateProfile, setUpdateProfile] = useState(false);
    const handleProfileUpdate = () => {
        setUpdateProfile(false);
        refreshData();
    }
    
    // state variables for profile delete
    const [deleteProfile, setDeleteProfile] = useState(false);
    const handleProfileDelete = () => {
        setDeleteProfile(false);
        refreshData();
    }

    // Handle popups
    const handlePopups = () => {
        setUpdateProfile(false);
        setDeleteProfile(false);
    }

    if (isLoading || !companyData) {
        return (
            <div className='flex items-center justify-center h-screen md:text-2xl font-semibold
            tracking-wide animate-pulse'>
                Loading Company Profile...
            </div>
        )
    }

    return (
        <section>
            <div className='flex items-start gap-10'>

                {/* Sidebar */}
                <DashboardSidebar
                    userData={ companyData }
                    userProfile={ companyProfile }
                />

                <div className='mt-10 flex-3'>
                    <h1 className='text-4xl font-semibold'>Company profile</h1>

                    <div className='mt-10'>

                        {/* Company Name */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Company Name</h2>
                            <p className='text-lg text-gray-600'>{ companyProfile.companyName }</p>
                        </div>
                        
                        {/* Username */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Username</h2>
                            <p className='text-lg text-gray-600'>@{ companyData.username }</p>
                        </div>
                        
                        {/* Email */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Email</h2>
                            <p className='text-lg text-gray-600'>{ companyData.email }</p>
                        </div>

                        {/* Company Description */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Company Description</h2>
                            <p className='text-lg text-gray-600'>{ companyProfile.description }</p>
                        </div>
                        
                        {/* Location */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Location</h2>
                            <p className='text-lg text-gray-600'>{ companyProfile.location }</p>
                        </div>
                        
                        {/* Company Size */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Company Size</h2>
                            <p className='text-lg text-gray-600'>{ companyProfile.companySize }</p>
                        </div>
                        
                        {/* Industry */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Industry</h2>
                            <p className='text-lg text-gray-600'>{ companyProfile.industry }</p>
                        </div>
                        
                        {/* Company Website */}
                        <div className='mb-8 flex items-center gap-8'>
                            <h2 className='text-xl font-bold'>Company Website</h2>
                            <p className='text-lg text-gray-600'>{ companyProfile.website }</p>
                        </div>
                        
                        {/* Posted Projects */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Posted Projects</h2>
                            <p className='text-lg text-gray-600'>{ companyProjects.length }</p>
                        </div>
                        
                        {/* Joined */}
                        <div className='mb-8 flex gap-4'>
                            <h2 className='text-xl font-bold'>Joined</h2>
                            <p className='text-lg text-gray-600'>{ companyData.createdAt.split('T')[0] }</p>
                        </div>

                        {/* Update button */}
                        <button
                        onClick={ () => setUpdateProfile(true) }
                        className='mt-10 bg-gradient-to-r from-blue-600 to-green-600 text-white px-8 py-2 rounded
                        hover:opacity-90 active::opacity-100 cursor-pointer'>
                            Update Profile
                        </button>
                        
                        {/* Delete button */}
                        <button
                        onClick={ () => setDeleteProfile(true) }
                        className='block mt-4 bg-rose-600 text-white px-8 py-2 rounded
                        hover:opacity-90 active::opacity-100 cursor-pointer'>
                            Delete Profile
                        </button>

                        {/* Update profile */}
                        {
                            updateProfile &&
                            <UpdateCompanyProfile
                                onReturn={ handlePopups }
                                onProfileUpdate={ handleProfileUpdate }
                            />
                        }

                        {/* Delete profile */}
                        {
                            deleteProfile &&
                            <DeleteCompanyProfile
                                onReturn={ handlePopups }
                                onProfileDelete={ handleProfileDelete }
                            />
                        }

                    </div>
                </div>

            </div>
        </section>
    )
}

export default CompanyProfile