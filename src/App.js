import React, {useState, useEffect} from 'react';
import './App.css';
import MovieRow from './Components/MovieRow';
import $ from 'jquery';
import LanguageSwitcher from './Components/LanguageSwitcher';
import FilterSwitcher from './Components/FilterSwitcher';

function App() {

  const [Rows, setRows] = useState([]);
  const [Language, setLanguage] = useState("en-US");
  const [Query, setQuery] = useState("");
  const [Filter, setFilter] = useState("All");

  // Vyhledávání Filmů/Seriálů
  useEffect(() => {
    let filter = "multi";
    if (Filter === "Movies") {
      filter = "movie";
    } else if (Filter === "TV") {
      filter = "tv";
    }

    if (Query.trim() !== "") {
      // Vyhledej
      const urlString = `https://api.themoviedb.org/3/search/${filter}?query=${Query}&api_key=64984e1d68e6e6e002558fbd8b43788f&language=${Language}&page=1&include_adult=true`;

      $.ajax({
        url: urlString,
        success: (searchResults) => {

          const results = searchResults.results;

          var movieRows = [];

          results.forEach((movie) => {
            movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
            
            if (movie.poster_path !== null && movie.poster_path !== undefined) {
              const movieRow = <MovieRow key={movie.id} movie={movie}/>
              movieRows.push(movieRow);
            }
          })

          setRows(movieRows);
        },
        error: (xhr, status, err) => {
          console.log("Failed to fetch data");
        }
      })

      //console.log(Rows[0].props);

    } else {
      // Zobraz populární pokud prázdný
      const urlString = `https://api.themoviedb.org/3/movie/popular?api_key=64984e1d68e6e6e002558fbd8b43788f&language=${Language}`;
    
      $.ajax({
        url: urlString,
        success: (searchResults) => {
          const results = searchResults.results;

          var movieRows = [];

            results.forEach((movie) => {
              movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path;
              
              if (movie.poster_path !== null && movie.poster_path !== undefined) {
                const movieRow = <MovieRow key={movie.id} movie={movie}/>
                movieRows.push(movieRow);
              }
            })

            setRows(movieRows);
        },
        error: (xhr, status, err) => {
          console.log("Failed to fetch data");
        }
      })
    }

  }, [Rows, Query, Language, Filter])

  const handleswitchLanguage = (newLanguage) => {
    setLanguage(newLanguage);
  }

  const handleswitchFilter = (newFilter) => {
    setFilter(newFilter);
  }
  
  const searchChangeHandler = (event) => {
    const searchTerm = event.target.value;
    setQuery(searchTerm);
  }

  const linkToPortfolio = () => {
    const url = `http://martinopravil.mzf.cz/portfolio.php`;
    window.location.href = url;
  }

  return (
    <div className="App">

      <div className="titleBar">
        <img width="50" src="the_movie_db.svg" alt="logo"/>
        <div>
          <h2>MOVIE SEARCH APP</h2>
          <p style={{fontSize:13, marginTop:-15}}>Powered by MovieDB API</p>
        </div>
        <LanguageSwitcher lang={Language} dataCallBack={handleswitchLanguage}/>
      </div>

      <div className="copyright" onClick={linkToPortfolio}>© Martin Opravil</div>

      <div className="search-container">
        <input className="searchBar" onChange={searchChangeHandler} placeholder="Search for Movies or TV series"/>
        {Query.trim() !== "" &&
        <FilterSwitcher dataCallBack={handleswitchFilter}/>
        }
      </div>

      {Query.trim() === "" && 
        <div style={{color: 'gold', marginTop: 10}}><h2>Popular Movies</h2></div>
      }
      
      <div className="pagebody">
        {Rows}
      </div>
      
    </div>
  );
}

export default App;
