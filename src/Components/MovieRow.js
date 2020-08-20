import React, {useState, useEffect} from 'react';
import '../App.css';
import $ from 'jquery';

function MovieRow(props) {

    const [Movie] = useState(props.movie);

    const viewMovie = () => {
        //console.log(Movie.title);
        const url = `https://www.themoviedb.org/movie/${props.movie.id}`;
        window.location.href = url;
    }

    const viewTv = () => {
        //console.log(Movie.name);
        const url = `https://www.themoviedb.org/tv/${props.movie.id}`;
        window.location.href = url;
    }

    const getMovieDate = (date) => {
      if(date !== undefined && (Movie.release_date || Movie.first_air_date || Movie.last_air_date)) {
        return date.substring(0,4);
      }
    }

    useEffect(() => {
      if (Movie.first_air_date) {
        const testString = `https://api.themoviedb.org/3/tv/${Movie.id}?api_key=64984e1d68e6e6e002558fbd8b43788f&language=en-US`;
        $.ajax({
          url: testString,
          success: (searchResults) => {
            //console.log(Movie.id + " - " + searchResults.last_air_date);
            Movie.latest_date = searchResults.last_air_date;
          }, 
          error: (xhr, status, err) => {
            console.log("Failed to fetch data");
          }
        })
      }
    }, [Movie])

    return (
        <div className="card">
          <div className="card-type"><span>{props.movie.release_date ? "Movie" : "TV Series"}</span></div>
          <div className="cardInfo">
            <img width="185" src={Movie.poster_src} alt="poster"/>
            <div className="container">
              {props.movie.title &&
              <div className="movie-title" onClick={viewMovie} style={{fontSize:25, textDecoration:'underline', fontWeight: 'bold'}}><span>{Movie.title}</span></div>
              }
              {props.movie.name &&
              <div className="movie-title" onClick={viewTv} style={{fontSize:25, textDecoration:'underline', fontWeight: 'bold'}}><span>{Movie.name}</span></div>
              }
              <p>{props.movie.overview !== "" ? props.movie.overview.substring(0,250) + "..." : "\"No Description\""}</p>
            </div>
          </div>

          <div className="cardStats">
              {props.movie.release_date && 
              <p><strong style={{fontSize: 25}}>{getMovieDate(Movie.release_date)}</strong></p>
              }
              {props.movie.first_air_date && 
              <p><strong style={{fontSize: 25}}>{getMovieDate(Movie.first_air_date)} - {getMovieDate(Movie.latest_date)}</strong></p>
              }
              <div className="cardRating">
                <p><strong style={{fontSize: 25, color: 'gold'}}> {props.movie.vote_average}/10 </strong></p>
                <p id="votes">{props.movie.vote_count} votes</p>
              </div>
          </div>
        </div>
    )
}

export default MovieRow;