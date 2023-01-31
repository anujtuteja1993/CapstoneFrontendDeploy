import React, { useState } from 'react';
import Login from '../pages/Login';
import SignUp from '../pages/SignUp';
import { motion } from 'framer-motion';


//LoginSignUp component to switch between the login and signup forms
const LoginSignUp = () => {

    const [currentPage, setCurrentPage] = useState('login');

    //Function to switch between the login and signup forms
    const togglePage = (formName) => {
        setCurrentPage(formName);
    }

    return (
        <motion.div layout>
            {
                currentPage === 'login' ? <Login onFormSwitch={togglePage} /> : <SignUp onFormSwitch={togglePage} />
            }
        </motion.div>
    )
}

export default LoginSignUp