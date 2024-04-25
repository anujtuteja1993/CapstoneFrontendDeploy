import React from 'react'
import { useState, useEffect } from 'react'
import GameCard from '../components/GameCard'
import FilterGames from '../components/FilterGames'


const Games = () => {

  const [games, setGames] = useState([])
  const [filtered, setFiltered] = useState([])
  const [activeGenre, setActiveGenre] = useState("Action");



  useEffect(() => {
    const fetchGames = () => {
      fetch('https://capstone-backend-anuj.adaptable.app/games/getGamesByGenre?genres=["Action","Adventure","RPG", "Racing", "Shooter", "Fighting", "Strategy", "Platformer"]')
        .then(resp => resp.json())
        .then(({ data }) => {
          setGames(data);
          const filtered = data.filter(game => game.genre_name.includes(activeGenre));
          setFiltered(filtered);
        });
    }
    fetchGames();
  }, [games, filtered, activeGenre])

  return (

    <div>
      <FilterGames allGames={games} setFiltered={setFiltered} activeGenre={activeGenre} setActiveGenre={setActiveGenre} />
      <div className="grid grid-cols-1 gap-y-4 md:grid-cols-1 lg:grid-cols-4 gap-3 md:gap-1 lg:gap-4 m-20">
        {filtered.map((game, id) => (
          <GameCard key={id} game={game} />
        ))}
      </div>
    </div>

  )
}

export default Games;