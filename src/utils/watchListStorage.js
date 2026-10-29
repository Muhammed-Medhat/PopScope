const KEY = "watchList";

export function loadWatchList() {
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error("Error reading watchList from localStorage:", error);
    return [];
  }
}

export function saveWatchList(list) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(list));
  } catch (error) {
    console.error("Error saving watchList to localStorage:", error);
  }
}
