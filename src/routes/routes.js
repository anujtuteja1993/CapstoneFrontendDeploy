import React, { } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import GameDetails from '../pages/GameDetails';
import Games from '../pages/Games';
import CartDetails from '../pages/CartDetails';
import SearchPage from '../pages/SearchPage';
import LoginSignUp from '../components/LoginSignUp';

export const AppRoutes = (props) => {
  return (

    <Routes>
      <Route exact path='/' element={<Home {...props} />} />
      <Route exact path='/games/:id/' element={<GameDetails {...props} />} />
      <Route exact path='/games' element={<Games {...props} />} />
      <Route exact path='/cart' element={<CartDetails {...props} />} />
      <Route exact path="/searchresults" element={<SearchPage {...props} />} />
      <Route exact path="/login" element={<LoginSignUp {...props} />} />
    </Routes>
  )
}