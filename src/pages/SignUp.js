import React, { useState } from 'react'
import LoginImg from './images/Login.png'
import logo from '../components/images/logo.png'
import { motion } from 'framer-motion'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const SignUp = (props) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [formErrors, setFormErrors] = useState({});
    const [formSubmitted, setFormSubmitted] = useState(false);
    let navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let formErrorValidation = validate({ email, password, firstName, lastName });

        setFormSubmitted(true);

        if (Object.keys(formErrorValidation).length > 0) return;
        try {
            const response = await axios.post('https://capstone-backend-anuj.adaptable.app/users/registerUser', {
                email: email,
                password: password,
                firstName: firstName,
                lastName: lastName
            })
            if (response.data.success || formSubmitted === true) {
                props.onFormSwitch('login');
                navigate('/login');
                toast("User Registered Successfully", {
                    className: "custom-toast",
                    draggable: true,
                    position: toast.POSITION.BOTTOM_CENTER
                })
            }

        } catch (error) {
            if (error.response) {
                toast(error.response.data.message, {
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
        } else if (values.password.length < 6) {
            errors.password = '*Password needs to be atleast 6 or more characters';
        }
        if (!values.firstName) {
            errors.firstName = '*First Name is required';
        }
        if (!values.lastName) {
            errors.lastName = '*Last Name is required';
        }

        setFormErrors(errors);
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
                                    <label className="text-white py-2">First Name</label>
                                    <input placeholder='First Name' value={firstName} onChange={(e) => setFirstName(e.target.value)} className='border relative bg-[#e1e9f5] p-2 rounded-xl' type="text" />
                                    <motion.div layout>
                                        <p className="text-red-400 font-sans text-sm">{formErrors.firstName}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div layout>
                                <div className='flex flex-col mb-5'>
                                    <label className="text-white py-2">Last Name</label>
                                    <input placeholder='Last Name' value={lastName} onChange={(e) => setLastName(e.target.value)} className='border relative bg-[#e1e9f5] p-2 rounded-xl' type="text" />
                                    <motion.div layout>
                                        <p className="text-red-400 font-sans text-sm">{formErrors.lastName}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div layout>
                                <div className='flex flex-col mb-5'>
                                    <label className="text-white py-2">Email</label>
                                    <input placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} className='border relative bg-[#e1e9f5] p-2 rounded-xl' type="email" />
                                    <motion.div layout>
                                        <p className="text-red-400 font-sans text-sm">{formErrors.email}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <motion.div layout>
                                <div className='flex flex-col mb-5'>
                                    <label className="text-white py-2">Password</label>
                                    <input placeholder='Password' value={password} onChange={(e) => setPassword(e.target.value)} className='border relative  bg-[#e1e9f5] p-2 rounded-xl' type="password" />
                                    <motion.div layout>
                                        <p className="text-red-400 font-sans text-sm">{formErrors.password}</p>
                                    </motion.div>
                                </div>
                            </motion.div>
                            <button onSubmit={handleSubmit} type="submit" className='w-full py-4 mt-8 bg-[#0c2b45]/80 border border-[#e1e9f5]/20 hover:bg-[#0c2b45]/100 relative rounded-xl text-white'>Register</button>
                            <p onClick={() => props.onFormSwitch('login')} className='text-center mt-8 text-white hover:cursor-pointer'>Already have an account? Sign in here</p>
                        </form>
                    </div>
                </div>
            </motion.div>
            <ToastContainer />
        </>
    )
}

export default SignUp