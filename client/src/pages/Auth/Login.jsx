import React, { useRef, useState } from 'react'
import { images } from '../../assets/images'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuth } from '../../context/AuthContext.jsx';

const Login = () => {

    const navigate = useNavigate();
    const { login }  = useAuth();
    const [loginError, setLoginError] = useState(null);
    const timeoutRef = useRef(null);

    // Validation schema
    const schema = yup.object().shape({
        email: yup
            .string()
            .email('Enter a valid email address')
            .required('Email is required'),
        password: yup
            .string()
            .required('Password is required'),
    });

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async (data) => {
        try {
            const loginResponse = await login(data);
            if (loginResponse.user.role === 'Company') {
                navigate('/company/dashboard');
            } else {
                navigate('/student/dashboard');
            }

        } catch (error) {
            const errorMsg = error.response?.data?.message || 'Login failed';
            setLoginError(errorMsg);

            if (timeoutRef.current) clearTimeout(timeoutRef.current);

            timeoutRef.current = setTimeout(() => {setLoginError(null)}, 3000);
        }
    }

    return (
        <section
        style={{ backgroundImage: `url(${images.bg})` }}
        className='h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center'>
            <div className='relative w-[320px] md:w-[480px] h-120 border-5 border-gray-100
            rounded-xl px-8 py-10 overflow-hidden'>

                {/* Logo */}
                <Link to={'/'}>
                    <img src="/logo-color.png" alt="SkillBridge logo image"
                    className='w-40 md:w-60 mx-auto' />
                </Link>

                {/* Title */}
                <h1 className='mt-4 text-lg md:text-xl text-gray-600 text-center'>Sign in to your account</h1>

                {/* Login error */}
                <p className={`absolute left-0 w-full text-center text-xl tracking-wide bg-red-500 text-white
                px-4 py-2 rounded ${ loginError ? 'top-0 opacity-100' : '-top-14 opacity-0' } transition-all duration-300`}>
                    { loginError }
                </p>

                {/* Form */}
                <form onSubmit={ handleSubmit(onSubmit) }  className='mt-8'>
                    
                    <div>
                        <label htmlFor="email" className='block md:text-xl'>Email</label>
                        <input type="text" id='email' placeholder='Enter your email'
                        className={`w-full border border-gray-800/50 p-2 rounded outline-0 text-sm md:text-md
                        ${ errors.email && `border border-red-500 shadow shadow-red-300
                            transition-all duration-500 ` }`}
                        { ...register('email') } />
                    </div>
                    
                    <div className='mt-4'>
                        <label htmlFor="password" className='block md:text-xl'>Password</label>
                        <input type="password" id='password' placeholder='Enter your password'
                        className={`w-full border border-gray-800/50 p-2 rounded outline-0 text-sm md:text-md
                        ${ errors.password && `border border-red-500 shadow shadow-red-300
                            transition-all duration-500 ` }`}
                        { ...register('password') } />
                    </div>

                    {/* Login Button */}
                    <button
                    className='mt-8 w-full py-2 rounded text-white text-lg md:text-xl text-semibold cursor-pointer
                    bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 active:opacity-100'>
                        Login
                    </button>

                    <p className='mt-4 text-xs md:text-sm text-center tracking-wide'>
                        Don't have an account?
                        <Link to={'/register'} className='text-blue-600'> Register</Link>
                    </p>
                </form>
            </div>

        </section>
    )
}

export default Login;