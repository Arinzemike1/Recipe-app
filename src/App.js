import React, { useState } from 'react';
import {v4 as uuidv4} from 'uuid';
import './App.css';
import Axios from 'axios';
import Recipe from './Components/recipe';
import Alert from './Components/Alert';

const App = () => {
  const [query, setQuery] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = "5d099962";
  const APP_KEY = "9512ddc60df69686fdc32d94eb84b6bc";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const result = await Axios.get(url);
      if (!result.data.more){
        return setAlert("No food with such name")
      }
      setRecipes(result.data.hits);
      setQuery("");
      setAlert("");
    }
    else{
      setAlert("Please fill the form!");
    }
  }

  const onSubmit = (e) => {
    e.preventDefault();
    getData();
  }

  const onChange = (e) => {
    setQuery(e.target.value);
  }

  return (
    <div className="App">
      <h1>Food Recipes App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !== "" && <Alert alert={alert} />}
        <input type="text" placeholder="Search Food" autoComplete="off" onChange={onChange} value={query} />
        <input type="submit" value="Search" />
      </form>
      <div className="recipes">
        {recipes !== [] && recipes.map(recipe => 
        <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
}

export default App