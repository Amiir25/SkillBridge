import React from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import api from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

const StudentProfileSetup = () => {

    const navigate = useNavigate();
    const [setupSuccess, setSetupSuccess] = useState(null);
    const [setupFail, setSetupFail] = useState(null);

    // Check if student has profile
    useEffect(() => {
        const checkStudentProfile = async () => {
            try {
                const res = await api.get('/profile/student/me');
                if (res.data.exists) {
                    navigate('/student/dashboard');
                }
            } catch (error) {
                console.error('Profile check failed');
            }
        }

        checkStudentProfile();
    }, [])

    // Validation schema
    const schema = yup.object().shape({
        firstName: yup.string().required(),
        lastName: yup.string().required(),
        address: yup.string().required(),
        university: yup.string().required(),
        major: yup.string().required(),
        year: yup.string().oneOf(['1st year', '2nd year', '3rd year', '4th year', '5th year']),
        skills: yup.string(),
        bio: yup.string(),
        portfolioLink: yup.string(),
        resumeLink: yup.string(),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    // Submit form
    const onSubmit = async (data) => {
        try {
            // Change skills to array
            const formattedData = {
                ...data,
                skills: data.skills
                ? data.skills.split(',').map(s => s.trim()).filter(Boolean)
                : [],
            }
            await api.post('/profile/student/profile-setup', formattedData);
            setSetupSuccess('Profile saved successfully');
            setTimeout(() => {
                setSetupSuccess(null);
                navigate('/student/dashboard')
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

                    {/* First Name */}
                    <div className='mt-4'>
                        <label htmlFor="firstName" className='block md:text-xl'>First Name</label>
                        <input type="text" id='firstName' placeholder='Ex. Jon'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.firstName && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('firstName') } />
                    </div>
                    
                    {/* Last Name */}
                    <div className='mt-4'>
                        <label htmlFor="lastName" className='block md:text-xl'>Last Name</label>
                        <input type="text" id='lastName' placeholder='Ex. Doe'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.lastName && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('lastName') } />
                    </div>

                    {/* Bio */}
                    <div className='mt-4'>
                        <label htmlFor="bio" className='block md:text-xl'>Bio <span className='text-sm'> (Optional)</span> </label>
                        <textarea id="bio" rows={3} placeholder="Ex. I'm a graphic designer specializing in..."
                        className={`mt-2 w-full p-1 rounded-xl outline-0 border border-gray-400
                        ${ errors.bio && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('bio') }></textarea>
                    </div>
                    
                    {/* Address */}
                    <div className='mt-4'>
                        <label htmlFor="address" className='block md:text-xl'>Address</label>
                        <input type="text" id='address' placeholder='Ex. Addis Ababa, Ethiopia'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.address && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('address') } />
                    </div>
                    
                    {/* University */}
                    <div className='mt-4'>
                        <label htmlFor="university" className='block md:text-xl'>University</label>
                        <input type="text" id='university' placeholder='Ex. Addis Ababa Science and Technology University (AASTU)'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.university && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('university') } />
                    </div>
                    
                    {/* Major */}
                    <div className='mt-4'>
                        <label htmlFor="major" className='block md:text-xl'>Major</label>
                        <input type="text" id='major' placeholder='Ex. Computer Science'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.major && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('major') } />
                    </div>

                    {/* Year */}
                    <div className='mt-4'>
                        <label htmlFor="year" className='block md:text-xl'>Year</label>
                        <select id="year" className={`mt-2 w-full px-2 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.year && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('year') }>
                            <option value="1st year">1st year</option>
                            <option value="2nd year">2nd year</option>
                            <option value="3rd year">3rd year</option>
                            <option value="4th year">4th year</option>
                            <option value="5th year">5th year</option>
                        </select>
                    </div>

                    {/* Skills */}
                    <div className='mt-4'>
                        <label htmlFor="skills" className='block md:text-xl'>Skills <span className='text-sm'> (Optional)</span> </label>
                        <textarea id="skills" rows={3} placeholder='List skills, comma-separated...'
                        className={`mt-2 w-full p-1 rounded-xl outline-0 border border-gray-400
                        ${ errors.skills && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('skills') }></textarea>
                    </div>

                    {/* Portfolio Link */}
                    <div className='mt-4'>
                        <label htmlFor="portfolioLink" className='block md:text-xl'>Portfolio Link <span className='text-sm'> (Optional)</span></label>
                        <input type="text" id='portfolioLink' placeholder='Put the link to your portfolio website here...'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.portfolioLink && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('portfolioLink') } />
                    </div>

                    {/* Resume Link */}
                    <div className='mt-4'>
                        <label htmlFor="resumeLink" className='block md:text-xl'>Resume Link <span className='text-sm'> (Optional)</span></label>
                        <input type="text" id='resumeLink' placeholder='Put Google Drive/Canva link of your resume here...'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.resumeLink && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('resumeLink') } />
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

export default StudentProfileSetup;