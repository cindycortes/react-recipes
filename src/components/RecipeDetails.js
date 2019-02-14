import React, { Component } from 'react';
import { recipe } from '../tempDetails';

class RecipeDetails extends Component {
    // constructor(props) {
    //     super(props);

    //     this.state = {
    //         recipe: recipe,
    //         url: `https://www.food2fork.com/api/get?key=8ae4df7876abd9f20401cfdb2a44c75e&q&rId=${this.props.id}`
    //     }
    // }

    // async componentDidMount() {
    //     try {
    //         const data = await fetch(this.state.url); // first get the data
    //         const jsonData = await data.json(); // json data
    //         this.setState({
    //             recipe: jsonData.recipe
    //         })
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    state = {
        recipe: recipe
    }

    async componentDidMount() {
        // console.log(this.props.id);
        const id = this.props.id;
        const url = `https://www.food2fork.com/api/get?key=8ae4df7876abd9f20401cfdb2a44c75e&q&rId=${id}`;
        try {
            const data = await fetch(url); // first get the data
            const jsonData = await data.json(); // json data
            this.setState((state, props) => { // this.setState is asynchronous
                return {recipe: jsonData.recipe}
            },() =>{}); // call back function
        } catch (error) {
            console.log(error);
        }
    }





    render() {
        // console.log(this.state.recipe);
        const { image_url, publisher, publisher_url, source_url, title, ingredients } = this.state.recipe;

        return (
            <React.Fragment>
                <div className="container">
                    <div className="row">
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <button type="button" className="btn btn-warning mb-5 text-capitalize">back to recipe list</button>
                            <img src={image_url} className="d-block w-100" alt="recipe" />
                        </div>
                        {/* details */}
                        <div className="col-10 mx-auto col-md-6 my-3">
                            <h6 className="text-uppercase">{title}</h6>
                            <h6 className="text-warning text-capitalize text-slanted">provided by {publisher}</h6>
                            <a href={publisher_url} target="_blank" rel="noopener noreferrer" className="btn btn-primary mt-2 text-capitalize">publisher webpage</a>
                            <a href={source_url} target="_blank" rel="noopener noreferrer" className="btn btn-success mt-2 mx-3 text-capitalize">recipe url</a>
                            <ul className="list-group mt-4">
                                <h2 className="mt-3 mb-4">Ingredients</h2>
                                {ingredients.map((item, index) => {
                                    return (
                                        <li key={index} className="list-group-item text-slanted">
                                            {item}
                                        </li>
                                    )
                                })}
                            </ul>

                        </div>
                    </div>
                </div>
            </React.Fragment>
        )




    }
}
export default RecipeDetails