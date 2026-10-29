export function watchListReducer(currentState, action) {
  switch (action.type) {
    case "added": {
      const exist = currentState.some(
        (movie) => movie.id === action.payload.id,
      );
      if (exist) return currentState;
      return [...currentState, action.payload];
    }
    case "removed":
      return currentState.filter((movie) => movie.id !== action.payload);
    default:
      throw new Error(`Unknown action type: ${action.type}`);
  }
}
