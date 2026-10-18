export function watchListReducer(currentState, action) {
  switch (action.type) {
    case "added": {
      const exist = currentState.some(
        (movie) => movie.id === action.payload.id,
      );
      if (exist) {
        return currentState;
      }
      const newState = [...currentState, action.payload];
      window.localStorage.setItem("watchList", JSON.stringify(newState));
      return newState;
    }
    case "removed": {
      const newState = currentState.filter(
        (movie) => movie.id !== action.payload,
      );
      window.localStorage.setItem("watchList", JSON.stringify(newState));
      return newState;
    }
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
