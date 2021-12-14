import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardsList from '../MoviesCardsList/MoviesCardsList';
import More from '../More/More';
import Footer from '../Footer/Footer';

function Movies({loggedIn, cards}) {
  return (
    <>
      <div>
        <section className='movies'>
          <Header loggedIn={loggedIn}/>
          <SearchForm />
          <MoviesCardsList cards={cards} />
          <More />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Movies;