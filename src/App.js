import React, { Component } from 'react';
import './App.css';
import { recipes } from './tempList';
import RecipeList from './components/RecipeList';
import RecipeDetails from './components/RecipeDetails';

class App extends Component {
  state = {
    recipes: recipes,
    url:
      "https://www.food2fork.com/api/search?key=7cd6b9962fde3f698f34f5bee36e4780",
    base_url: "https://www.food2fork.com/api/search?key=7cd6b9962fde3f698f34f5bee36e4780",
    details_id: 35375,
    pageIndex: 1,
    search: '',
    query: '&q=',
    error: ''
  };


  async getRecipes() {
    try {
      const data = await fetch(this.state.url); // first get the data
      const jsonData = await data.json(); // json data
      // console.log(jsonData);
      if (jsonData.recipes.length === 0) {
        this.setState(() => {
          return { error: 'sorry, but your search did not return any results' }
        })
      }
      else {
        this.setState(() => {
          return { recipes: jsonData.recipes, error:"" }
        })
      }

    } catch (error) {
      console.log(error);
    }
  }

  componentDidMount() {
    this.getRecipes()
  }


  displayPage = (index) => {
    switch (index) {
      default:
      case 1:
        return <RecipeList recipes={this.state.recipes} handleDetails={this.handleDetails} value={this.state.search} handleChange={this.handleChange} handleSubmit={this.handleSubmit} error={this.state.error} />
      case 0:
        return <RecipeDetails id={this.state.details_id} handleIndex={this.handleIndex} />
    }
  };

  handleIndex = index => {
    this.setState({
      pageIndex: index
    })
  };
  handleDetails = (index, id) => {
    this.setState({
      pageIndex: index,
      details_id: id
    })
  };
  handleChange = e => {
    // console.log('hello from handleChange');
    this.setState({
      search: e.target.value
    }, () => {
      // console.log(this.state.search)
    })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    // console.log('hello from handleSubmit');
    const { base_url, query, search } = this.state;

    this.setState(() => {
      return { url: `${base_url}${query}${search}`, search: "" }
    }, () => {
      this.getRecipes();
    })
  }

  render() {
    console.log(this.state.recipes);

    return <React.Fragment>

      {this.displayPage(this.state.pageIndex)}
    </React.Fragment>


  }
}

export default App;
