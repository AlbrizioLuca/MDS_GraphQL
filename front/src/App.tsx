import React from "react";
import "./App.css";
import { useFindAllRecipesQuery } from "./gql/graphql";

function App() {
  const { data, loading, error } = useFindAllRecipesQuery();

  return (
    <div className="App">
      <header className="App-header">
        {data?.recipes.map((recipe) => (
          <div key={recipe.id}>
            <h1>{recipe.title}</h1>
            <p>{recipe.description}</p>
            <ul>
              Liste des ingrédients:
              {recipe.ingredients.map((ingredient, index) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
          </div>
        ))}
      </header>
    </div>
  );
}

export default App;
