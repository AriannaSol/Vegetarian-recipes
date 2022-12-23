import { useContext, useEffect, useState } from "react";
import { FavoritesContext } from "../context/FavoritesContextProvider";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";

export default function FavRecipes() {
  const favContext = useContext(FavoritesContext);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 500);
  }, []);

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
        {favContext.favorites.map((item) => {
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
