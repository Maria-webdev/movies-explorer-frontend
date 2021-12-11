import React from 'react';
import './Movies.css';
import Header from '../Header/Header';
import SearchForm from './../SearchForm/SearchForm';
import MoviesCardsList from '../MoviesCardsList/MoviesCardsList';
import More from '../More/More';
import Footer from '../Footer/Footer';

function Movies(props) {
  return (
    <>
      <div>
        <section className='movies'>
          <Header />
          <SearchForm />
          <MoviesCardsList />
          <More />
          <Footer />
        </section>
      </div>
    </>
  );
}

export default Movies;