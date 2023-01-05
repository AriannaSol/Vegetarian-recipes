import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContextProvider";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function FavRecipes() {
  const favContext = useContext(FavoritesContext);
  const [loading, setLoading] = useState(false);
  const [allRecipes, setAllRecipes] = useState([]);

  useEffect(() => {
    setLoading(true);
    const getFav = async () => {
      const apiUrl = `https://api.spoonacular.com/recipes/`;
      const ids = JSON.parse(localStorage.getItem("Favorite Recipes"));
      const request = ids.map(async (recipe) => {
        const response = await fetch(
          `${apiUrl}${recipe.id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
        );
        return response.json();
      });
      const results = await Promise.all(request);
      setAllRecipes(results);
      setLoading(false);
    };
    if (favContext.totalFavorites >= 1) {
      getFav();
    }
    if (favContext.totalFavorites === 0) {
      setLoading(false);
    }
  }, [favContext]);

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader size={150} />
      </div>
    );
  }
  if (!loading && favContext.totalFavorites === 0) {
    return (
      <div>
        <h2 className="no-fav-text">You don't have any favorite recipe yet!</h2>
      </div>
    );
  }
  return (
    <section className="section">
      <h2 className="section-title">My Favorite Recipes</h2>
      <div className="recipes-center">
        {allRecipes.map((item) => {
          return (
            <div key={item.id} className="recipe">
              <div className="card-title-container">
                <h3>
                  {" "}
                  <Link className="nav-pages" to={`/search/recipe/${item.id}`}>
                    {" "}
                    {item.title}
                  </Link>
                </h3>
              </div>
              <img src={item.image} alt={item.title} />
            </div>
          );
        })}
      </div>
    </section>
  );
}
