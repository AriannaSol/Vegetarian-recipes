import axios from "axios";

const baseUrl = "https://api.spoonacular.com/recipes/";

const getVegetarianResults = async (
  recipesPerPage,
  offset,
  query,
  setLoading,
  setSearchResults,
  setTotalResults
) => {
  setLoading(true);
  setSearchResults([]);
  try {
    const resp = await axios.get(
      baseUrl +
        `complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=${recipesPerPage}&offset=${offset}&query=${query}&diet=vegetarian`
    );
    if (resp) {
      const recipes = resp.data.results;
      setTotalResults(resp.data.totalResults);
      setSearchResults(recipes);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

const getVeganResults = async (
  recipesPerPage,
  offset,
  query,
  setLoading,
  setSearchResults,
  setTotalResults
) => {
  setLoading(true);
  setSearchResults([]);
  try {
    const resp = await axios.get(
      baseUrl +
        `complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=${recipesPerPage}&offset=${offset}&query=${query}&diet=vegan`
    );
    if (resp) {
      const recipes = resp.data.results;
      setTotalResults(resp.data.totalResults);
      setSearchResults(recipes);
      setLoading(false);
    }
  } catch (error) {
    console.log(error);
    setLoading(false);
  }
};

const getSingleRecipe = async (id, setLoading, setRecipe) => {
  try {
    const resp = await axios.get(
      baseUrl + `${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
    );
    if (resp.data) {
      setLoading(false);
      setRecipe(resp.data);
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

const getHomeRecipes = async (setLoading, setSearchResults) => {
  setLoading(true);
  try {
    const resp = await axios.get(
      baseUrl +
        `complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&diet=vegetarian&number=50`
    );
    if (resp) {
      const recipes = resp.data.results;
      setSearchResults(recipes);
      setLoading(false);
    }
  } catch (err) {
    console.error(err);
    setLoading(false);
  }
};

export {
  getSingleRecipe,
  getHomeRecipes,
  getVegetarianResults,
  getVeganResults,
};
