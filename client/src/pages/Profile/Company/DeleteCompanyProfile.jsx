import React from 'react'
import api from '../../../utils/axiosConfig'
import { useNavigate } from 'react-router-dom'

const DeleteCompanyProfile = ({ onReturn, onProfileDelete }) => {

    const navigate = useNavigate();

    // Delete profile
    const deleteProfile = async () => {
        try {
            await api.get('/profile/company/profile-delete');
            onProfileDelete();
            navigate('/');
        } catch (error) {
            console.error('Error deleting account:', error);
        }
    }

    return (
        <section className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-900/80'>
            <div className='bg-white w-[380px] p-4 rounded-xl'>

                {/* Close icon */}
                <div
                onClick={ onReturn }
                className='flex justify-end'>
                    <p className='bg-black text-white w-8 h-8 rounded-full flex items-center justify-center
                    text-xl font-bold cursor-pointer'>
                        X
                    </p>
                </div>

                {/* Icon */}
                <div className='mt-10 bg-red-500 text-white w-24 h-24 rounded-full flex items-center justify-center
                text-7xl font-bold mx-auto'>
                    !
                </div>

                <div className='mt-10 text-center'>
                    <p className='text-xl font-semibold'>
                        Are you sure you want to delete your account?
                    </p>
                    <p className='mt-2 text-gray-700'>All your data will be lost!</p>
                </div>

                <div className='flex justify-end'>
                    <button 
                    onClick={ deleteProfile }
                    className='mt-10 bg-rose-500 text-white px-4 py-1 rounded
                    hover:opacity-80 active:opacity-100 cursor-pointer'>
                        Delete
                    </button>
                </div>

            </div>
        </section>
    )
}

export default DeleteCompanyProfile