import React from "react";
import { Movies } from "../componets/Movies";
import { Search } from "../componets/search";
import { Preloader } from "../componets/preloader";

class Main extends React.Component {
    state = {
        movies: [],
        loading: true,
    };
    componentDidMount() {
        fetch('http://www.omdbapi.com/?apikey=28577d85&s=matrix')
            .then((response) => response.json())
            .then((data) => this.setState({ movies: data.Search, loading: false }));
    }

    searchMovies = (str, type = "all") => {
        this.setState({ loading: true});
        fetch(`http://www.omdbapi.com/?apikey=28577d85&s=${str}${ 
                type !== "all" ? `&type=${type}` : ""
            }`
        )
            .then((response) => response.json())
            .then((data) => {this.setState({ movies: data.Search, loading: false}); console.log(data)});
    };

    render() {
        const { movies, loading } = this.state;

        return <main className="container content">
            <Search searchMovies={this.searchMovies} />
            {loading ? <Preloader /> : <Movies movies={this.state.movies}/> }
        </main>
    }
}

export { Main };