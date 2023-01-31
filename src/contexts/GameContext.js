import { createContext } from "react";
import useLocalStorageState from "use-local-storage-state";

export const GameContext = createContext({});

//Cart Context to persist the cart data in the local storage
export function GameContextProvider({ children }) {
  const [gamesInCart, setGamesInCart] = useLocalStorageState('cart', { defaultValue: [] });
  return (
    <GameContext.Provider value={{ gamesInCart, setGamesInCart }}>
      {children}
    </GameContext.Provider>
  )
}