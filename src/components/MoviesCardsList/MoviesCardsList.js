import React from 'react';
import './MoviesCardsList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import Preloader from '../Preloader/Preloader';

function MoviesCardsList(props) {

  return (
    <section className='movies-cardlist'>
      {props.isLoading ? (
        <Preloader />
      ) : (
        <section className='movies-cardlist__section'>
          <ul className='cards__list'>
            {props.cards.map((item) => (
           <MoviesCard
           card={item} key={item.id}
           onChangeState={props.onMovieSave}
           savedMovies={props.savedMovies}
           />
              ))}
          </ul>
          </section>
      )}
      </section>
  
  );
};

export default MoviesCardsList;