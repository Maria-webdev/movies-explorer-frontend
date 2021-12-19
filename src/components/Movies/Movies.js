import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardsList from '../MoviesCardsList/MoviesCardsList';
import More from '../More/More';
import Footer from '../Footer/Footer';

function Movies({loggedIn, cards, handleSubmit, isShortMovie, onMovieSave, savedMovies}) {
  return (
    <>
      <div>
        <section className='movies'>
          <Header loggedIn={loggedIn}/>
          <SearchForm
                 cards={cards}
                 handleSubmit={handleSubmit}
                 isShortMovie={isShortMovie} />
          <MoviesCardsList
          cards={cards}
          onMovieSave={onMovieSave}
          savedMovies={savedMovies} /> 
          <More />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Movies;