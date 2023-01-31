import React from 'react'
import { motion } from 'framer-motion'

//FilterGames is the component used to filter the games according to their Genre.
//This component is used in the Games.js page. Games.js is the page that displays all the games.
//Props are passed from Games.js to FilterGames.js to set the activeGenre and setFiltered states.

const FilterGames = ({ setActiveGenre, activeGenre, setFiltered, allGames }) => {


    // useEffect(() => {
    //     const filtered = allGames.filter(game => game.genre_name.includes(activeGenre));
    //     setFiltered(filtered);
    // }, [activeGenre, allGames, setFiltered])

    return (
        <motion.div layout>
        <div className='p-10 flex flex-wrap flex-shrink justify-center'>
            <button onClick={() => setActiveGenre('Action')} className='mr-8 m-1 lg:min-w-[5rem] font-bold px-[0.5rem] py-[1rem] border bg-none hover:bg-[#0c2b45] rounded-xl text-white'>Action</button>
            <button onClick={() => setActiveGenre('Adventure')} className='mr-8 m-1 lg:min-w-[5rem] font-bold px-[0.5rem] py-[1rem] border bg-none hover:bg-[#0c2b45] rounded-xl text-white'>Adventure</button>
            <button onClick={() => setActiveGenre('Racing')} className='mr-8 m-1 lg:min-w-[5rem] font-bold px-[0.5rem] py-[1rem] border bg-none hover:bg-[#0c2b45] rounded-xl text-white'>Racing</button>
            <button onClick={() => setActiveGenre('Shooter')} className='mr-8 m-1 lg:min-w-[5rem] font-bold px-[0.5rem] py-[1rem] border bg-none hover:bg-[#0c2b45] rounded-xl text-white'>Shooter</button>
            <button onClick={() => setActiveGenre('Fighting')} className='mr-8 m-1 lg:min-w-[5rem] font-bold px-[0.5rem] py-[1rem] border bg-none hover:bg-[#0c2b45] rounded-xl text-white'>Fighting</button>
            <button onClick={() => setActiveGenre('Strategy')} className='mr-8 m-1 lg:min-w-[5rem] font-bold px-[0.5rem] py-[1rem] border bg-none hover:bg-[#0c2b45] rounded-xl text-white'>Strategy</button>
            <button onClick={() => setActiveGenre('Platformer')} className='mr-8 m-1 lg:min-w-[5rem] font-bold px-[0.5rem] py-[1rem] border bg-none hover:bg-[#0c2b45] rounded-xl text-white'>Platformer</button>
        </div>
        </motion.div>
    )
}

export default FilterGames;