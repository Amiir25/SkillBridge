import React from 'react'
import api from '../../utils/axiosConfig'

const CloseProject = ({ projectId, projectTitle, applicants, onReturn, onProjectClose }) => {

    const handleProjectClose = async () => {
        try {
            const res = await api.put(`/projects/close-project/${projectId}`);
            console.log('Close porject:', res);
            onProjectClose();
        } catch (error) {
            console.error('Error closing project:', error.response?.data?.message);
            onReturn();
        }
    }

    return (
        <section className='fixed top-0 left-0 w-full h-full flex items-center justify-center
        bg-gray-800/80 z-10'>
            <div className='bg-white w-[480px] p-4 text-left rounded-xl'>

                <div onClick={ onReturn } className='flex justify-end'>
                    <p className='m-2 text-xl w-8 h-8 bg-black text-white rounded-full
                    flex items-center justify-center opacity-90 hover:opacity-100 cursor-pointer'>
                    X
                    </p>
                </div>
                
                <div className='mt-10 bg-blue-100 p-2 rounded-xl'>
                    <h1 className='text-4xl font-semibold'>{ projectTitle }</h1>
                    <h2 className='text-xl text-gray-700 tracking-wide'>{ applicants } applicants</h2>
                </div>

                <div className='mt-10 text-center tracking-wide'>
                    <p className='text-3xl'>
                        Are you sure you want to close this project?
                    </p>
                    <p className='mt-2 text-lg text-gray-700'>
                        This project will no longer accept applicants.
                    </p>
                </div>

                <div className='text-right mt-10'>
                    <button
                    onClick={ handleProjectClose }
                    className={`bg-rose-500 text-white text-xl px-4 py-2 rounded-xl cursor-pointer`}>
                        Close Project
                    </button>
                </div>
            </div>
        </section>
    )
}

export default CloseProject