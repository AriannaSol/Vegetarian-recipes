import React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ClipLoader from "react-spinners/ClipLoader";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { FavoritesContext } from "../context/FavoritesContextProvider";
import axios from "axios";

function SingleRecipe() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [recipe, setRecipe] = useState([]);
  const [ingredientsOpen, setIngredientsOpen] = useState(false);
  const [instructionsOpen, setInstructionsOpen] = useState(false);

  const navigate = useNavigate();

  const favContext = useContext(FavoritesContext);
  const isFavorite = favContext.isFavorite(recipe.id);
  function toggleFavoriteStatusHandler() {
    if (isFavorite) {
      favContext.removeFavorite(recipe.id);
    } else {
      favContext.addFavorite({
        id: recipe.id,
        title: recipe.title,
        image: recipe.image,
      });
    }
  }

  useEffect(() => {
    setLoading(true);

    const getRecipe = async () => {
      try {
        const resp = await axios.get(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
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

    getRecipe();
  }, [id]);

  if (loading) {
    return (
      <div className="loader-container">
        <ClipLoader size={150} />
      </div>
    );
  }

  return (
    <section className="recipe-section">
      {recipe && Object.keys(recipe).length > 0 && (
        <>
          {" "}
          <div className="single-recipe">
            <h2 className="section-title">{recipe.title}</h2>
            <div className="img-and-info-box">
              <div className="img-container">
                <img
                  className="recipe-img"
                  src={recipe.image}
                  alt={recipe.title}
                />
              </div>
              <div className="buttons-info-container">
                <button className="recipe-button" onClick={() => navigate(-1)}>
                  Go Back
                </button>
                <button
                  className="recipe-button"
                  onClick={toggleFavoriteStatusHandler}
                >
                  {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
                </button>
                <div>
                  {recipe.vegan && (
                    <div className="extrainfo-div">
                      <span className="recipe-data">Vegan:</span>
                      <p> {recipe.vegan ? "yes" : "no"}</p>
                    </div>
                  )}
                  {recipe.glutenFree && (
                    <div className="extrainfo-div">
                      <span className="recipe-data">Gluten free:</span>
                      <p> {recipe.glutenFree ? "yes" : "no"}</p>
                    </div>
                  )}
                  {recipe.readyInMinutes && (
                    <div className="extrainfo-div">
                      <span className="recipe-data">Ready in minutes: </span>
                      <p>{recipe.readyInMinutes}</p>
                    </div>
                  )}
                  {recipe.winePairing?.pairingText && (
                    <div>
                      <span className="recipe-data"> Wine :</span>
                      <p>{recipe?.winePairing?.pairingText}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className="recipe-info">
              {recipe.extendedIngredients &&
                Object.keys(recipe.extendedIngredients).length > 0 && (
                  <div className="ingredients-container">
                    <div className="title-button-container">
                      <span className="recipe-ingredients"> Ingredients :</span>
                      <button
                        className="show-button"
                        onClick={() => setIngredientsOpen(!ingredientsOpen)}
                      >
                        {ingredientsOpen ? "Hide" : "Show"}
                      </button>
                    </div>
                    {recipe?.extendedIngredients?.map((item) => {
                      return (
                        <p
                          className={!ingredientsOpen ? "do-not-show" : ""}
                          key={item.id}
                        >
                          {item.original}
                        </p>
                      );
                    })}
                  </div>
                )}
              {recipe.analyzedInstructions &&
                Object.keys(recipe.analyzedInstructions).length > 0 && (
                  <div className="instructions-container">
                    <div className="title-button-container">
                      <span className="recipe-instructions">
                        {" "}
                        Instructions :
                      </span>
                      <button
                        className="show-button"
                        onClick={() => setInstructionsOpen(!instructionsOpen)}
                      >
                        {instructionsOpen ? "Hide" : "Show"}
                      </button>
                    </div>

                    {recipe?.analyzedInstructions?.map((item) => {
                      return (
                        <div className="text-container">
                          {item.steps?.map((i) => {
                            return (
                              <p
                                className={
                                  !instructionsOpen ? "do-not-show" : ""
                                }
                                key={item.number}
                              >
                                {i.step}
                              </p>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                )}
            </div>
          </div>{" "}
        </>
      )}
    </section>
  );
}

export default SingleRecipe;
