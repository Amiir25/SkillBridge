import React from 'react'
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form';
import api from '../../utils/axiosConfig';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const UpdateProject = ({ project, onReturn, onProjectUpdate }) => {

    const navigate = useNavigate();
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [updateFail, setUpdateFail] = useState(null);

    // Validation schema
    const schema = yup.object().shape({
        title: yup.string().required(),
        description: yup.string().required(),
        skills: yup.string().required(),
        duration: yup.string().oneOf(['1 day', '1 - 3 days', '3 - 5 days', '1 week']),
        price: yup.number().required().typeError().positive(),
        status: yup.string().oneOf(['Open', 'Closed']),
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: {
            title: project.title,
            description: project.description,
            skills: project.skills,
            duration: project.duration,
            price: project.price,
            status: project.status,
        }
    })

    // Submit form
    const onSubmit = async (data) => {
        try {
            // Change skills to array
            const formattedData = {
                ...data,
                skills: data.skills.split(',').map(s => s.trim()),
            }
            await api.put(`/projects/update-project/${project._id}`, formattedData);
            setUpdateSuccess('Project updated successfully');
            setTimeout(() => {
                setUpdateSuccess(null);
                onProjectUpdate();
            }, 2000);

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Project updating failed!';
            setUpdateFail(errorMsg);
            setTimeout(() => {
                setUpdateFail(null);
                onReturn();
            }, 2000);
        }
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

                    <div className='mt-4'>
                        <label htmlFor="title" className='block md:text-xl'>Title</label>
                        <input 
                        type="text" id='title' placeholder='Ex. Customer Feedback Data Analysis'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.title && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('title') } />
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="description" className='block md:text-xl'>Description</label>
                        <textarea 
                        id="description" rows={6} placeholder='Describe your project requirements, goals, and specific details...'
                        className={`mt-2 w-full p-1 rounded-xl outline-0 border border-gray-400
                        ${ errors.description && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('description') }></textarea>
                    </div>
                    
                    <div className='mt-4'>
                        <label htmlFor="skills" className='block md:text-xl'>Skills</label>
                        <textarea
                        id="skills" rows={3} placeholder='List skills, comma-separated...'
                        className={`mt-2 w-full p-1 rounded-xl outline-0 border border-gray-400
                        ${ errors.skills && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('skills') }></textarea>
                    </div>
                    
                    <div className='mt-4'>
                        <label htmlFor="duration" className='block md:text-xl'>Duration</label>
                        <select id="duration" className={`mt-2 w-full px-2 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.duration && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('duration') }>
                            <option value="1 day">{ project.duration }</option>
                            <option value="1 day">1 day</option>
                            <option value="1 - 3 days">1 - 3 days</option>
                            <option value="3 - 5 days">3 - 5 days</option>
                            <option value="1 week">1 week</option>
                        </select>
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="price" className='block md:text-xl'>Price (USD)</label>
                        <input
                        type="number" id='price' placeholder='Enter project budget'
                        className={`mt-2 w-full px-1 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.price && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('price') } />
                    </div>

                    <div className='mt-4'>
                        <label htmlFor="status" className='block md:text-xl'>Status</label>
                        <select id="status"
                        className={`mt-2 w-full px-2 py-4 rounded-xl outline-0 border border-gray-400
                        ${ errors.status && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('status') }>
                            <option value="Open">{ project.status }</option>
                            <option value="Open">Open</option>
                            <option value="Closed">Closed</option>
                        </select>
                    </div>

                    {/* Post button */}
                    <button className='mt-20 w-full py-4 md:text-xl lg:text-2xl cursor-pointer rounded-xl
                    bg-gradient-to-r from-blue-600 to-green-600 text-white
                    hover:opacity-90 active:opacity-100 transition-all duration-300'>
                        Update
                    </button>
                </form>
            </div>
        </section>
        
    )
}

export default UpdateProject