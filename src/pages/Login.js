import React, { useState } from 'react'
import LoginImg from './images/Login.png'
import logo from '../components/images/logo.png'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import jwt_decode from 'jwt-decode'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const Login = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setFormErrors(validate({ email, password }));
        setFormSubmitted(true);

        try {

            if (!email || !password) {
                throw new Error('Email or Password required');
            }

            const response = await axios.post('https://capstone-backend-83aj.onrender.com/users/userLogin', {
                email: email,
                password: password
            })

            if (response.data.success || formSubmitted === true) {

                const decoded = jwt_decode(response.data.token);
                localStorage.setItem('name', decoded.firstName + " " + decoded.lastName);
                localStorage.setItem('user', decoded.loginUserEmail);
                localStorage.setItem('token', response.data.token);
                navigate('/');
                window.location.reload();
            }

        } catch (error) {
            if (error.response) {
                console.log(error.response.data.msg);
                toast(error.response.data.msg, {
                    className: "custom-toast",
                    draggable: true,
                    position: toast.POSITION.BOTTOM_CENTER
                });
            }
        }
    }

    const validate = (values) => {
        let errors = {};
        if (!values.email) {
            errors.email = '*Email is required';
        } else if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = '*Email address is invalid';
        }
        if (!values.password) {
            errors.password = '*Password is required';
        }
        return errors;
    }

    return (
        <>
            <motion.div layout>
                <div className='relative w-full h-screen bg-zinc-100/20'>
                    <img src={LoginImg} alt="/" className="absolute w-full h-full object-cover mix-blend-overlay"></img>
                    <div className='flex justify-center items-center h-full'>
                        <form onSubmit={handleSubmit} className='max-w-[400px] mx-auto w-full bg-[#2C3E50]/30 p-7 rounded-xl border border-[#e1e9f5]/20 relative'>
                            <h2 className='font-bold text-center text-5xl text-white'>
                                <img src={logo} alt="logo" className="w-20 h-20 inline-block"></img>
                            </h2>
                            <motion.div layout>
                                <div className='flex flex-col mb-5'>
                                    <label htmlFor='email' className="text-white py-2">Email</label>
                                    <input placeholder='example@email.com' value={email} onChange={(e) => setEmail(e.target.value)} className='border relative bg-[#e1e9f5] p-2 rounded-xl' type="email" />
                                    <motion.div layout>
                                        <p className="text-red-400 font-sans text-sm">{formErrors.email}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div layout>
                                <div className='flex flex-col mb-5'>
                                    <label htmlFor='password' className="text-white py-2">Password</label>
                                    <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border relative  bg-[#e1e9f5] p-2 rounded-xl' type="password" />
                                    <motion.div layout>
                                        <p className="text-red-400 font-sans text-sm">{formErrors.password}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <button className='w-full py-4 mt-8 bg-[#0c2b45]/80 border border-[#e1e9f5]/20 hover:bg-[#0c2b45]/100 relative rounded-xl text-white'>Sign In</button>
                            <p className='flex items-center mt-2 text-white py-2'><input type="checkbox" />Remember Me</p>
                            <p onClick={() => props.onFormSwitch('sign up')} className='text-center mt-8 text-white hover:cursor-pointer'>Not a member? Create an Account</p>
                        </form>
                    </div>
                </div>
            </motion.div>
            <ToastContainer />
        </>
    )
}

export default Login