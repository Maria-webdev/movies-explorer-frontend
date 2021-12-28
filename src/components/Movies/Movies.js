import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardsList from '../MoviesCardsList/MoviesCardsList';
import Footer from '../Footer/Footer';

function Movies({loggedIn, isLoading, cards, handleSubmit, isShortMovie, handleSaveMovie, savedMovies, deleteMovie}) {
  return (
    <>
      <div>
        <section className='movies'>
          <Header loggedIn={loggedIn}/>
          <SearchForm
                 cards={cards}
                 isLoading={isLoading}
                 handleSubmit={handleSubmit}
                 isShortMovie={isShortMovie} />
          <MoviesCardsList
          cards={cards}
          handleSaveMovie={handleSaveMovie}
          savedMovies={savedMovies}
          deleteMovie={deleteMovie}
           />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Movies;