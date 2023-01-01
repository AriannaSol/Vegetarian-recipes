import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { getHomeRecipes } from "../services/clientApi";

function RecipesList() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getHomeRecipes(setLoading, setSearchResults);
  }, []);
  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader size={150} />
      </div>
    );
  }
  if (!loading && searchResults.length < 1) {
    return (
      <div>
        <h2 className="section-title">
          Connection failed, try to reload the server!
        </h2>
      </div>
    );
  }

  return (
    <section className="section">
      <h2 className="section-title">Looking for inspiration?</h2>
      <div className="recipes-center">
        {searchResults.map((item) => {
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
export default RecipesList;
