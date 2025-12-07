import React, { useEffect, useState } from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import { useDashboardData } from '../../Dashboard/useDashboardData';
import api from '../../../utils/axiosConfig';

const UpdateCompanyProfile = ({ onReturn, onProfileUpdate }) => {

    // Get user data from useDashboardData
    const {
        userData: companyData,
        userProfile: companyProfile,
        userProjects: companyProjects,
        isLoading,
        refreshData,
    } = useDashboardData();

    // state variables
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [updateFail, setUpdateFail] = useState(null);

    // Validation schema
    const schema = yup.object().shape({
        companyName: yup.string().required(),
        username: yup
            .string()
            .required('username is required')
            .matches(/^[a-z0-9_]+$/, 'Use only lowercase letters, numbers, or underscores'),
        email: yup.string().email().required(),
        description: yup.string().required(),
        location: yup.string().required(),
        companySize: yup.string().oneOf(['Small', 'Medium', 'Large']). default(''),
        industry: yup.string(),
        website: yup.string(),
    })

    const { register, handleSubmit, formState: { errors }, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            companyName: '',
            username: '',
            email: '',
            description: '',
            location: '',
            companySize: '',
            industry: '',
            website: '',
        }
    })

    // Prefill the form fields
    useEffect(() => {
        if (companyData && companyProfile) {
            reset ({
                companyName: companyProfile.companyName,
                username: companyData.username,
                email: companyData.email,
                description: companyProfile.description,
                location: companyProfile.location,
                companySize: companyProfile.companySize,
                industry: companyProfile.industry,
                website: companyProfile.website,
            })
        }
    }, [companyData, companyProfile, reset]);


    // Submit form
    const onSubmit = async (data) => {
        try {
            await api.post('/profile/company/profile-update', data);
            setUpdateSuccess('Profile updated successfully');
            setTimeout(() => {
                setUpdateSuccess(null);
                onProfileUpdate();
            }, 2000);

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Update failed!';
            console.error('Error updating profile:', error);
            setUpdateFail(errorMsg);
            setTimeout(() => { setUpdateFail(null) }, 2000);
        }
    }

        // Loading state while data is being fetched
    if (isLoading || !companyData || !companyProfile) {
        return (
            <div className='flex items-center justify-center h-screen md:text-2xl font-semibold
            tracking-wide animate-pulse'>
                Loading Company Profile...
            </div>
        )
    }

    return (
        <section className='fixed top-0 left-0 w-full h-full flex justify-center
            bg-gray-800/80 z-10'>
                <div className='relative bg-white px-6 md:px-12 py-12 overflow-scroll'>

                    {/* Close icon */}
                    <div
                    onClick={ onReturn }
                    className=' flex justify-end'>
                        <p className='bg-black w-12 h-12 rounded-full text-white text-2xl font-bold
                        flex items-center justify-center opacity-90 cursor-pointer hover:opacity-100'>
                            X
                        </p>
                    </div>
                    
                    {/* Title */}
                    <h1 className='mt-20 text-2xl md:text-3xl lg:text-4xl text-gray-900 text-center font-black'>
                        Update project
                    </h1>

                    {/* Post message */}
                    <p className={`fixed -top-10 opacity-0 left-1/2 -translate-1/2 w-full md:w-[600px] text-center text-white py-4 rounded-xl
                    ${ updateSuccess && 'top-10 bg-green-500 opacity-100' } ${ updateFail && 'top-10 bg-red-500 opacity-100' }
                    transition-all duration-300`}>
                        { updateSuccess ? updateSuccess : updateFail }
                    </p>

                    {/* Form */}
                    <form onSubmit={ handleSubmit(onSubmit) } className='mt-20 w-full md:w-[600px] px-6 mx-auto'>

                        <div>
                            {/* Company Name */}
                            <div className='mt-4'>
                                <label htmlFor="companyName" className='block md:text-xl'>Company Name</label>
                                <input type="text" id='companyName' placeholder='Ex. Ultra PLC'
                                className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                                ${ errors.companyName && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                { ...register('companyName') } />
                            </div>
                            
                            {/* Username */}
                            <div className='mt-4'>
                                <label htmlFor="userName" className='block text-xl'>Username</label>
                                <input type="text" id='userName' placeholder='Enter your name'
                                className={`w-full border border-gray-800/50 p-2 rounded outline-0
                                ${ errors.username && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                {  ...register('username') } />
                                {
                                    errors.username &&
                                    <p className='text-red-500 text-sm tracking-wider'>
                                        { errors.username.message }
                                    </p>
                                }
                            </div>

                            {/* Email */}
                            <div className='mt-4'>
                                <label htmlFor="email" className='block text-xl'>Email</label>
                                <input type="text" id='email' placeholder='Enter your email'
                                className={`w-full border border-gray-800/50 p-2 rounded outline-0
                                ${ errors.email && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                { ...register('email') } />
                            </div>

                            {/* Description */}
                            <div className='mt-4'>
                                <label htmlFor="description" className='block md:text-xl'>Description</label>
                                <textarea id="description" rows={3} placeholder="Write a short description about your company..."
                                className={`mt-2 w-full p-1 rounded-xl outline-0 border border-gray-400
                                ${ errors.description && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                { ...register('description') }></textarea>
                            </div>
                            
                            {/* Location */}
                            <div className='mt-4'>
                                <label htmlFor="location" className='block md:text-xl'>Location</label>
                                <input type="text" id='location' placeholder='Ex. Addis Ababa, Ethiopia'
                                className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                                ${ errors.location && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                { ...register('location') } />
                            </div>

                            {/* Company size */}
                            <div className='mt-4'>
                                <label htmlFor="companySize" className='block md:text-xl'>Company Size</label>
                                <select id="companySize" className={`mt-2 w-full px-2 py-4 rounded-xl outline-0 border border-gray-400
                                ${ errors.companySize && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                { ...register('companySize') }>
                                    <option value="Small">Small</option>
                                    <option value="Medium">Medium</option>
                                    <option value="Large">Large</option>
                                </select>
                            </div>

                            {/* Industry */}
                            <div className='mt-4'>
                                <label htmlFor="industry" className='block md:text-xl'>Industry <span className='text-sm'> (Optional)</span></label>
                                <input type="text" id='industry' placeholder='Ex. Technology'
                                className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                                ${ errors.industry && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                { ...register('industry') } />
                            </div>

                            {/* Website */}
                            <div className='mt-4'>
                                <label htmlFor="website" className='block md:text-xl'>Website <span className='text-sm'> (Optional)</span></label>
                                <input type="text" id='website' placeholder='Ex. altraplc.com'
                                className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                                ${ errors.website && `border border-red-500 shadow shadow-red-300
                                transition-all duration-500 ` }`}
                                { ...register('website') } />
                            </div>

                        </div>


                        {/* Save button */}
                        <button className='mt-20 w-full py-4 md:text-xl lg:text-2xl cursor-pointer rounded-xl
                        bg-gradient-to-r from-blue-600 to-green-600 text-white
                        hover:opacity-90 active:opacity-100'>
                            Save
                        </button>
                    </form>
                </div>
            </section>
    )
}

export default UpdateCompanyProfile