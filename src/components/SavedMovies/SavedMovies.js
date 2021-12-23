import React from 'react';
import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import SavedMoviesCardList from './../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({loggedIn, handleSubmit, isShortMovie, savedMovies, deleteMovie}) {
  return (
    <>
      <div>
        <section className='movies'>
          <Header loggedIn={loggedIn}/>
          <SearchForm
           isSaved={true}
                 handleSubmit={handleSubmit}
                 isShortMovie={isShortMovie} />
          <SavedMoviesCardList
           isSaved={true}
          cards={savedMovies}
                        deleteMovie={deleteMovie}
          />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default SavedMovies;