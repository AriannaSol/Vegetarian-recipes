import { useEffect, useState } from "react";
import axios from "axios";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";

function FilteredRecipes() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vegan, setVegan] = useState(false);

  const { query } = useParams();

  const navigate = useNavigate(-1);

  useEffect(() => {
    const getSearchResults = async () => {
      setLoading(true);
      setSearchResults([]);
      try {
        const resp = await axios.get(
          `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=50&query=${query}&diet=vegetarian`
        );
        if (resp) {
          const recipes = resp.data.results;
          setSearchResults(recipes);
          setLoading(false);
        }
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getSearchResults(query);
  }, [query]);

  const showVegan = async () => {
    setLoading(true);
    setSearchResults([]);
    try {
      const resp = await axios.get(
        `https://api.spoonacular.com/recipes/complexSearch?apiKey=${process.env.REACT_APP_API_KEY}&number=50&query=${query}&diet=vegan`
      );
      if (resp) {
        const recipes = resp.data.results;
        setSearchResults(recipes);
        setLoading(false);
        setVegan(true);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader size={150} />
      </div>
    );
  }
  if (!loading && searchResults.length < 1) {
    return (
      <div className="no-results-div">
        <h2 className="section-title">
          No recipes matched your search criteria
        </h2>
        <button className="recipe-button" onClick={() => navigate("/")}>
          Back Home
        </button>
      </div>
    );
  }

  return (
    <main>
      <SearchForm />
      {vegan === false && (
        <div className="vegan-container">
          <p>Are you vegan? Click here!</p>
          <button onClick={showVegan}>Show Vegan</button>
        </div>
      )}
      <section className="section">
        <h2 className="section-title">
          {vegan ? "Vegan results for" : "Search results for"} "{query}"
        </h2>
        <div className="recipes-center">
          {searchResults.map((item) => {
            return (
              <div key={item.id} className="recipe">
                <div className="card-title-container">
                  <h3>
                    {" "}
                    <Link
                      className="nav-pages"
                      to={`/search/recipe/${item.id}`}
                    >
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
    </main>
  );
}

export default FilteredRecipes;
