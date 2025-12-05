import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import api from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const Projects = () => {

    const navigate = useNavigate();
    const { user } = useAuth();
    const [allProjects, setAllProjects] = useState([]);

    useEffect(() => {

        // Fetch all projects
        const fetchProjects = async () => {
            try {
                const res = await api.get('/projects');
                setAllProjects(res.data.allProjects);
            } catch (error) {
                console.error('Error loading projects', error.response?.data.message);
            }
        }

        fetchProjects();

    }, []);

    // Customise text based on No of applicants
    const getApplicantText = (n) => {
        if (n === 0) return ('No student applied');
        if (n === 1) return ('1 student applied');
        return (`${n} students applied`);
    }

    return (
       <section className='mx-6 md:mx-12 lg:mx-24 xl:mx-32 mt-40'>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-200 p-2 rounded-xl'>
            {
                allProjects.map((project, i) => (
                    <div key={i} className='flex items-end gap-20'>

                        <div>
                            
                            <div>
                                <h1 className='text-2xl font-semibold'>{ project.title }</h1>
                                <div className='w-fi flex items-center gap-10 text-sm text-gray-600'>
                                    <p>${ project.price }</p>
                                    <p>{ project.duration }</p>
                                    {/* <p>{ project.createdAt }</p> */}
                                </div>
                            </div>
                            
                            <p className='my-4'>{ project.description }</p>

                            <div className='flex items-center gap-6'>
                                {
                                    project.skills.map((skill, i) => (
                                        <p key={i} className='bg-blue-200 px-4 py-1 rounded-xl'>
                                            { skill }
                                        </p>
                                    ))
                                }
                            </div>
                            
                            {/* <p>{ project.status }</p> */}
                        </div>

                        {/* Detail button */}
                        <div className='w-full'>
                            <Link to={`/project-detail/${project._id}`}>
                                <button className='bg-blue-600 text-white px-2 py-1 rounded'>
                                    See Detail
                                </button>
                            </Link>
                            
                            <p className='text-[10px] tracking-wide'>
                                { getApplicantText(project.applicants) }
                            </p>
                        </div>
                    </div>
                ))
            }
        </div>
       </section>
    )
}

export default Projects