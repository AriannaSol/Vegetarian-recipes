import { useEffect, useState } from "react";
import ClipLoader from "react-spinners/ClipLoader";
import { useParams } from "react-router-dom";
import { Link, useNavigate } from "react-router-dom";
import SearchForm from "../components/SearchForm";
import { getVegetarianResults } from "../services/clientApi";
import { getVeganResults } from "../services/clientApi";

function FilteredRecipes() {
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [vegan, setVegan] = useState(false);
  const [totalResults, setTotalResults] = useState();

  const [recipesPerPage] = useState(20);

  const [page, setPage] = useState(1);

  const offset = page * recipesPerPage - recipesPerPage;
  const showedRecipes = page * recipesPerPage;

  const { query } = useParams();

  const navigate = useNavigate(-1);

  useEffect(() => {
    getVegetarianResults(
      recipesPerPage,
      offset,
      query,
      setLoading,
      setSearchResults,
      setTotalResults
    );
  }, [offset, query, recipesPerPage]);
  useEffect(() => {
    if (vegan) {
      getVeganResults(
        recipesPerPage,
        offset,
        query,
        setLoading,
        setSearchResults,
        setTotalResults
      );
    } else {
      getVegetarianResults(
        recipesPerPage,
        offset,
        query,
        setLoading,
        setSearchResults,
        setTotalResults
      );
    }
  }, [offset, page, query, recipesPerPage, vegan]);

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
      {vegan === false && page === 1 && (
        <div className="vegan-container">
          <p>Are you vegan? Click here!</p>
          <button onClick={() => setVegan(true)}>Show Vegan</button>
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
      <div className="change-page-container">
        {page !== 1 && (
          <button onClick={() => setPage((p) => p - 1)}>Previous page</button>
        )}

        {page}
        {showedRecipes < totalResults && (
          <button onClick={() => setPage((p) => p + 1)}>Next page</button>
        )}
      </div>
    </main>
  );
}

export default FilteredRecipes;
