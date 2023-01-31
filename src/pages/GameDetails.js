import React, { useContext } from 'react'
import { useParams } from "react-router-dom";
import { useState, useEffect } from 'react';
import Slider from '../components/Slider';
import { StarIcon } from '@heroicons/react/20/solid';
import { GameContext } from '../contexts/GameContext';
import { motion } from 'framer-motion';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


const GameDetails = () => {
  let { id } = useParams();
  const [game, setGame] = useState();
  const [gameScreenshotDetails, setGameScreenshots] = useState();
  const [gameDescription, setGameDescription] = useState();
  const [gamePlatforms, setGamePlatforms] = useState();
  const { setGamesInCart } = useContext(GameContext);

  function addGametoCart() {
    setGamesInCart(prev => [...prev, id]);
  }


  const fetchGameDetailsURL = "https://capstone-backend-83aj.onrender.com/games/fetchGameByID?game_ids=[" + id + "]";
  const fetchGameScreenshotsURL = "https://capstone-backend-83aj.onrender.com/games/fetchGameScreenshotByID?game_id=" + id;
  const fetchGameDescriptionURL = "https://api.rawg.io/api/games/" + id + "?key=f2b65746f0874d129d3550dd301e2b74"
  const fetchGamePlatformsURL = "https://capstone-backend-83aj.onrender.com/games/getGamePlatformDetailsByID?game_id=" + id;


  useEffect(() => {
    Promise.all([fetch(fetchGameDetailsURL), fetch(fetchGameScreenshotsURL), fetch(fetchGameDescriptionURL), fetch(fetchGamePlatformsURL)])
      .then(([resp1, resp2, resp3, resp4]) => Promise.all([resp1.json(), resp2.json(), resp3.json(), resp4.json()]))
      .then(([data1, data2, data3, data4]) => { setGame(data1.data[0]); setGameScreenshots(data2.data); setGameDescription(data3.description_raw); setGamePlatforms(data4.data) })
  }, [fetchGameDetailsURL, fetchGameScreenshotsURL, fetchGameDescriptionURL, fetchGamePlatformsURL])


  let gameScreenshotsArray = [];
  gameScreenshotDetails?.forEach(item => {
    gameScreenshotsArray.push(item.image)
  });

  let gamePlatformString = "";

  for (let i = 0; i < gamePlatforms?.length; i++) {

    if (i === gamePlatforms.length - 1)
      gamePlatformString += gamePlatforms[i].platform_name;
    else {
      gamePlatformString += gamePlatforms[i].platform_name + ", ";
    }
  }

  return (
    <motion.div layout>
      <div className="flex flex-col">
        <div className="flex flex-row py-10">
          <div className="relative m-auto w-[85vw] lg:w-[65vw] overflow-hidden rounded-xl aspect-video">
            <Slider games={gameScreenshotsArray} />
          </div>
        </div>
        <div>
          <div className="mx-auto max-w-9xl px-4 pt-10 pb-16 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pt-16 lg:pb-24 rounded-xl bg-[#202121]">
            <div className="lg:col-span-2 lg:pr-8">
              <h1 className="lg:text-6xl font-bold tracking-tight text-white text-4xl">{game?.game_name}</h1>
            </div>
            <div className="relative mt-4 lg:row-span-3 lg:mt-0 bg-[#282929] shadow rounded-xl border-black border-1 p-5">
              <h2 className="sr-only">Product information</h2>
              <p className="text-3xl tracking-tight text-white p-3">${game?.price}</p>
              <div className=" px-3 mt-6">
                <div className="flex items-center">
                  <div className="flex items-center">
                    {[0, 1, 2, 3, 4].map((rating) => (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          game?.rating > rating ? 'text-gray-200' : 'text-gray-900',
                          'h-5 w-5 flex-shrink-0'
                        )}
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col py-5 px-3 justify-center text-white"><p className="font-bold">Platforms:</p>
                <span className="flex">{gamePlatformString}</span></div>
              <div className="px-3 mt-6 flex items-center justify-center">
                <button
                  type="submit"
                  className="mt-10 flex w-80 items-center justify-center rounded-md border bg-gray py-3 px-8 text-base font-medium text-white hover:bg-[#5d6063] focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 shadow-sm"
                  onClick={addGametoCart}
                >
                  Add to cart
                </button>
              </div>
            </div>
            <div className="py-10 lg:col-span-2 lg:col-start-1 lg:pt-6 lg:pb-16 lg:pr-8">
              <div>
                <h3 className="sr-only">Description</h3>

                <div className="space-y-6">
                  <p className="text-base text-white text-justify">{gameDescription}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default GameDetails;