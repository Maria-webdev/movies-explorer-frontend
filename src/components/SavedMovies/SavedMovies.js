import React from 'react';
// import './SavedMovies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import SavedMoviesCardList from './../SavedMoviesCardList/SavedMoviesCardList';
import Footer from '../Footer/Footer';

function SavedMovies() {
  return (
    <>
      <div>
        <section className='movies'>
          <Header />
          <SearchForm />
          <SavedMoviesCardList />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default SavedMovies;