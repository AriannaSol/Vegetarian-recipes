import React from "react";
import { FavoritesContextProvider } from "./context/FavoritesContextProvider";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import FilteredRecipes from "./pages/FilteredRecipes";
import SingleRecipe from "./pages/SingleRecipe";
import FavRecipes from "./pages/FavRecipes";
import Error from "./pages/Error";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App">
      <Router>
        <FavoritesContextProvider>
          <Navbar />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/search/:query" element={<FilteredRecipes />} />
            <Route path="/search/recipe/:id" element={<SingleRecipe />} />
            <Route path="/favRecipes" element={<FavRecipes />} />
            <Route path="*" element={<Error />} />
          </Routes>
        </FavoritesContextProvider>
      </Router>
    </div>
  );
}

export default App;
