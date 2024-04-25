import React, { useState, useContext, useEffect } from 'react';
import { AiOutlineClose, AiOutlineMenu } from 'react-icons/ai';
import logo from './images/logo.png';
import { Link, useNavigate } from 'react-router-dom';
import cart from './images/cart.png';
import { GameContext } from '../contexts/GameContext'
import axios from 'axios';

//Navbar component to display the navbar
const Navbar = () => {

  let navigate = useNavigate();
  const [nav, setNav] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(false);

  //Using useContext hook to get the gamesInCart state from GameContext
  const { gamesInCart } = useContext(GameContext);

  let searchResults = [];

  //Function to toggle the navbar
  const handleNav = () => {
    setNav(!nav);
  };

  //Function to handle the Search bar
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      let searchParam = e.target.value;
      const SearchAPIURL = `https://capstone-backend-anuj.adaptable.app/games/searchGamesbyName?game_name=${searchParam}`;
      fetch(SearchAPIURL)
        .then(resp => resp.json())
        .then(({ data }) => {
          searchResults = data;
          e.target.value = "";
          navigate('/searchresults', { state: { searchResults, searchParam } });
        })
    }
  };


  //Function to handle the logout
  const userLogout = async () => {
    try {
      const email = localStorage.getItem('user');
      const response = await axios.post('https://capstone-backend-anuj.adaptable.app/users/userLogout', {
        email: email,
      })

      if (response.data.success) {
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        localStorage.removeItem('name');
        window.location.reload()
      }

    } catch (error) {
      if (error.response) {
        console.log(error.response.data.msg);
      }
    }
  }

  //Using useEffect hook to check if a user is signed in and set the isSignedIn state accordingly
  useEffect(() => {
    if (localStorage.getItem('user')) {
      setIsSignedIn(true);
    }
  }, [isSignedIn]);

  return (
    <div className='flex lg:justify-evenly justify-between px-2 items-center h-24 max-w-full mx-auto text-white lg:px-10'>
      <Link to='/'>
        <img className="flex justify-start w-20 h-20" src={logo} alt="logo" />
      </Link>
      <input onKeyDown={handleKeyDown} type='text' placeholder='Search' className='bg-[#0c2b45] rounded-xl lg:w-1/4 w-1/2 p-2 focus:outline-none focus:lg:w-1/2 duration-300 border-[#dadde0]' />
      <ul className='hidden md:flex'>
        <Link to='/'>
          <li className='p-4'>Home</li>
        </Link>
        <Link to='/games'>
          <li className='p-4'>Browse Games</li>
        </Link>
        <li className='p-4'>About</li>
      </ul>
      <div className="flex-end hidden md:flex">
        {isSignedIn ? <div className='flex flex-row py-10 cursor-pointer'>Welcome, {localStorage.getItem("name")}</div> : <div className='flex flex-row py-10'></div>}
        <div className="flex flex-row justify-end gap-x-5 p-6">
          {isSignedIn ? <div onClick={() => userLogout()}
            className="text-white font-bold p-4 cursor-pointer">Sign out</div> : <div onClick={() => navigate("/login")} className="text-white font-bold p-4 cursor-pointer">Sign in</div>}
          <div className="p-3 relative flex items-center justify-center">
            <Link to='/cart'>
              <div className='absolute -top-0 -right-0 w-4 h-4 bg-red-500/80 rounded-full flex items-center justify-center text-white text-xs font-bold'>{gamesInCart.length}</div>
              <img src={cart} alt="cart" className="w-8 h-8" />
            </Link>
          </div>
        </div>
      </div>
      <div onClick={handleNav} className='block md:hidden'>
        {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
      </div>
      <ul className={nav ? 'z-10 fixed left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#0c2b45] ease-in-out duration-500' : 'ease-in-out duration-500 fixed left-[-100%]'}>
        <Link to='/'>
          <li className='p-4 border-b border-gray-600'>Home</li>
        </Link>
        <Link to='/games'>
          <li className='p-4 border-b border-gray-600'>Browse Games</li>
        </Link>
        <li className='p-4 border-b border-gray-600'>About</li>
        {isSignedIn ? <li className='p-4 border-b border-gray-600 font-bold cursor-pointer'>Welcome, {localStorage.getItem("name")}</li> : <li onClick={() => navigate("/login")} className='p-4 border-b border-gray-600 font-bold cursor-pointer'>Sign In</li>}
        {isSignedIn && <li onClick={() => userLogout()}
          className="p-4 border-b border-gray-600 cursor-pointer">Sign out</li>}
        <li className='p-4 border-b border-gray-600'>
          <div className="relative flex">
            <Link to='/cart'>
              <div className='relative -top-0 -right-7 w-4 h-4 bg-red-500/80 rounded-full flex justify-center items-start text-white text-xs font-bold'>{gamesInCart.length}</div>
              <img src={cart} alt="cart" className="w-8 h-8" />
            </Link>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Navbar;