import React, { useRef, useState } from 'react'
import { images } from '../../assets/images'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import api from '../../utils/axiosConfig';
import { useAuth } from '../../context/AuthContext';

const Register = () => {

    const navigate = useNavigate();
    const { login } = useAuth();
    const [loginError, setLoginError] = useState(null);
    const timeoutRef = useRef(null);

    // Validation schema
    const schema = yup.object().shape({
        username: yup
            .string()
            .required('username is required')
            .matches(/^[a-z0-9_]+$/, 'Use only lowercase letters, numbers, or underscores'),
        email: yup
            .string()
            .email('Enter a valid email address')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password is required')
            .min(4, 'Password must be at leat 4 characters')
            .max(30, 'Password shouldn not br more than 30 characters.'),
        confirmPassword: yup
            .string()
            .required('You have to confirm your password')
            .oneOf([yup.ref('password'), null], 'Password not match'),
        role: yup
            .string()
            .oneOf(['Student', 'Company'])
            .default('Student')
    })

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    })

    const onSubmit = async (data) => {
        try {
            await api.post('/auth/register', data);
            const loginData = { email: data.email, password: data.password };
            
            // Redirect
            const loginResponse = await login(loginData);
            if (loginResponse.user.role === 'Company') {
                navigate('/company/profile-setup');
            } else {
                navigate('/student/profile-setup');
            }
    
        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Registration failed';
            setLoginError(errorMsg);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {setLoginError(null)}, 3000);
        }
    }

    return (
        <section
        style={{ backgroundImage: `url(${images.bg})` }}
        className='h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center'>
            <div className='relative w-100 h-120 border-5 border-gray-100 rounded-xl px-8 py-10
            overflow-y-scroll [scrollbar-width:none] [&::-webkit-scrollbar]:hidden'>

                {/* Logo */}
                <img src="/logo-color.png" alt="SkillBridge logo image"
                className='w-60 mx-auto' />

                {/* Title */}
                <h1 className='mt-4 text-xl text-gray-600 text-center'>Create your account</h1>

                {/* Login error */}
                <p className={`absolute left-0 w-full text-center text-xl tracking-wide bg-red-500 text-white
                px-4 py-2 rounded ${ loginError ? 'top-0 opacity-100' : '-top-14 opacity-0' } transition-all duration-300`}>
                    { loginError }
                </p>

                {/* Form */}
                <form onSubmit={ handleSubmit(onSubmit) } className='mt-8'>
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
                    
                    <div className='mt-4'>
                        <label htmlFor="email" className='block text-xl'>Email</label>
                        <input type="text" id='email' placeholder='Enter your email'
                        className={`w-full border border-gray-800/50 p-2 rounded outline-0
                        ${ errors.email && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('email') } />
                        {
                            errors.email &&
                            <p className='text-red-500 text-sm tracking-wider'>
                                { errors.email.message }
                            </p>
                        }
                    </div>
                    
                    <div className='mt-4'>
                        <label htmlFor="password" className='block text-xl'>Password</label>
                        <input type="password" id='password' placeholder='Enter your password'
                        className={`w-full border border-gray-800/50 p-2 rounded outline-0
                        ${ errors.password && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('password') } />
                        {
                            errors.password &&
                            <p className='text-red-500 text-sm tracking-wider'>
                                { errors.password.message }
                            </p>
                        }
                    </div>
                    
                    <div className='mt-4'>
                        <label htmlFor="confirmPassword" className='block text-xl'>Confirm Password</label>
                        <input type="password" id='confirmassword' placeholder='Confirm your password'
                        className={`w-full border border-gray-800/50 p-2 rounded outline-0
                        ${ errors.confirmPassword && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        { ...register('confirmPassword') } />
                        {
                            errors.confirmPassword &&
                            <p className='text-red-500 text-sm tracking-wider'>
                                { errors.confirmPassword.message }
                            </p>
                        }
                    </div>

                    <div className="mt-4">
                        <label htmlFor="role" className='block text-xl'>Role</label>
                        <select name="role-selection" id="role"
                        className={`w-full border border-gray-800/50 p-2 rounded outline-0
                        ${ errors.role && `border border-red-500 shadow shadow-red-300
                        transition-all duration-500 ` }`}
                        {  ...register('role') } >
                            <option>Student</option>
                            <option>Company</option>
                        </select>
                        {
                            errors.role &&
                            <p className='text-red-500 text-sm tracking-wider'>
                                { errors.role.message }
                            </p>
                        }
                    </div>

                    <button className='mt-8 w-full py-2 rounded text-gray-100 text-xl text-semibold cursor-pointer
                    bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 active:opacity-100'>
                        Register
                    </button>

                    <p className='mt-4 text-sm text-center'>
                        Already have an account?
                        <Link to={'/login'} className='text-blue-600'> Login</Link>
                    </p>
                </form>
            </div>

        </section>
    )
}

export default Register