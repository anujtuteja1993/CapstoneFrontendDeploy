import React from 'react';
import Game from './Game';

//Reusable GameRow component to display the games in a row
const GameRow = ({ title, games }) => {
  
  return (
    <div className='py-5'>
      <div className='text-white text-2xl font-bold px-2'>{title}</div>
      <div className='relative flex items-center'>
        <div id={'slider'} className='w-full h-full overflow-x-scroll whitespace-nowrap scroll-smooth scrollbar-hide relative'>
          {games?.map((game, id) => (
            <Game key={id} game={game} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default GameRow;