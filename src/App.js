import React, { Component } from 'react';
import './App.css';
import { recipes } from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: recipes,
    url:
      "https://www.food2fork.com/api/search?key=8ae4df7876abd9f20401cfdb2a44c75e&q",
    details_id: 35375
  };


  async getRecipes() {
    try {
      const data = await fetch(this.state.url); // first get the data
      const jsonData = await data.json(); // json data
      this.setState({
        recipes: jsonData.recipes 
      })
    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes()
  }

  render() {
    // console.log(this.state.recipes);

    return <React.Fragment>

      <RecipeList recipes={this.state.recipes} />
      <RecipeDetails id={this.state.details_id} />
    </React.Fragment>


  }
}

export default App;
