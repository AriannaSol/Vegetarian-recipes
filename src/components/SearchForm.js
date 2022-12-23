import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SearchForm() {
  const [searchedWord, setSearchedWord] = useState("");
  let navigate = useNavigate();
  const handleChange = (e) => {
    e.preventDefault();
    setSearchedWord(e.target.value);
  };
  const handleClick = (e) => {
    if (searchedWord) {
      navigate("../search/" + searchedWord, {
        replace: true,
      });
      setSearchedWord("");
    }
  };
  return (
    <section className="search-section">
      <form className="search-form" onSubmit={handleClick}>
        <div className="form-control">
          <label htmlFor="name">Search a recipe!</label>
          <input
            type="text"
            id="name"
            value={searchedWord}
            onChange={handleChange}
            placeholder="type a keyword..."
          />
          <div className="search-button-container">
            <button
              onClick={handleClick}
              type="submit"
              className="search-button"
            >
              Search
            </button>
          </div>
        </div>
      </form>
    </section>
  );
}

export default SearchForm;
