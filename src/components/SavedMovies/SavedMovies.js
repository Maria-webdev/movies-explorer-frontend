import React from 'react';
// import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import SavedMoviesCardList from './../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies({loggedIn, cards}) {
  return (
    <>
      <div>
        <section className='movies'>
          <Header loggedIn={loggedIn}/>
          <SearchForm cards={cards} />
          <SavedMoviesCardList />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default SavedMovies;