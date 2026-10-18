import { createContext, useContext, useReducer } from "react";
import { watchListReducer } from "../reducers/watchListReducer";

export let WatchListContext = createContext({});

const getInitialState = () => {
  const localData = window.localStorage.getItem("watchList");
  try {
    return localData ? JSON.parse(localData) : [];
  } catch (error) {
    console.error("Error reading watchList from localStorage:", error);
    return [];
  }
};

export default function WatchListProvider({ children }) {
  const [watches, dispatch] = useReducer(watchListReducer, [], getInitialState);

  return (
    <WatchListContext.Provider value={{ watches, dispatch }}>
      {children}
    </WatchListContext.Provider>
  );
}

export const useWatchList = () => {
  return useContext(WatchListContext);
};
