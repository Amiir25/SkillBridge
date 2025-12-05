import React from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import api from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const CompanyProfileSetup = () => {

    const navigate = useNavigate();
    const [setupSuccess, setSetupSuccess] = useState(null);
    const [setupFail, setSetupFail] = useState(null);

    // Check if company has profile
    useEffect(() => {
        const checkCompanyProfile = async () => {
            try {
                const res = await api.get('/profile/company/me');
                if (res.data.exists) {
                    navigate('/company/dashboard');
                }
            } catch (error) {
                console.error('Profile check failed');
            }
        }

        checkCompanyProfile();
    }, [])

    // Validation schema
    const schema = yup.object().shape({
        companyName: yup.string().required(),
        description: yup.string().required(),
        location: yup.string().required(),
        companySize: yup.string().oneOf(['Small', 'Medium', 'Large']). default(''),
        industry: yup.string(),
        website: yup.string(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    // Submit form
    const onSubmit = async (data) => {
        try {
            await api.post('/profile/company/profile-setup', data);
            setSetupSuccess('Profile saved successfully');
            setTimeout(() => {
                setSetupSuccess(null);
                navigate('/company/dashboard')
            }, 2000);

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Creation failed!';
            setSetupFail(errorMsg);
            setTimeout(() => { setSetupFail(null) }, 2000);
        }
    }

    return (
        <section className='relative px-6 md:px-12 lg:px-24 xl:px-32 my-20'>

            {/* Title */}
            <h1 className='text-2xl md:text-3xl lg:text-4xl text-gray-900 text-center font-black'>
                Setup your profile
            </h1>

            {/* Post message */}
            <p className={`fixed -top-10 opacity-0 left-1/2 -translate-1/2 w-full md:w-[600px] text-center text-white py-4 rounded-xl
            ${ setupSuccess && 'top-10 bg-green-500 opacity-100' } ${ setupFail && 'top-10 bg-red-500 opacity-100' }
            transition-all duration-300`}>
                { setupSuccess ? setupSuccess : setupFail }
            </p>

            {/* Form */}
            <form onSubmit={ handleSubmit(onSubmit) } className='mt-20 w-full md:w-[600px] px-6 mx-auto'>

                <div>

                    {/* Company Name */}
                    <div className='mt-4'>
                        <label htmlFor="companyName" className='block md:text-xl'>Company Name</label>
                        <input type="text" id='companyName' placeholder='Ex. Altra PLC'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.companyName && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('companyName') } />
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
        </section>
    )
}

export default CompanyProfileSetup;