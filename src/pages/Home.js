import React from 'react'
import { useState, useEffect } from 'react';
import HomeSlider from '../components/HomeSlider';
import GameRow from '../components/GameRow';


const Home = () => {
  //Setting up the states to store the data from the API calls
  const [criticallyAcclaimed, setCriticallyAcclaimed] = useState();
  const [highestRated, setHighestRated] = useState();
  const [classicGames, setClassicGames] = useState();

  //URLs for the API calls
  const fetchCriticallyAcclaimedGamesURL = 'https://capstone-backend-83aj.onrender.com/games/getCriticallyAcclaimedGames';
  const fetchHighestUserRatedGamesURL = 'https://capstone-backend-83aj.onrender.com/games/getHighestUserRatedGames';
  const fetchClassicGamesURL = 'https://capstone-backend-83aj.onrender.com/games/getClassicGames';

  //API calls in UseEffect using Promise.all
  useEffect(() => {
    Promise.all([fetch(fetchCriticallyAcclaimedGamesURL), fetch(fetchHighestUserRatedGamesURL), fetch(fetchClassicGamesURL)])
      .then(([resp1, resp2, resp3]) => Promise.all([resp1.json(), resp2.json(), resp3.json()]))
      .then(([data1, data2, data3]) => { setCriticallyAcclaimed(data1.data); setHighestRated(data2.data); setClassicGames(data3.data) })
  }, [fetchCriticallyAcclaimedGamesURL, fetchHighestUserRatedGamesURL])

  //Re-using the GameRow component to display the games
  return (
    <div>
      <HomeSlider />
      <GameRow title='Critically Acclaimed Games' games={criticallyAcclaimed} />
      <GameRow title='Loved By Users' games={highestRated} />
      <GameRow title='Classic Games' games={classicGames} />
    </div>
  )
}

export default Home