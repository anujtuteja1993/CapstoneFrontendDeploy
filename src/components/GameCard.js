import React from 'react'
import { Link } from 'react-router-dom';

//GameCard component to display game cards on the BrowseGames page and search results page.
//This is quite similar to the Game component, but it is used in a different context.

const GameCard = ({ game }) => {

    return (
        <Link to={`/games/${game.id}`}>
                <div className='sm:w-50 md:w-100 lg:w-90 inline-block cursor-pointer relative p-2 mb-4'>
                    <img className='cursor-pointer w-full h-auto block rounded-xl aspect-video' src={game.game_image} alt={game.game_name}></img>
                    <div className='absolute top-0 left-0 w-full h-full hover:bg-black/80 opacity-0 hover:opacity-100 text-white rounded-xl'>
                        <p className='white-space-normal text-xs md:text-sm font-bold flex flex-col justify-center items-center h-full text-center'>{game?.game_name}
                        </p>
                    </div>
                </div>
        </Link>
    );
};

export default GameCard;