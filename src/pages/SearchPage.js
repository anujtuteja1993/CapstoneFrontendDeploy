import React from 'react'
import { useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import GameCard from '../components/GameCard';

const SearchPage = () => {

    // Get the search results from the location state
    const { state } = useLocation();
    
    return (
        <div className='flex flex-col'>
            <div className='flex justify-between lg:p-10 md:p-5 p-4 duration:500'>
                <div className='flex'>
                    <h1 className='text-white text-4xl font-bold text-left'>Search Results for:</h1>
                </div>
                <div className='flex py-1'>
                    <h1 className='text-white text-3xl font-bold text-right'>{state.searchParam}</h1>
                </div>
            </div>
            <motion.div layout>
                <div className="grid grid-cols-1 gap-y-4 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-1 lg:gap-4 m-20">
                    {state?.searchResults.map((game, id) => (
                        <GameCard key={id} game={game} />
                    ))}
                </div>
            </motion.div>
        </div>
    )
}

export default SearchPage