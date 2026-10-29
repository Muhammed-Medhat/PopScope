import { createContext, useContext, useEffect, useReducer } from "react";
import { watchListReducer } from "../reducers/watchListReducer";
import { loadWatchList, saveWatchList } from "../utils/watchListStorage";

export const WatchListContext = createContext({});

export default function WatchListProvider({ children }) {
  const [watches, dispatch] = useReducer(watchListReducer, [], loadWatchList);

  useEffect(() => {
    saveWatchList(watches);
  }, [watches]);

  return (
    <WatchListContext.Provider value={{ watches, dispatch }}>
      {children}
    </WatchListContext.Provider>
  );
}

export const useWatchList = () => useContext(WatchListContext);
