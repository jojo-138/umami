import { useEffect, useState } from 'react';

export default function useFetch(search, amount, type, string, offset) {
  const [recipes, setRecipes] = useState([]);
  const [totalResults, setTotalResults] = useState(0);

  const getRecipes = async (search, amount, type, string, offset) => {
    let storedDataResults = string ? sessionStorage.getItem(string + offset + 'results') : null;
    let storedDataTotalResults = string
      ? sessionStorage.getItem(string + offset + 'totalResults')
      : null;
    if (storedDataResults && storedDataTotalResults) {
      setRecipes(JSON.parse(storedDataResults));
      setTotalResults(JSON.parse(storedDataTotalResults));
    } else {
      const response = offset
        ? await fetch(
            `https://api.spoonacular.com/recipes/${search}?apiKey=${
              // eslint-disable-next-line no-undef
              process.env.API_KEY
            }&number=${amount}&${type}=${string}&offset=${(offset - 1) * 15}`
          )
        : type && string
        ? await fetch(
            `https://api.spoonacular.com/recipes/${search}?apiKey=${
              // eslint-disable-next-line no-undef
              process.env.API_KEY
            }&number=${amount}&${type}=${string}`
          )
        : await fetch(
            `https://api.spoonacular.com/recipes/${search}?apiKey=${
              // eslint-disable-next-line no-undef
              process.env.API_KEY
            }&number=${amount}`
          );

      const data = await response.json();
      data.results ? setRecipes(data.results) : setRecipes(data.recipes);
      data.totalResults ? setTotalResults(data.totalResults) : setTotalResults(0);
      string && data.results
        ? sessionStorage.setItem(string + offset + 'results', JSON.stringify(data.results))
        : null;
      string && data.totalResults
        ? sessionStorage.setItem(
            string + offset + 'totalResults',
            JSON.stringify(data.totalResults)
          )
        : null;
    }
  };

  useEffect(() => {
    getRecipes(search, amount, type, string, offset);
  }, [string, offset]);

  return [recipes, totalResults];
}
