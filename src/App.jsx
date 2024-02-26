import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [searchQuery, setSearchQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [latestMovies, setLatestMovies] = useState([]);

  useEffect(() => {
    // Retrieve latest searched movies from local storage
    const storedMovies = JSON.parse(localStorage.getItem('latestMovies')) || [];
    setLatestMovies(storedMovies);
  }, []);

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

          // Update latest searched movies
          const updatedLatestMovies = [...latestMovies];
          updatedLatestMovies.unshift(data[0]); // Add the first movie from the search result
          if (updatedLatestMovies.length > 5) {
            updatedLatestMovies.pop(); // Remove the oldest movie if the list exceeds 5
          }
          setLatestMovies(updatedLatestMovies);
          localStorage.setItem('latestMovies', JSON.stringify(updatedLatestMovies));
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
      <div className="latest-searched">
        <h2>Latest Searched Movies:</h2>
        <ul>
          {latestMovies.map((movie, index) => (
            <li key={index}>{movie.title}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
