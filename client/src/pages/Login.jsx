import React from 'react'
import { images } from '../assets/images'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
        const res = await fetch("http://localhost:4000/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log("Login Response:", data);

        if (data.token) {
            localStorage.setItem("token", data.token);
        }
        navigate('/projects');

        } catch (error) {
        console.log(error);
        }
    };

    return (
        <section
        style={{ backgroundImage: `url(${images.bg})` }}
        className='h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center'>
            <div className='w-100 h-120 border-5 border-gray-100 rounded-xl px-8 py-10'>

                {/* Logo */}
                <Link to={'/'}>
                    <img src="/logo-color.png" alt="SkillBridge logo image"
                    className='w-60 mx-auto' />
                </Link>

                {/* Title */}
                <h1 className='mt-4 text-xl text-gray-600 text-center'>Sign in to your account</h1>

                {/* Form */}
                <form className='mt-8'>
                    <div>
                        <label htmlFor="email" className='block text-xl'>Email</label>
                        <input
                        type="text"
                        id='email'
                        placeholder='Enter your email'
                        value={email}
                        onChange={ (e) => setEmail(e.target.value) }
                        className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                    </div>
                    
                    <div className='mt-4'>
                        <label htmlFor="password" className='block text-xl'>Password</label>
                        <input
                        type="password"
                        id='password'
                        placeholder='Enter your password'
                        value={password}
                        onChange={ (e) => setPassword(e.target.value) }
                        className='w-full border border-gray-800/50 p-2 rounded outline-0' />
                    </div>

                    {/* Login Button */}
                    <button
                    onClick={handleLogin}
                    className='mt-8 w-full py-2 rounded text-gray-100 text-xl text-semibold cursor-pointer
                    bg-gradient-to-r from-blue-600 to-green-600 hover:opacity-90 active:opacity-100'>
                        Login
                    </button>

                    <p className='mt-4 text-sm text-center'>
                        Don't have an account?
                        <Link to={'/register'} className='text-blue-600'> Register</Link>
                    </p>
                </form>
            </div>

        </section>
    )
}

export default Login
// --------------
// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Logiin() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async () => {
//     try {
//       const res = await fetch("http://localhost:4000/api/auth/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       console.log("Login Response:", data);

//       if (data.token) {
//         localStorage.setItem("token", data.token);
//       }
//       navigate('/projects');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <h2>Test Login</h2>
//       <input 
//         placeholder="Email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//       /><br/><br/>
      
//       <input 
//         placeholder="Password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         type="password"
//       /><br/><br/>

//       <button onClick={handleLogin}>Login</button>
//     </div>
//   );
// }
