import './App.css';
import React from 'react';
import {useEffect} from 'react';
import {useState} from 'react';
import Card from './components/Card';

function App() {
  const APP_ID = "c3750c6b";
  const APP_KEY = "47abf39398ea09b51ce8ecbe76537250";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState("");
  const [QUERY, setQuery] = useState("");

  const getRecipes = async ()=>{
    const response = await fetch(`https://api.edamam.com/search?q=${QUERY}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    console.log(data.hits);
    setRecipes(data.hits);
  }

  useEffect(()=>{
    getRecipes();
  },[QUERY]);   //run only when query updates

  

  const updateSearch = (event)=>{
    setSearch(event.target.value);
  }

  const getSearch = (event)=>{
    event.preventDefault();
    setQuery(search);
    setSearch("");
  }

  return (
    <div className="app">
        <form className="search" onSubmit={getSearch}>
          <input className="search-text" type="text" placeholder="type to search" value={search} onChange={updateSearch} />
          <button className="search-btn">Search</button>
        </form>
        {recipes.map(recipe =>(
          <Card 
            key={recipes.indexOf(recipe)}
            name={recipe.recipe.label}
            img={recipe.recipe.image}
            cal={recipe.recipe.calories}
            ingredients={recipe.recipe.ingredientLines}
            dish={recipe.recipe.dishType}
            meal={recipe.recipe.mealType}
            label={recipe.recipe.dietLabels}
            cuisine={recipe.recipe.cuisineType}
            share={recipe.recipe.shareAs}
            open={recipe.recipe.url}
          />
        ))}
    </div>
  );
}

export default App;
