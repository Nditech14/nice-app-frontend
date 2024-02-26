import React, { useState } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');

  const handleSearchChange = event => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    fetch(`https://nicemovies-uszq.onrender.com/api/Movie/SearchByTitle?title=${searchQuery}`)
      .then(response => response.json())
      .then(data => {
        if (data && data.length > 0) {
          setMovies(data);
          setBackgroundColor(getRandomColor());
        } else {
          setMovies([]);
        }
      })
      .catch(error => {
        console.error('Error fetching movies:', error);
      });
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  return (
    <div className="app" style={{ backgroundColor }}>
      <h1>NiceMoviesByNditech</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <div className="movies">
        {movies.map(movie => (
          <div key={movie.imdbId} className="movie">
            <h2>{movie.title}</h2>
            <p>{movie.year}</p>
            <img src={movie.poster} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
