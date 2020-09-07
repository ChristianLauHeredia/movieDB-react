// Save id in local storage
export const saveFavorite = id => {
  const newArr = getFavorites();
  newArr.push(id);
  localStorage.setItem('myFavorites', JSON.stringify(newArr));
  return true;
}

// Returns true if id exists in saved array
export const checkFavorite = id => {
  const newArr = getFavorites();
  const index = newArr.indexOf(id);
  return (index > -1) || false;
}

// Returns array of ids stored in local
export const getFavorites = () => {
  const favArr = JSON.parse(localStorage.getItem('myFavorites'));
  return favArr || [];
}

// Removes id from local storage
export const removeFavorite = id => {
  const newArr = getFavorites();
  const index = newArr.indexOf(id);
  if (index > -1) newArr.splice(index, 1);
  localStorage.setItem('myFavorites', JSON.stringify(newArr));
  return false;
}

// Save language
export const saveLang = lang => {
  localStorage.setItem('lang', lang);
}

// Get language
export const getLang = () => {
  return localStorage.getItem('lang');
}