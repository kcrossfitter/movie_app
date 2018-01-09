import React, { Component } from 'react';

import Movie from './Movie'

import './App.css';

const URL = "https://yts.am/api/v2/list_movies.json?sort_by=download_count"

class App extends Component {
  state = {
    movies: []
  }

  componentDidMount() {
    this._getMovies()
  }

  _getMovies = async () => {
    const response = await fetch(URL)
    const movies = await response.json()
    this.setState({ movies: movies.data.movies })
  }

  _renderMovies = () => {
    return this.state.movies.map(movie => (
      <Movie 
        key={movie.id} 
        title={movie.title_english} 
        poster={movie.medium_cover_image} 
        genres={movie.genres}
        synopsis={movie.synopsis}
      />
    ))
  }
  
  render() {
    const { movies } = this.state

    return (
      <div className={ movies.length > 0 ? 'App': 'App--loading' }>
        { movies.length > 0 ? this._renderMovies() : <p>Loading Movies ...</p>}
      </div>
    );
  }
}

export default App;
