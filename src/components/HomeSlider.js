import React, { useState } from 'react'
import { useEffect } from 'react'
import Slider from './Slider'

//HomeSlider component to fetch the game images from the API and pass it to the Slider component
function HomeSlider() {
  const [games, setGames] = useState([])

  useEffect(() => {
    fetchGames()
  }, [])

  const fetchGames = () => {
    fetch('https://capstone-backend-anuj.adaptable.app/games/getTenGameDetails')
      .then(resp => resp.json())
      .then(({ data }) => {
        setGames(data);
      });
  }

  let gameImages = [];
  games.forEach(game => {
    gameImages.push(game.game_image)
  });

  return (
    <div className="flex flex-row py-10 ">
      <div className="relative m-auto w-[82vw] overflow-hidden rounded-xl aspect-video ">
        <Slider games={gameImages} />
      </div>
    </div>
  )
}


export default HomeSlider;
